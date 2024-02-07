import { type StateSchema } from '@/app/provider';

export const getAllUsers = (state: StateSchema) => state.profile.users || [];
