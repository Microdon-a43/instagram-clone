import { useAppDispatch } from '@/shared/hooks/useAppDispatch';
import { useCallback, useState } from 'react';
import { profileActions } from '../slice/profileSlice';
import { FollowEnum, type FollowModalTypes } from '../types/profile';

export const useProfileModal = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isFollowModal, setIsOpenModal] = useState<FollowModalTypes>({
    isOpen: false,
    view: FollowEnum.FOLLOWERS
  });
  const dispatch = useAppDispatch();

  const onOpen = () => {
    setIsOpen(true);
    dispatch(profileActions.setClearMessages());
  };
  const onClose = () => {
    setIsOpen(false);
  };

  const onOpenFollowersModal = useCallback(() => {
    setIsOpenModal({
      isOpen: true,
      view: FollowEnum.FOLLOWERS
    });
  }, [isFollowModal]);

  const onOpenFollowingModal = useCallback(() => {
    setIsOpenModal({
      isOpen: true,
      view: FollowEnum.FOLLOWING
    });
  }, [isFollowModal]);

  const onCloseFollowModal = useCallback(() => {
    setIsOpenModal((prev) => {
      return {
        ...prev,
        isOpen: false
      };
    });
  }, []);

  return {
    isOpen,
    isFollowModal,
    onClose,
    onOpen,
    onOpenFollowersModal,
    onOpenFollowingModal,
    onCloseFollowModal
  };
};
