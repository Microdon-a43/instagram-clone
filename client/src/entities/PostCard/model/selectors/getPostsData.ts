import { type StateSchema } from '@/app/provider';

export const getPostsData = (state: StateSchema) => state.post.posts || [];
