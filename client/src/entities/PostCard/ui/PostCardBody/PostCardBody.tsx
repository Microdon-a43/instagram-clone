import { Icon } from '@/shared/ui';
import { Carousel } from 'antd';
import { type FC } from 'react';
import { type PostCardProps } from '../../model/types/post';
import styles from './PostCardBody.module.scss';

export const PostCardBody: FC<PostCardProps> = ({ post }) => {
  return (
    <div className={styles.postBody}>
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
    </div>
  );
};
