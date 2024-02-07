import express from 'express';
import { userCtrl } from '../controllers/userCtrl.js';
import { isAuth } from '../middlewares/isAuth.js';

const userRouter = express.Router();

userRouter.get('/search', isAuth, userCtrl.searchUser);
userRouter.get('/user/:id', isAuth, userCtrl.getUserById);
userRouter.patch('/user', isAuth, userCtrl.updateUser);
userRouter.patch('/user/:id/follow', isAuth, userCtrl.follow);
userRouter.patch('/user/:id/unfollow', isAuth, userCtrl.unfollow);

export default userRouter;
