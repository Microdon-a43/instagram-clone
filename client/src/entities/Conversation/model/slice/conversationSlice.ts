import { createSlice } from '@reduxjs/toolkit';
import { getFetchConversations } from '../service/getFetchConversations';
import { getFetchMessages } from '../service/getFetchMessages';
import { type ConversationState } from '../types/conversation';

const initialState: ConversationState = {
  conversations: [],
  currentChat: null,
  messages: [],
  isLoading: false,
  error: '',
  isNewConvAdded: false
};

export const conversationSlice = createSlice({
  name: 'conversation',
  initialState,
  reducers: {
    setMessages: (state, action) => {
      state.messages = [...state.messages, action.payload];
    },
    setConversations: (state, action) => {
      const res = state.conversations.some(
        (conv) => conv._id === action.payload._id
      );
      if (!res) {
        state.conversations.push(action.payload);
      }
      state.isNewConvAdded = true;
    },
    setCurrentChat: (state, action) => {
      state.currentChat = action.payload;
    },
    setClearCurrentChat: (state) => {
      state.currentChat = null;
    }
  },
  extraReducers(builder) {
    builder.addCase(getFetchConversations.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getFetchConversations.fulfilled, (state, action) => {
      state.isLoading = false;
      state.conversations = action.payload;
    });
    builder
      .addCase(getFetchConversations.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(getFetchMessages.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getFetchMessages.fulfilled, (state, action) => {
        state.isLoading = false;
        state.messages = action.payload;
      })
      .addCase(getFetchMessages.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  }
});

export const conversationActions = conversationSlice.actions;
export const conversationReducer = conversationSlice.reducer;
