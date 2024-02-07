/* eslint-disable @typescript-eslint/no-invalid-void-type */
import { type ThunkConfig } from '@/app/provider';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { conversationActions } from '../slice/conversationSlice';
import { type IConversation } from '../types/conversation';

interface GetFetchConvData {
  conversations: IConversation[];
}

export const getFetchConversations = createAsyncThunk<
  any,
  void,
  ThunkConfig<string>
>('conversation/getConv', async (_, thunkApi) => {
  const { extra, rejectWithValue, dispatch } = thunkApi;

  try {
    const { data } = await extra.api.get<GetFetchConvData>(`/conversations`);
    return data;
  } catch (error) {
    return rejectWithValue(error.response.data.message);
  }
});
