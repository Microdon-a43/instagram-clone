/* eslint-disable @typescript-eslint/indent */
import { type ThunkConfig } from '@/app/provider';
import { userActions } from '@/entities/User';
import { type IUser } from '@/entities/User/model/types/user';
import { LOCAL_STORAGE_TOKEN } from '@/shared/consts/localStorage';
import { createAsyncThunk } from '@reduxjs/toolkit';

interface GetFetchLoginData {
  user: IUser;
  token: string;
}

export const getFetchAuthUser = createAsyncThunk<
  any,
  // eslint-disable-next-line @typescript-eslint/no-invalid-void-type
  void,
  ThunkConfig<string>
>('user/getUser', async (params, thunkApi) => {
  const { rejectWithValue, dispatch, extra } = thunkApi;
  try {
    const res = await extra.api.get<GetFetchLoginData>('/getMe');
    if (res.data) {
      dispatch(userActions.setAuthData(res.data));
      localStorage.setItem(LOCAL_STORAGE_TOKEN, res.data.token);
    }
  } catch (err: any) {
    console.log(err);
    return rejectWithValue(err.response.data.message);
  }
});
