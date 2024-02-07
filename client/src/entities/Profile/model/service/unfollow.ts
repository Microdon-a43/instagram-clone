import { type ThunkConfig } from '@/app/provider';
import { userActions } from '@/entities/User';
import { type IUser } from '@/entities/User/model/types/user';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { profileActions } from '../slice/profileSlice';

interface followUserParams {
  user: IUser;
  auth: IUser;
}

export const unfollowUser = createAsyncThunk<
  any,
  followUserParams,
  ThunkConfig<string>
>('profile/unfollow', async (params, thunkApi) => {
  const { rejectWithValue, dispatch, extra } = thunkApi;
  const { user, auth } = params;

  try {
    const newUser = {
      ...user,
      followers: user.followers.filter((item) => item._id !== auth._id)
    };
    dispatch(profileActions.setUpdateFollow(newUser));

    dispatch(
      userActions.setUpdateUser({
        ...auth,
        following: auth.following.filter((item) => item._id !== user._id)
      })
    );
    await extra.api.patch(`/user/${user._id}/unfollow`);
  } catch (err: any) {
    console.log(err);
    return rejectWithValue(err.response.data.message);
  }
});
