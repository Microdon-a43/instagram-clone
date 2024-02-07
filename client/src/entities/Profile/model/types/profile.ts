import { type IPost } from '@/entities/PostCard';
import { type IUser } from '@/entities/User/model/types/user';

export interface ProfileState {
  posts: IPost[];
  users: IUser[];
  myPosts: IPost[];
  newUser: IUser;
  user: IUser;
  error: string;
  success: string;
  loading: boolean;
  searchUsers: IUser[];
  searchLoading: boolean;
}

export enum FollowEnum {
  FOLLOWERS = 'followers',
  FOLLOWING = 'following'
}

export interface FollowModalTypes {
  isOpen: boolean;
  view?: FollowEnum;
}
