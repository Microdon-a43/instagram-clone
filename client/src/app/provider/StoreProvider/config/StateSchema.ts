import { type ConversationState } from '@/entities/Conversation';
import { type PostState } from '@/entities/PostCard';
import { type ProfileState } from '@/entities/Profile';
import { type UserState } from '@/entities/User';
import { type AddPostModalState } from '@/features/AddPostModal';
import { type AuthState } from '@/features/auth';
import { type AxiosInstance } from 'axios';

export interface StateSchema {
  auth: AuthState;
  user: UserState;
  profile: ProfileState;
  addPostModal: AddPostModalState;
  post: PostState;
  conversation: ConversationState;
}

export interface ThunkExtraArgs {
  api: AxiosInstance;
}

export interface ThunkConfig<T> {
  rejectValue: T;
  extra: ThunkExtraArgs;
  state: StateSchema;
}
