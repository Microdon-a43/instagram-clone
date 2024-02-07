import { type ThunkConfig } from '@/app/provider';
import { type IUser } from '@/entities/User/model/types/user';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { type IComment } from '../types/post';

interface unlikeCommentParams {
  comment: IComment;
  auth: IUser;
}

export const unlikeComment = createAsyncThunk<
  any,
  unlikeCommentParams,
  ThunkConfig<string>
>('post/unlikeComment', async (params, thunkApi) => {
  const { rejectWithValue, extra, dispatch } = thunkApi;

  const { comment, auth } = params;
  try {
    extra.api.patch(`/comment/${comment._id}/unlike`);
  } catch (error) {
    return rejectWithValue(error.response.data.message);
  }
});
