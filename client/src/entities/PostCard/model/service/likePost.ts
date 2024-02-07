import { type ThunkConfig } from '@/app/provider';
import { type IUser } from '@/entities/User/model/types/user';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { postActions } from '../slice/postSlice';
import { type IPost } from '../types/post';

interface LikePostParams {
  post: IPost;
  auth: IUser;
}

export const likePost = createAsyncThunk<
  any,
  LikePostParams,
  ThunkConfig<string>
>('post/like', async (params, thunkApi) => {
  const { extra, rejectWithValue, dispatch } = thunkApi;

  const { post, auth } = params;

  const postLikes = { ...post, likes: [...post.likes, auth] };

  dispatch(postActions.setPostLikes(postLikes));
  try {
    await extra.api.patch(`/post/${post._id}/like`);
  } catch (error) {
    return rejectWithValue(error.response.data.message);
  }
});
