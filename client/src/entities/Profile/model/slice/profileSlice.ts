/* eslint-disable @typescript-eslint/space-before-function-paren */
import { createSlice } from '@reduxjs/toolkit';
import { add } from 'lodash-es';
import { getMyPosts } from '../service/getMyPosts';
import { getUserProfile } from '../service/getUserProfile';
import { searchUsers } from '../service/searchUsers';
import { updateProfile } from '../service/updateProfile';
import { type ProfileState } from '../types/profile';

const initialState: ProfileState = {
  posts: [],
  users: [],
  myPosts: [],
  newUser: null,
  user: null,
  loading: false,
  success: '',
  error: '',
  searchUsers: [],
  searchLoading: false
};

export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setProfileUser: (state, action) => {
      state.user = action.payload;
    },
    setSearchUsers: (state) => {
      state.searchUsers = [];
    },
    setClearMessages: (state) => {
      state.error = '';
      state.success = '';
    },
    setUpdateFollow: (state, action) => {
      state.users = state.users.map((user) =>
        user._id === action.payload._id ? action.payload : user
      );
    },
    getUserForChat: (state, action) => {
      state.newUser = state.searchUsers.find(
        (user) => user._id === action.payload
      );
    },
    setClearNewUser: (state) => {
      state.newUser = null;
    }
  },
  extraReducers(builder) {
    builder
      .addCase(searchUsers.pending, (state) => {
        state.searchLoading = true;
      })
      .addCase(searchUsers.fulfilled, (state, action) => {
        state.searchLoading = false;
        state.searchUsers = action.payload;
      })
      .addCase(searchUsers.rejected, (state) => {
        state.searchLoading = false;
      })

      .addCase(getUserProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.users = [...state.users, action.payload.user];
      })
      .addCase(getUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(updateProfile.pending, (state) => {
        state.error = '';
        state.success = '';
      })
      .addCase(updateProfile.fulfilled, (state) => {
        state.error = '';
        state.success = 'Профиль успешно обновлен';
      })
      .addCase(updateProfile.rejected, (state) => {
        state.error = 'Ошибка при обновлении профиля';
        state.success = '';
      })

      .addCase(getMyPosts.pending, (state) => {
        state.loading = true;
      })
      .addCase(getMyPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.myPosts = action.payload;
      })
      .addCase(getMyPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const profileActions = profileSlice.actions;
export const profileReducer = profileSlice.reducer;
