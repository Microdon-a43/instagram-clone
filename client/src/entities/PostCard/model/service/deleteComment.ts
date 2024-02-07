import { type ThunkConfig } from '@/app/provider';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { postActions } from '../slice/postSlice';
import { type IComment } from '../types/post';

interface deleteCommentParams {
  comment: IComment;
}

export const deleteComment = createAsyncThunk<
  any,
  deleteCommentParams,
  ThunkConfig<string>
>('comment/delete', async (params, thunkApi) => {
  const { rejectWithValue, dispatch, extra } = thunkApi;

  const { comment } = params;
  dispatch(postActions.deleteComment(comment));
  try {
    await extra.api.delete(`/comment/${comment._id}`);
  } catch (error) {
    return rejectWithValue(error.response.data.message);
  }
});
