/* eslint-disable @typescript-eslint/no-invalid-void-type */
import { type ThunkConfig } from '@/app/provider';
import { type IPost } from '@/entities/PostCard';
import { createAsyncThunk } from '@reduxjs/toolkit';

export interface GetFetchPostsTypes {
  posts: IPost[];
  message: string;
  result: number;
}

export const getFetchPosts = createAsyncThunk<any, void, ThunkConfig<string>>(
  'post/getPosts',
  async (_, thunkApi) => {
    const { extra, rejectWithValue } = thunkApi;

    try {
      const { data } = await extra.api.get<GetFetchPostsTypes>('/posts');
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);
