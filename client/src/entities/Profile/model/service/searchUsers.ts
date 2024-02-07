/* eslint-disable @typescript-eslint/indent */
import { type ThunkConfig } from '@/app/provider';
import { type IUser } from '@/entities/User/model/types/user';
import { createAsyncThunk } from '@reduxjs/toolkit';

interface SearchUserParams {
  search: string;
}
interface GetFetchSearchUsers {
  users: IUser[];
}

export const searchUsers = createAsyncThunk<
  any,
  // eslint-disable-next-line @typescript-eslint/no-invalid-void-type
  SearchUserParams,
  ThunkConfig<string>
>('profile/searchUsers', async ({ search }, thunkApi) => {
  const { rejectWithValue, extra } = thunkApi;
  try {
    const res = await extra.api.get<GetFetchSearchUsers>(
      `/search?username=${search}`
    );
    return res.data.users;
  } catch (err: any) {
    console.log(err);
    return rejectWithValue(err.response.data.message);
  }
});
