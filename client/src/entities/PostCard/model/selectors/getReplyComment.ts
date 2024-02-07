import { type StateSchema } from '@/app/provider';

export const getReplyComment = (state: StateSchema) => state.post.reply || '';
