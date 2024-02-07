import { createSlice } from '@reduxjs/toolkit';
import { getFetchAuthUser } from '../service/getFetchAuthUser';
import { type UserState } from '../types/user';

const initialState: UserState = {
  user: null,
  token: '',
  loading: false
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setAuthData: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    setUpdateUser: (state, action) => {
      state.user = action.payload;
    }
  },
  extraReducers(builder) {
    builder
      .addCase(getFetchAuthUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(getFetchAuthUser.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(getFetchAuthUser.rejected, (state) => {
        state.loading = false;
      });
  }
});

export const userActions = userSlice.actions;
export const userReducer = userSlice.reducer;
