import { type IPost } from '@/entities/PostCard';
import { type IUser } from '@/entities/User/model/types/user';

export interface HomeUserProps {
  user: IUser;
}

export interface HomePageState {
  posts: IPost[];
}
