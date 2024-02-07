import { Router } from 'express';
import { commentCtrl } from '../controllers/commentCtrl.js';
import { isAuth } from '../middlewares/isAuth.js';

const commentRouter = Router();

commentRouter.post('/comment', isAuth, commentCtrl.createComment);
commentRouter.patch('/comment/:id/like', isAuth, commentCtrl.likeComment);
commentRouter.patch('/comment/:id/unlike', isAuth, commentCtrl.unlikeComment);
commentRouter.patch('/comment/:id', isAuth, commentCtrl.updateComment);
commentRouter.delete('/comment/:id', isAuth, commentCtrl.deleteComment);

export default commentRouter;
