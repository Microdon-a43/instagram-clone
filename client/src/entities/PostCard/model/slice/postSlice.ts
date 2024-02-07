import {
  getFetchPosts,
  type GetFetchPostsTypes
} from '@/pages/Homepage/model/service/getFetchPosts';
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { updatePost } from '../service/updatePost';
import { type IComment, type IPost, type PostState } from '../types/post';

const initialState: PostState = {
  isLoading: false,
  posts: [],
  resultPosts: 0,
  error: '',
  inited: false,
  reply: null,
  replies: [],
  comments: []
};

const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    setCreatePost: (state, action: PayloadAction<IPost>) => {
      state.posts = [action.payload, ...state.posts];
    },
    setPostLikes: (state, action: PayloadAction<IPost>) => {
      state.posts = state.posts.map((post) =>
        post._id === action.payload._id ? action.payload : post
      );
    },
    setUpdatePost: (state, action: PayloadAction<IPost>) => {
      state.posts = state.posts.map((post) =>
        post._id === action.payload._id ? action.payload : post
      );
    },
    setDeletePost: (state, action) => {
      state.posts = state.posts.filter((post) => post._id !== action.payload);
    },
    setPostComment: (state, action: PayloadAction<IComment>) => {
      state.posts.find((post) =>
        post._id === action.payload.postId
          ? post.comments.push(action.payload)
          : null
      );
    },
    setReplyComment: (state, action) => {
      state.reply = action.payload;
    },
    setOnDeleteReply: (state) => {
      state.reply = null;
    },
    setAllReplies: (state, action) => {
      state.replies = action.payload;
    },
    deleteComment: (state, action: PayloadAction<IComment>) => {
      const { postId, _id } = action.payload;
      state.posts.find(
        (post) =>
          post._id === postId &&
          post.comments.map(
            (c, i) => c._id === _id && post.comments.splice(i, 1)
          )
      );
    },
    updateComment: (state, action: PayloadAction<IComment>) => {
      state.posts.find(
        (post) =>
          post._id === action.payload.postId &&
          post.comments.map((c, i) =>
            c._id === action.payload._id ? action.payload : c
          )
      );
    }
  },
  extraReducers(builder) {
    builder
      .addCase(getFetchPosts.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(
        getFetchPosts.fulfilled,
        (state, action: PayloadAction<GetFetchPostsTypes>) => {
          state.isLoading = false;
          state.posts = action.payload.posts;
          state.resultPosts = action.payload.posts.length;
          state.inited = true;
        }
      )
      .addCase(getFetchPosts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(updatePost.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(updatePost.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  }
});

export const postActions = postSlice.actions;
export const postReducer = postSlice.reducer;
