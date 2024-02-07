import { type StateSchema } from '@/app/provider';

export const getConvData = (state: StateSchema) =>
  state.conversation.conversations || [];
