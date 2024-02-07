import { createSlice } from '@reduxjs/toolkit';
import { loginByEmail } from '../service/loginByEmail';
import { registerByEmail } from '../service/registerByEmail';
import { type AuthState } from '../types/auth';

const initialState: AuthState = {
  loading: false,
  error: ''
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers (builder) {
    builder
      .addCase(registerByEmail.pending, (state, _) => {
        state.loading = true;
      })
      .addCase(registerByEmail.fulfilled, (state, action) => {
        state.loading = false;
        state.error = '';
      })
      .addCase(registerByEmail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(loginByEmail.pending, (state, _) => {
        state.loading = true;
      })
      .addCase(loginByEmail.fulfilled, (state, action) => {
        state.loading = false;
        state.error = '';
      })
      .addCase(loginByEmail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const authActions = authSlice.actions;
export const authReducer = authSlice.reducer;
