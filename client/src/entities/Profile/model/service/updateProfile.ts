import { type ThunkConfig } from '@/app/provider';
import { userActions } from '@/entities/User';
import { type IUser } from '@/entities/User/model/types/user';
import { uploadMedia, type MediaUpload } from '@/shared/lib/uploadMedia';
import { createAsyncThunk } from '@reduxjs/toolkit';

interface UpdateProfileParams {
  user: IUser;
  avatar: File;
}

export const updateProfile = createAsyncThunk<
  any,
  UpdateProfileParams,
  ThunkConfig<string>
>('profile/updateProfile', async (params, thunkApi) => {
  const { rejectWithValue, dispatch, extra } = thunkApi;
  const { user, avatar } = params;

  try {
    let newAvatar: MediaUpload[] = [];

    if (avatar) newAvatar = await uploadMedia([avatar]);
    console.log(newAvatar);

    const newUser = {
      ...user,
      avatar: avatar ? newAvatar[0].url : user.avatar
    };
    const res = await extra.api.patch(`/user`, newUser);
    if (res.data) {
      dispatch(userActions.setUpdateUser(newUser));
    }
    return res.data;
  } catch (err: any) {
    return rejectWithValue(err.response.data.message);
  }
});
