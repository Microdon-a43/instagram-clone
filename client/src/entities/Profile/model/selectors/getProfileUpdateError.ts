import { type StateSchema } from '@/app/provider';

export const getProfileUpdateError = (state: StateSchema) =>
  state.profile.error || '';
