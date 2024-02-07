/* eslint-disable @typescript-eslint/no-invalid-void-type */
import { type ThunkConfig } from '@/app/provider';
import { type IPost, type IComment } from '@/entities/PostCard';
import { createAsyncThunk } from '@reduxjs/toolkit';

interface PostCommentsParams {
  post: IPost;
}

interface GetFetchCommentsTypes {
  comments: IComment[];
  message: string;
}

export const getFetchComments = createAsyncThunk<
  any,
  PostCommentsParams,
  ThunkConfig<string>
>('post/getComments', async (params, thunkApi) => {
  const { rejectWithValue, extra } = thunkApi;

  try {
    // const { data } = await extra.api.get<GetFetchCommentsTypes>(
    //   `/${params.post._id}/comments`
    // );
    // return data;
  } catch (error) {
    return rejectWithValue(error.response.data.message);
  }
});
