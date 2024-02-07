import { type ThunkConfig } from '@/app/provider';
import { type IUser } from '@/entities/User/model/types/user';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { postActions } from '../slice/postSlice';
import { type IComment } from '../types/post';

interface LikeCommentParams {
  comment: IComment;
  auth: IUser;
}

export const likeComment = createAsyncThunk<
  any,
  LikeCommentParams,
  ThunkConfig<string>
>('post/likeComment', async (params, thunkApi) => {
  const { extra, dispatch, rejectWithValue } = thunkApi;

  const { comment, auth } = params;

  // dispatch(postActions.setLikeComment({ comment, auth }));

  try {
    await extra.api.patch(`/comment/${comment._id}/like`);
  } catch (error) {
    return rejectWithValue(error.data.message);
  }
});
