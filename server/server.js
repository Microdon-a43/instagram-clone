import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { createServer } from 'http';
import { Server } from 'socket.io';
import authRouter from './routes/authRouter.js';
import userRouter from './routes/userRouter.js';
import postRouter from './routes/postRouter.js';
import commentRouter from './routes/commentRouter.js';
import messageRouter from './routes/messageRouter.js';
import { disconnect } from 'process';

dotenv.config();

const PORT = process.env.PORT | 5000;
const DB = process.env.DB_URL;

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000'
  }
});

// ============= Sockets ===========
let users = [];

const addUser = (userId, socketId) => {
  !users.some((user) => user.userId === userId) &&
    users.push({ userId, socketId });
};
const getUser = (userId) => {
  return users.find((user) => user.userId === userId);
};

const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};

io.on('connection', (socket) => {
  // console.log('user connected:', socket.id);
  socket.on('addUser', (userId) => {
    addUser(userId, socket.id);
    io.emit('getUsers', users);
  });

  socket.on('sendMessage', ({ sender, recipient, text }) => {
    const user = getUser(recipient);

    io.to(user?.socketId).emit('getMessage', {
      sender,
      text
    });
  });

  socket.on('disconnect', () => {
    // console.log('user disconnected:', socket.id);
    removeUser(socket.id);
    io.emit('getUsers', users);
  });
});

// io.on('connection', (socket) => {
//   socketServer(socket);
// });

// ============= /Sockets ===========

app.use(cors({ origin: true, credentials: true }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan('dev'));
app.use(cookieParser());

// Routes
app.use('/api', authRouter);
app.use('/api', userRouter);
app.use('/api', postRouter);
app.use('/api', commentRouter);
app.use('/api', messageRouter);

mongoose
  .connect(DB)
  .then(() => console.log('Database connected successfully'))
  .catch((error) => console.log(error));

server.listen(PORT, () => {
  console.log('Server is up on port - ', PORT);
});
