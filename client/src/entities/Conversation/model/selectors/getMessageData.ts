import { type StateSchema } from '@/app/provider';

export const getMessageData = (state: StateSchema) =>
  state.conversation.messages || [];
