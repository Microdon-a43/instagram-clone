import { type IUser } from '@/entities/User/model/types/user';

export interface IMessage {
  _id: string;
  conversationId: IConversation;
  sender: IUser;
  recipient: IUser;
  text: string;
  media: [];
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}

export interface IConversation {
  members: IUser[];
  text: string;
  media: [];
  _id: string;
  __v: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface ConversationState {
  conversations: IConversation[];
  messages: IMessage[];
  currentChat: IConversation;
  isLoading: boolean;
  error: string;
  isNewConvAdded: boolean;
}

export interface DetailedMessageType {
  sender: string;
  recipient: string;
  text: string;
}

export interface CreateMessageType {
  message: DetailedMessageType;
}
