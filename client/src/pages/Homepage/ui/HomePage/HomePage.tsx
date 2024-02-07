import { getInitedPosts } from '@/entities/PostCard';
import { getAuthData } from '@/entities/User';
import { PostsList } from '@/features';
import { useAppDispatch } from '@/shared/hooks/useAppDispatch';
import { HStack, VStack } from '@/shared/ui';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getFetchPosts } from '../../model/service/getFetchPosts';
import { HomeStories } from '../HomeStories/HomeStories';
import { HomeSuggestions } from '../HomeSuggestions/HomeSuggestions';
import { HomeUserCard } from '../HomeUserCard/HomeUserCard';
import styles from './HomePage.module.scss';

export const HomePage = () => {
  const authData = useSelector(getAuthData);
  const isInitedPosts = useSelector(getInitedPosts);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!isInitedPosts) {
      dispatch(getFetchPosts());
    }
  }, [isInitedPosts, dispatch]);

  return (
    <HStack className={styles.home} gap={28}>
      <VStack className={styles.leftside} gap={22}>
        <HomeStories />
        <PostsList />
      </VStack>
      <VStack className={styles.rightside}>
        <HomeUserCard user={authData} />
        <HomeSuggestions user={authData} />
      </VStack>
    </HStack>
  );
};
