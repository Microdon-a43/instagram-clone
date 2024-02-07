import { type StateSchema } from '@/app/provider';

export const getAddPostModalOpen = (state: StateSchema) =>
  state.addPostModal.isOpen || false;
