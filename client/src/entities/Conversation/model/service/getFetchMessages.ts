import { type ThunkConfig } from '@/app/provider';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { type IConversation } from '../types/conversation';

interface GetMessagesParams {
  currentChat: IConversation;
}

export const getFetchMessages = createAsyncThunk<
  any,
  GetMessagesParams,
  ThunkConfig<string>
>('conversation/messages', async (params, thunkApi) => {
  const { rejectWithValue, extra } = thunkApi;
  const { currentChat } = params;

  try {
    const { data } = await extra.api.get('/messages/' + currentChat._id);
    return data;
  } catch (error) {
    return rejectWithValue(error.response.data.message);
  }
});
