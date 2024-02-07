import { type StateSchema } from '@/app/provider';

export const getUserProfileSelect = (state: StateSchema) =>
  state.profile.user || null;
