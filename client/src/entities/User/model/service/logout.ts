/* eslint-disable @typescript-eslint/indent */
import { type ThunkConfig } from '@/app/provider';
import { LOCAL_STORAGE_TOKEN } from '@/shared/consts/localStorage';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const logout = createAsyncThunk<
  any,
  // eslint-disable-next-line @typescript-eslint/no-invalid-void-type
  void,
  ThunkConfig<string>
>('user/logout', async (_, thunkApi) => {
  const { rejectWithValue, extra } = thunkApi;
  try {
    const res = await extra.api.post('/logout');
    if (res.data) {
      localStorage.removeItem(LOCAL_STORAGE_TOKEN);
      window.location.href = '/';
    }
  } catch (err: any) {
    console.log(err);
    return rejectWithValue(err.response.data.message);
  }
});
