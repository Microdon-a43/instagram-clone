import { type StateSchema } from '@/app/provider';

export const getUserNewChat = (state: StateSchema) =>
  state.profile.newUser || null;
