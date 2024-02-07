import { getAuthData } from '@/entities/User';
import { HStack } from '@/shared/ui';
import { Carousel } from 'antd';
import React from 'react';
import { useSelector } from 'react-redux';
import { getPersonalPosts } from '../../model/selectors/getPersonalPosts';
import styles from './MyPosts.module.scss';

interface MyPostsProps {
  id: string;
}

export const MyPosts = ({ id }: MyPostsProps) => {
  const myPosts = useSelector(getPersonalPosts);
  const auth = useSelector(getAuthData);

  if (id === auth?._id) {
    return (
      <div className={styles.myPosts}>
        {myPosts.map((post) => (
          <HStack className={styles.box}>
            <Carousel draggable effect="fade">
              {post.media.map((file) =>
                file.url.includes('.jpg') ? (
                  <div key={file.public_id}>
                    <img src={file.url} />
                  </div>
                ) : (
                  <div key={file.public_id}>
                    <video src={file.url} controls />
                  </div>
                )
              )}
            </Carousel>
          </HStack>
        ))}
      </div>
    );
  }

  return <div>Здесь будут отображаться чужие посты</div>;
};
