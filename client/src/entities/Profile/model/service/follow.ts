import { type ThunkConfig } from '@/app/provider';
import { userActions } from '@/entities/User';
import { type IUser } from '@/entities/User/model/types/user';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { profileActions } from '../slice/profileSlice';

interface followUserParams {
  user: IUser;
  auth: IUser;
}

export const followUser = createAsyncThunk<
  any,
  followUserParams,
  ThunkConfig<string>
>('profile/follow', async (params, thunkApi) => {
  const { rejectWithValue, dispatch, extra } = thunkApi;
  const { user, auth } = params;

  try {
    const newUser = {
      ...user,
      followers: [...user.followers, auth]
    };
    dispatch(profileActions.setUpdateFollow(newUser));

    dispatch(
      userActions.setUpdateUser({
        ...auth,
        following: [...auth.following, user]
      })
    );

    await extra.api.patch(`/user/${user._id}/follow`);
  } catch (err: any) {
    return rejectWithValue(err.response.data.message);
  }
});
