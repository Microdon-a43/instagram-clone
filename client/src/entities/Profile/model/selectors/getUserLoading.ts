import { type StateSchema } from '@/app/provider';

export const getUserLoading = (state: StateSchema) =>
  state.profile.loading || false;
