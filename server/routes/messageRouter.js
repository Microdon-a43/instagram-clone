import express from 'express';
import { messageCtrl } from '../controllers/messageCtrl.js';
import { isAuth } from '../middlewares/isAuth.js';

const messageRouter = express.Router();

messageRouter.post('/message', isAuth, messageCtrl.create);
messageRouter.get('/conversations', isAuth, messageCtrl.getConversations);
messageRouter.get('/messages/:id', isAuth, messageCtrl.getMsg);

export default messageRouter;
