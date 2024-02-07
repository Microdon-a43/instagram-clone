import { type IUser } from '@/entities/User/model/types/user';
import { type MediaUpload } from '@/shared/lib/uploadMedia';

export interface IComment {
  _id: string;
  __v: number;
  content: string;
  postId: string;
  postUserId: string;
  createdAt: Date;
  updatedAt: Date;
  user: IUser;
  reply: string;
  likes: IUser[];
}

export interface IPost {
  _id: string;
  __v: number;
  content: string;
  media: MediaUpload[];
  user: IUser;
  createdAt: Date;
  updatedAt: Date;
  comments: IComment[];
  likes: IUser[];
}

export interface PostState {
  posts: IPost[];
  comments: IComment[];
  isLoading: boolean;
  resultPosts: number;
  error: string;
  inited: boolean;
  reply: null;
  replies: IComment[];
}

export interface PostCardProps {
  post: IPost;
}

export interface CommentProps {
  comment: IComment;
}
