/* eslint-disable @typescript-eslint/indent */
import { type ThunkConfig } from '@/app/provider';
import { userActions } from '@/entities/User';
import { type IUser } from '@/entities/User/model/types/user';
import { LOCAL_STORAGE_TOKEN } from '@/shared/consts/localStorage';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { type LoginFormValues } from '../schema/useLoginForm';

interface GetFetchLoginData {
  user: IUser;
  token: string;
}

export const loginByEmail = createAsyncThunk<
  any,
  LoginFormValues,
  ThunkConfig<string>
>('auth/login', async (userData, thunkApi) => {
  const { rejectWithValue, dispatch, extra } = thunkApi;
  try {
    const res = await extra.api.post('/login', userData);
    if (res.data) {
      dispatch(userActions.setAuthData(res.data));
      localStorage.setItem(LOCAL_STORAGE_TOKEN, res.data.token);
    }
    console.log(res);
  } catch (err: any) {
    return rejectWithValue(err.response.data.message);
  }
});
