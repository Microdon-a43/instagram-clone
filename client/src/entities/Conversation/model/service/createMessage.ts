import { type ThunkConfig } from '@/app/provider';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { conversationActions } from '../slice/conversationSlice';
import {
  type IConversation,
  type CreateMessageType,
  type IMessage
} from '../types/conversation';

interface GetFetchMessageType {
  newMessage: IMessage;
  newConversation: IConversation;
}

export const createMessage = createAsyncThunk<
  any,
  CreateMessageType,
  ThunkConfig<string>
>('conversation/createMessage', async (params, thunkApi) => {
  const { rejectWithValue, extra, dispatch } = thunkApi;

  const { message } = params;
  console.log(message);

  try {
    const { data } = await extra.api.post<GetFetchMessageType>(
      '/message',
      message
    );

    if (data) {
      // dispatch(conversationActions.setMessages(data.newMessage));
      dispatch(conversationActions.setConversations(data.newConversation));
      dispatch(conversationActions.setCurrentChat(data.newConversation));
    }
  } catch (error) {
    return rejectWithValue(error.response.data.message);
  }
});
