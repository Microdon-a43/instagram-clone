import { type ThunkConfig } from '@/app/provider';
import { type IComment, postActions, type IPost } from '@/entities/PostCard';
import { type IUser } from '@/entities/User/model/types/user';
import { createAsyncThunk } from '@reduxjs/toolkit';

interface CommentPostParams {
  post: IPost;
  comment: string;
  reply: null | string;
}

interface GetFetchCommentData {
  newComment: IComment;
}

export const commentPost = createAsyncThunk<
  any,
  CommentPostParams,
  ThunkConfig<string>
>('post/comment', async (params, thunkApi) => {
  const { extra, rejectWithValue, dispatch } = thunkApi;

  const { post, comment, reply } = params;

  const newData = {
    postId: post._id,
    content: comment,
    postUserId: post.user._id
  };

  const newReplyData = {
    postId: post._id,
    content: comment,
    reply,
    postUserId: post.user._id
  };

  try {
    const { data } = await extra.api.post<GetFetchCommentData>(
      '/comment',
      reply ? newReplyData : newData
    );

    dispatch(postActions.setPostComment(data.newComment));
    return data;
  } catch (error) {
    return rejectWithValue(error.response.data.message);
  }
});
