import { type StateSchema } from '@/app/provider';

export const getProfileUpdateSuccess = (state: StateSchema) =>
  state.profile.success || '';
