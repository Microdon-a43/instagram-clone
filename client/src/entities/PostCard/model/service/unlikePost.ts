import { type ThunkConfig } from '@/app/provider';
import { type IUser } from '@/entities/User/model/types/user';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { postActions } from '../slice/postSlice';
import { type IPost } from '../types/post';

interface unlikePostParams {
  post: IPost;
  auth: IUser;
}

export const unlikePost = createAsyncThunk<
  any,
  unlikePostParams,
  ThunkConfig<string>
>('post/unlike', async (params, thunkApi) => {
  const { extra, rejectWithValue, dispatch } = thunkApi;

  const { post, auth } = params;

  const postLikes = {
    ...post,
    likes: post.likes.filter((item) => item._id !== auth._id)
  };

  dispatch(postActions.setPostLikes(postLikes));
  try {
    await extra.api.patch(`/post/${post._id}/dislike`);
  } catch (error) {
    return rejectWithValue(error.response.data.message);
  }
});
