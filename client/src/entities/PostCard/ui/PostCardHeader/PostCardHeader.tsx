import { Icon, Text, UserCard } from '@/shared/ui';
import { message, Modal, type MenuProps } from 'antd';
import { useState, type FC, useEffect } from 'react';
import { type PostCardProps } from '../../model/types/post';
import { DropDown } from '../../../../shared/ui/Popups/Dropdown/Dropdown';
import styles from './PostCardHeader.module.scss';
import { useSelector } from 'react-redux';
import { getAuthData } from '@/entities/User';
import { useAppDispatch } from '@/shared/hooks/useAppDispatch';
import { deletePost } from '../../model/service/deletePost';
import { EditPost } from '../EditPost/EditPost';

export const PostCardHeader: FC<PostCardProps> = ({ post }) => {
  const { user, _id } = post;
  const auth = useSelector(getAuthData);
  const dispatch = useAppDispatch();
  const [isOpen, setIsOpen] = useState(false);
  // const postItems = postRights(post.user._id === auth._id);

  const onDeletePost = (id: string) => {
    if (user._id === auth._id) {
      dispatch(deletePost({ id }));
    } else {
      message.error('У Вас нет прав на удаление этого поста');
    }
  };
  const editPostItems: MenuProps['items'] = [
    {
      label: (
        <Text
          color="default"
          className={post.user._id !== auth._id && styles.disabled}
        >
          Редактировать
        </Text>
      ),
      onClick: () => {
        if (post.user._id === auth._id) {
          setIsOpen(true);
        } else {
          message.error('У Вас нет прав на редактирование этого поста');
        }
      },
      key: '0'
    },
    {
      label: (
        <Text
          color="default"
          className={post.user._id !== auth._id && styles.disabled}
        >
          Удалить
        </Text>
      ),
      onClick: () => {
        onDeletePost(_id);
      },
      key: '1'
    },
    {
      label: <Text color="default">Поделиться</Text>,
      key: '2'
    }
  ];

  const onClose = () => {
    setIsOpen(false);
  };

  return (
    <header className={styles.header}>
      <UserCard
        src={user.avatar}
        id={user._id}
        title={user.fullname}
        content=""
        size={32}
      >
        <Modal
          title={<Text color="default">Edit Post</Text>}
          onCancel={onClose}
          centered
          footer={false}
          open={isOpen}
        >
          <EditPost post={post} onClose={onClose} />
        </Modal>
        <DropDown items={editPostItems} placement="bottomRight">
          <Icon type="Dots" size={24} />
        </DropDown>
      </UserCard>
    </header>
  );
};
