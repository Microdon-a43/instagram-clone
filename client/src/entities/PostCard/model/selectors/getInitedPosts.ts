import { type StateSchema } from '@/app/provider';

export const getInitedPosts = (state: StateSchema) =>
  state.post.inited || false;
