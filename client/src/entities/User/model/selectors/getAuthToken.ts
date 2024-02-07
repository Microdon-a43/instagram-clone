import { type StateSchema } from '@/app/provider';

export const getAuthToken = (state: StateSchema) => state.user.token;
