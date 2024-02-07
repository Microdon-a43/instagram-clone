import { getAllUsers, getUserProfile, ProfileInfo } from '@/entities/Profile';
import { useAppDispatch } from '@/shared/hooks/useAppDispatch';
import { Comment } from '@/shared/ui';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import styles from './ProfilePage.module.scss';

const ProfilePage = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams<{ id: string }>();
  const profileUsers = useSelector(getAllUsers);

  useEffect(() => {
    if (profileUsers.every((user) => user._id !== id)) {
      dispatch(getUserProfile({ id }));
    }
  }, [id, dispatch, profileUsers]);
  return (
    <div className={styles.profile}>
      <ProfileInfo id={id} users={profileUsers} />
    </div>
  );
};

export default ProfilePage;
