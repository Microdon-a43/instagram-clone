import { lazy } from 'react';

export const FavouriveLazyPage = lazy(
  async () =>
    await new Promise((res) => {
      // @ts-expect-error
      setTimeout(() => {res(import('./FavourivePage'));
      }, 1000);
    })
);
