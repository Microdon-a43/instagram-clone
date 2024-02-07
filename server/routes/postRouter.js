import express from 'express';
import {
  create,
  unlikePost,
  getPosts,
  likePost,
  updatePost,
  deletePost,
  getMyPosts
} from '../controllers/postCtrl.js';
import { isAuth } from '../middlewares/isAuth.js';

const postRouter = express.Router();

postRouter.route('/posts').post(isAuth, create).get(isAuth, getPosts);
postRouter.get('/myPosts', isAuth, getMyPosts);
postRouter.patch('/post/:id/like', isAuth, likePost);
postRouter.patch('/post/:id/dislike', isAuth, unlikePost);
postRouter.patch('/post/:id', isAuth, updatePost);
postRouter.delete('/post/:id', isAuth, deletePost);

export default postRouter;
