import { type StateSchema } from '@/app/provider';

export const getCurrentChat = (state: StateSchema) =>
  state.conversation.currentChat || null;
