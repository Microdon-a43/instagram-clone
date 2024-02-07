import { type StateSchema } from '@/app/provider';
import { type PostState } from '../types/post';

export const getPostsLoading = (state: StateSchema) =>
  state.post.isLoading || false;
