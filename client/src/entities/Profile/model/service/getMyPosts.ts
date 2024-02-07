/* eslint-disable @typescript-eslint/no-invalid-void-type */
import { type ThunkConfig } from '@/app/provider';
import { type IPost } from '@/entities/PostCard';
import { createAsyncThunk } from '@reduxjs/toolkit';

interface GetFetchMyPostsTypes {
  posts: IPost[];
}

export const getMyPosts = createAsyncThunk<any, void, ThunkConfig<string>>(
  'profile/getMyPosts',
  async (_, thunkApi) => {
    const { rejectWithValue, extra } = thunkApi;
    try {
      const { data } = await extra.api.get<GetFetchMyPostsTypes>('/myPosts');
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);
