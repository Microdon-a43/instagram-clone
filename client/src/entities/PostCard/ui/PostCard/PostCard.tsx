import { VStack } from '@/shared/ui';
import { type FC } from 'react';
import { type PostCardProps } from '../../model/types/post';
import { PostCardBody } from '../PostCardBody/PostCardBody';
import { PostCardCommentForm } from '../PostCardCommentForm/PostCardCommentForm';
import { PostCardComments } from '../PostCardComments/PostCardComments';
import { PostCardFooter } from '../PostCardFooter/PostCardFooter';
import { PostCardHeader } from '../PostCardHeader/PostCardHeader';
import styles from './PostCard.module.scss';

export const PostCard: FC<PostCardProps> = ({ post }) => {
  return (
    <VStack className={styles.postCard}>
      <PostCardHeader post={post} />
      <PostCardBody post={post} />
      <PostCardFooter post={post} />
      <PostCardComments post={post} />
      <PostCardCommentForm post={post} />
    </VStack>
  );
};
