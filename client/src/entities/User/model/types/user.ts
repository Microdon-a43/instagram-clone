import { type IPost } from '@/entities/PostCard';

export interface IUser {
  email: string;
  fullname: string;
  password: string;
  username: string;
  role: string;
  gender: string;
  followers: IUser[];
  following: IUser[] | null;
  avatar: string;
  story: string;
  mobile: string;
  favourite: IPost[];
  website: string;
  createdAt: Date;
  updatedAt: Date;
  _id: string;
  _v: number;
}

export interface UserState {
  user: IUser;
  token: string;
  loading: boolean;
}
