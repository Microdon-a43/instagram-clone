import { type StateSchema } from '@/app/provider';

export const getIsNewCovAdded = (state: StateSchema) =>
  state.conversation.isNewConvAdded || false;
