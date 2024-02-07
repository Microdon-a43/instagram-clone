import { type ThunkConfig } from '@/app/provider';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { postActions } from '../slice/postSlice';
import { type IPost } from '../types/post';

interface DeletePostParams {
  id: string;
}

export const deletePost = createAsyncThunk<
  any,
  DeletePostParams,
  ThunkConfig<string>
>('post/delete', async (params, thunkApi) => {
  const { extra, rejectWithValue, dispatch } = thunkApi;

  const { id } = params;

  dispatch(postActions.setDeletePost(id));
  try {
    const { data } = await extra.api.delete(`/post/${id}`);
    console.log(data);
  } catch (error) {
    console.log(error);
    return rejectWithValue(error.response.data.message);
  }
});
