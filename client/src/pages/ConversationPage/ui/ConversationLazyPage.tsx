import { lazy } from 'react';

export const ConversationLazyPage = lazy(
  
  async () =>
    await new Promise((res) => {
        // @ts-expect-error
      setTimeout(() => { res(import('./ConversationPage')) }, 1000);
    })
);
