import { type ThunkConfig } from '@/app/provider';
import { type MediaUpload } from '@/shared/lib/uploadMedia';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { postActions } from '../slice/postSlice';
import { type IPost } from '../types/post';

interface UpdatePostParams {
  content: string;
  media: MediaUpload[];
  post: IPost;
}

export const updatePost = createAsyncThunk<
  any,
  UpdatePostParams,
  ThunkConfig<string>
>('post/update', async (params, thunkApi) => {
  const { extra, rejectWithValue, dispatch } = thunkApi;

  const { media, content, post } = params;

  const newPost = {
    ...post,
    media,
    content
  };

  dispatch(postActions.setUpdatePost(newPost));

  try {
    const res = await extra.api.patch(`/post/${post._id}`, {
      content,
      media
    });
  } catch (error) {
    return rejectWithValue(error.response.data.message);
  }
});
