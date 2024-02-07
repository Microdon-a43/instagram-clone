export type { PostState, IPost, IComment } from './model/types/post';

export { postActions, postReducer } from './model/slice/postSlice';

export { createPost } from './model/service/createPost';
export { deletePost } from './model/service/deletePost';
export { likePost } from './model/service/likePost';
export { EditPost } from './ui/EditPost/EditPost';
export { updatePost } from './model/service/updatePost';
export { likeComment } from './model/service/likeComment';
export { unlikeComment } from './model/service/unlikeComment';

export { getPostsData } from './model/selectors/getPostsData';
export { getPostsLoading } from './model/selectors/getPostsLoading';
export { getInitedPosts } from './model/selectors/getInitedPosts';

export { PostCardSkeleton } from './ui/PostCardSkeleton/PostCardSkeleton';
