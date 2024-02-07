import { type StateSchema } from '@/app/provider';

export const getPersonalPosts = (state: StateSchema) =>
  state.profile.myPosts || [];
