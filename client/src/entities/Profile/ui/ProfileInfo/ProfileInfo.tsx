/* eslint-disable multiline-ternary */
import { getAuthData } from '@/entities/User';
import { type IUser } from '@/entities/User/model/types/user';
import { FollowBtn } from '@/features';
import { useAppDispatch } from '@/shared/hooks/useAppDispatch';
import { DropDown, HStack, Icon, Spinner, Text, VStack } from '@/shared/ui';
import { Avatar, Button, Modal } from 'antd';
import { useEffect, type FC } from 'react';
import { useSelector } from 'react-redux';
import { userProfile } from '../../model/consts/userProfile';
import {
  EditProfile,
  FollowEnum,
  FollowModal,
  getMyPosts,
  getPersonalPosts,
  getUserLoading,
  getUserProfileSelect,
  profileActions,
  ProfilePosts,
  useProfileModal
} from '@/entities//Profile/index';
import styles from './ProfileInfo.module.scss';

interface ProfileInfoProps {
  id: string;
  users: IUser[];
}

export const ProfileInfo: FC<ProfileInfoProps> = ({ id, users }) => {
  const authData = useSelector(getAuthData);
  const profileLoading = useSelector(getUserLoading);
  const user = useSelector(getUserProfileSelect);
  const dispatch = useAppDispatch();
  const myPosts = useSelector(getPersonalPosts);
  const dropdownItems = userProfile(authData?._id === id);
  const {
    isOpen,
    isFollowModal,
    onOpen,
    onClose,
    onCloseFollowModal,
    onOpenFollowersModal,
    onOpenFollowingModal
  } = useProfileModal();

  useEffect(() => {
    if (authData?._id === id) {
      dispatch(profileActions.setProfileUser(authData));
      dispatch(getMyPosts());
    } else {
      const newUser = users.find((item) => item._id === id);
      if (newUser) dispatch(profileActions.setProfileUser(newUser));
    }
  }, [id, authData, users]);

  if (profileLoading) {
    return (
      <HStack justify="center">
        <Spinner size="large" />
      </HStack>
    );
  }

  return (
    <VStack>
      <HStack className={styles.profileInfo}>
        {user && (
          <HStack gap={32}>
            <div>
              <Avatar size={150} src={user?.avatar} alt="Avatar" />
            </div>

            <VStack gap={32}>
              <HStack align="center" gap={28}>
                <Text>@{user.username}</Text>

                {authData?._id === id ? (
                  <Button onClick={onOpen} type="default">
                    Изменить профиль
                  </Button>
                ) : (
                  <FollowBtn user={user} id={id} />
                )}

                <Modal
                  title={<Text color="default">Edit Profile</Text>}
                  open={isOpen}
                  onCancel={onClose}
                  centered
                  footer={false}
                >
                  <EditProfile auth={authData} onClose={onClose} />
                </Modal>
                <DropDown items={dropdownItems} placement="bottomRight">
                  <Icon type="Dots" size={32} />
                </DropDown>
              </HStack>
              <HStack gap={32}>
                <HStack gap={8} max={false}>
                  <Text fw={700} color="default" size={16}>
                    {myPosts.length}
                  </Text>
                  <Text>посты</Text>
                </HStack>
                <HStack
                  max={false}
                  gap={8}
                  onClick={onOpenFollowersModal}
                  className={styles.follow}
                >
                  <Text fw={700} color="default" size={16}>
                    {user.followers.length}
                  </Text>
                  <Text>подписчики</Text>
                </HStack>
                <HStack
                  gap={8}
                  onClick={onOpenFollowingModal}
                  max={false}
                  className={styles.follow}
                >
                  <Text fw={700} color="default" size={16}>
                    {user.following.length}
                  </Text>
                  <Text>подписки</Text>
                </HStack>
              </HStack>

              <Modal
                title={
                  <Text color="default">
                    {isFollowModal.view === FollowEnum.FOLLOWERS
                      ? 'Подписчики'
                      : 'Подписки'}
                  </Text>
                }
                open={isFollowModal.isOpen}
                onCancel={onCloseFollowModal}
                centered
                footer={false}
              >
                <FollowModal
                  data={
                    isFollowModal.view === FollowEnum.FOLLOWERS
                      ? user.followers
                      : user.following
                  }
                />
              </Modal>
              <VStack gap={8}>
                <Text fw={700} color="default" size={18}>
                  {user?.fullname}
                </Text>
                <Text fw={400} color="default" size={16}>
                  {user?.mobile}
                </Text>
                <Text fw={400} color="default" size={16}>
                  <a href="" target="_blank">
                    {user?.website}
                  </a>
                </Text>
                <Text fw={400} color="default" size={16}>
                  <a href="" target="_blank">
                    {user?.story}
                  </a>
                </Text>
              </VStack>
            </VStack>
          </HStack>
        )}
      </HStack>
      <HStack>
        <ProfilePosts id={id} />
      </HStack>
    </VStack>
  );
};
