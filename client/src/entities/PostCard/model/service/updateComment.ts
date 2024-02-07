import { type ThunkConfig } from '@/app/provider';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { type IComment } from '../types/post';

interface updateCommentProps {
  comment: IComment;
}

export const updateComment = createAsyncThunk<
  any,
  updateCommentProps,
  ThunkConfig<string>
>('comment/update', async (params, thunkApi) => {
  const { rejectWithValue, extra, dispatch } = thunkApi;

  const { comment } = params;

  try {
    // await extra.api.patch('/comment/' + comment._id, comment.content);
  } catch (error) {
    return rejectWithValue(error.response.data.message);
  }
});
