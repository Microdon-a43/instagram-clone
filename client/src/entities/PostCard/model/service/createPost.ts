import { type ThunkConfig } from '@/app/provider';
import { uploadMedia, type MediaUpload } from '@/shared/lib/uploadMedia';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { postActions } from '../slice/postSlice';
import { type IPost } from '../types/post';

interface CreatePostParams {
  content: string;
  media: File[];
}

interface GetCreatePostData {
  newPost: IPost;
}

export const createPost = createAsyncThunk<
  any,
  CreatePostParams,
  ThunkConfig<string>
>('post/create', async (params, thunkApi) => {
  const { extra, rejectWithValue, dispatch } = thunkApi;

  const { media, content } = params;
  try {
    let newMediaFiles: MediaUpload[] = [];

    if (media.length > 0) newMediaFiles = await uploadMedia(media);
    const res = await extra.api.post<GetCreatePostData>('/posts', {
      content,
      media: newMediaFiles
    });
    dispatch(postActions.setCreatePost(res.data.newPost));
  } catch (error) {
    return rejectWithValue(error.response.data.message);
  }
});
