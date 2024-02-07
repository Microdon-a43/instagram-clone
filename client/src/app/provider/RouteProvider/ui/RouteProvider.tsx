import {
  HomePage,
  RegisterLazyPage,
  LoginLazyPage,
  ProfileLazyPage,
  ConversationLazyPage
} from '@/pages';
import { FavouriveLazyPage } from '@/pages/FavourivePage/ui/FavouriveLazyPage';

import { Spinner } from '@/shared/ui';
import { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import AppLayout from './AppLayout';
import AuthLayout from './AuthLayout';

export const RouteProvider = () => {
  return (
    <Suspense fallback={<Spinner className="spinner" />}>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/profile/:id" element={<ProfileLazyPage />} />
          <Route path="/conversation" element={<ConversationLazyPage />} />
          <Route path="/favourite" element={<FavouriveLazyPage />} />
        </Route>
        <Route path="/" element={<AuthLayout />}>
          <Route path="/login" element={<LoginLazyPage />} />
          <Route path="/register" element={<RegisterLazyPage />} />
        </Route>
      </Routes>
    </Suspense>
  );
};
