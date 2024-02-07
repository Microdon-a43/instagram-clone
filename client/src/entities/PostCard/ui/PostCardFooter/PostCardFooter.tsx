/* eslint-disable eqeqeq */
import { LikeBtn } from '@/features';
import { HStack, Icon, Text, VStack } from '@/shared/ui';
import moment from 'moment';
import { type FC } from 'react';
import { type PostCardProps } from '../../model/types/post';
import styles from './PostCardFooter.module.scss';

export const PostCardFooter: FC<PostCardProps> = ({ post }) => {
  const createdDate = moment(post.createdAt).fromNow();

  return (
    <VStack>
      <HStack className={styles.icons} gap={12}>
        <HStack gap={12}>
          <LikeBtn post={post} />
          <Icon type="Comment" />
          <Icon type="SharePosts" />
        </HStack>

        <Icon type="Save" />
      </HStack>
      <VStack className={styles.body} gap={26}>
        <VStack gap={8}>
          <Text fw={700} color="default">
            {post.likes.length} отметок {'"Нравится"'}
          </Text>
          <div>
            <Text fw={700} as="span">
              {post.user.username}
            </Text>
            <Text as="span" fw={400} className={styles.text} color="default">
              {post.content}
            </Text>
          </div>
          <Text as="span" color="gray">
            {createdDate}
          </Text>
        </VStack>
      </VStack>
    </VStack>
  );
};
