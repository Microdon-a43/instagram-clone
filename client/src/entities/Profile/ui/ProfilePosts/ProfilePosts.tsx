import { HStack, Icon, Text, VStack } from '@/shared/ui';
import React, { useEffect, useState } from 'react';
import { MyPosts, SavedPosts, MyMarks } from '@/entities/Profile/index';
import styles from './ProfilePosts.module.scss';
import { classNames } from '@/shared/lib/classNames';
import { useAppDispatch } from '@/shared/hooks/useAppDispatch';

interface ProfilePostsProps {
  id: string;
}

export const ProfilePosts = ({ id }: ProfilePostsProps) => {
  const dispatch = useAppDispatch();
  const [category, setCategory] = useState({
    myPosts: true,
    saved: false,
    marks: false
  });

  return (
    <VStack>
      <HStack className={styles.profilePosts}>
        <HStack align="center" gap={8}>
          <HStack
            gap={6}
            align="center"
            justify="center"
            className={classNames(
              styles.category,
              { [styles.active]: category.myPosts },
              []
            )}
          >
            <div
              className={styles.categoryName}
              onClick={() => {
                setCategory({ myPosts: true, saved: false, marks: false });
              }}
            >
              <Icon type="Grid" />
              <Text as="span" size={12}>
                ПУБЛИКАЦИИ
              </Text>
            </div>
          </HStack>
          <HStack
            gap={6}
            align="center"
            justify="center"
            className={classNames(
              styles.category,
              { [styles.active]: category.saved },
              []
            )}
          >
            <div
              className={styles.categoryName}
              onClick={() => {
                setCategory({ myPosts: false, saved: true, marks: false });
              }}
            >
              <Icon type="Bookmark" />
              <Text as="span" size={12}>
                СОХРАНЕННОЕ
              </Text>
            </div>
          </HStack>
          <HStack
            gap={6}
            align="center"
            justify="center"
            className={classNames(
              styles.category,
              { [styles.active]: category.marks },
              []
            )}
          >
            <div
              className={styles.categoryName}
              onClick={() => {
                setCategory({ myPosts: false, saved: false, marks: true });
              }}
            >
              <Icon type="Mark" />
              <Text size={12}>ОТМЕТКИ</Text>
            </div>
          </HStack>
        </HStack>
      </HStack>
      <HStack justify="between">
        {category.myPosts && <MyPosts id={id} />}
        {category.saved && <SavedPosts />}
        {category.marks && <MyMarks />}
      </HStack>
    </VStack>
  );
};
