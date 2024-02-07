import {
  getPostsData,
  getPostsLoading,
  PostCardSkeleton
} from '@/entities/PostCard';
import { PostCard } from '@/entities/PostCard/ui/PostCard/PostCard';
import { HStack, VStack } from '@/shared/ui';
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

export const PostsList = () => {
  const { t } = useTranslation();
  const postsData = useSelector(getPostsData);
  const isLoading = useSelector(getPostsLoading);

  if (isLoading) {
    return (
      <VStack gap={22}>
        {[1, 2, 3, 4, 5].map((item, i) => (
          <PostCardSkeleton key={i} />
        ))}
      </VStack>
    );
  }

  return (
    <VStack gap={40}>
      {postsData.length > 0 ? (
        postsData.map((post) => <PostCard key={post._id} post={post} />)
      ) : (
        <div>{t('Здесь ничего нет')}Здесь ничего нет</div>
      )}
    </VStack>
  );
};
