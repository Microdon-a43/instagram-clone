import { likePost } from '@/entities/PostCard';
import { unlikePost } from '@/entities/PostCard/model/service/unlikePost';
import { type PostCardProps } from '@/entities/PostCard/model/types/post';
import { getAuthData } from '@/entities/User';
import { useAppDispatch } from '@/shared/hooks/useAppDispatch';
import { classNames, type Mods } from '@/shared/lib/classNames';
import { Icon } from '@/shared/ui';
import { useEffect, useState, type FC } from 'react';
import { useSelector } from 'react-redux';
import styles from './LikeBtn.module.scss';

export const LikeBtn: FC<PostCardProps> = ({ post }) => {
  const [isLike, setIsLike] = useState<boolean>(false);
  const [isLoad, setIsLoad] = useState<boolean>(false);
  const authData = useSelector(getAuthData);
  const dispatch = useAppDispatch();

  const onLike = async () => {
    if (isLoad) return;
    setIsLoad(true);
    await dispatch(likePost({ post, auth: authData }));
    setIsLoad(false);
  };
  const onUnLike = async () => {
    if (isLoad) return;
    setIsLoad(true);
    await dispatch(unlikePost({ post, auth: authData }));
    setIsLoad(false);
  };

  useEffect(() => {
    if (post.likes.find((item) => item._id === authData?._id)) {
      setIsLike(true);
    }

    return () => {
      setIsLike(false);
    };
  }, [post.likes, authData?._id]);

  const mods: Mods = {
    [styles.disabled]: isLoad
  };

  return (
    <>
      {isLike ? (
        <Icon
          type="FilledHeart"
          className={classNames(styles.like, mods, [])}
          onClick={onUnLike}
        />
      ) : (
        <Icon
          type="Heart"
          className={classNames('', mods, [])}
          onClick={onLike}
        />
      )}
    </>
  );
};
