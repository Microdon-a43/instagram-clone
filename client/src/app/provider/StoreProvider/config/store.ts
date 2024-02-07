import { conversationReducer } from '@/entities/Conversation';
import { postReducer } from '@/entities/PostCard';
import { profileReducer } from '@/entities/Profile';
import { userReducer } from '@/entities/User';
import { addPostModalReducer } from '@/features/AddPostModal';
import { authReducer } from '@/features/auth/model/slice/authSlice';
import { $api } from '@/shared/api';
import { configureStore, type ReducersMapObject } from '@reduxjs/toolkit';
import { type ThunkExtraArgs, type StateSchema } from './StateSchema';

export const createStore = () => {
  const rootReducers: ReducersMapObject<StateSchema> = {
    auth: authReducer,
    user: userReducer,
    profile: profileReducer,
    addPostModal: addPostModalReducer,
    post: postReducer,
    conversation: conversationReducer
  };

  const extraArgs: ThunkExtraArgs = {
    api: $api
  };

  const store = configureStore({
    reducer: rootReducers,
    devTools: DEV,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        thunk: {
          extraArgument: extraArgs
        }
      })
  });

  return store;
};

export type AppDispatch = ReturnType<typeof createStore>['dispatch'];
