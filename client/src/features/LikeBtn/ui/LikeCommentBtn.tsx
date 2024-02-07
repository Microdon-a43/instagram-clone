import { type CommentProps } from '@/entities/PostCard/model/types/post';
import { Icon } from '@/shared/ui';
import React, { type FC, useState, useEffect } from 'react';
import { classNames } from '@/shared/lib/classNames';
import styles from './LikeBtn.module.scss';
import { useAppDispatch } from '@/shared/hooks/useAppDispatch';
import { useSelector } from 'react-redux';
import { getAuthData } from '@/entities/User';
import { likeComment, unlikeComment } from '@/entities/PostCard';

export const LikeCommentBtn: FC<CommentProps> = ({ comment }) => {
  const [isLiked, setIsLiked] = useState(false);

  const dispatch = useAppDispatch();
  const authData = useSelector(getAuthData);

  const onLike = () => {
    setIsLiked(true);
    dispatch(likeComment({ comment, auth: authData }));
  };
  const onUnlike = () => {
    setIsLiked(false);
    dispatch(unlikeComment({ comment, auth: authData }));
  };

  useEffect(() => {
    if (comment.likes.find((item) => item._id === authData?._id)) {
      setIsLiked(true);
    }
  }, [comment.likes, authData._id]);

  return (
    <>
      {isLiked ? (
        <Icon
          type="FilledHeart"
          className={classNames(styles.likeComment, {}, [])}
          onClick={onUnlike}
        />
      ) : (
        <Icon type="Heart" onClick={onLike} />
      )}
    </>
  );
};
