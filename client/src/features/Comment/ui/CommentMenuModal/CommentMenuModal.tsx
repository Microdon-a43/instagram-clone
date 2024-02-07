import { postActions, type IComment } from '@/entities/PostCard';
import { deleteComment } from '@/entities/PostCard/model/service/deleteComment';
import { getAuthData } from '@/entities/User';
import { useAppDispatch } from '@/shared/hooks/useAppDispatch';
import { Text, VStack } from '@/shared/ui';
import { Modal } from 'antd';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { EditCommentModal } from '../EditCommentModal/EditCommentModal';
import styles from './CommentMenuModal.module.scss';

interface CommentMenuModalProps {
  isOpen?: boolean;
  onClose: () => void;
  comment: IComment;
}

export const CommentMenuModal = ({
  isOpen,
  onClose,
  comment
}: CommentMenuModalProps) => {
  const auth = useSelector(getAuthData);
  const dispatch = useAppDispatch();
  const [isOpenModal, setIsOpenModal] = useState(false);

  const handleDeleteComment = (data: IComment) => {
    dispatch(deleteComment({ comment: data }));
  };

  return (
    <VStack className={styles.commentMenu}>
      <Modal
        open={isOpen}
        onCancel={onClose}
        footer={false}
        className={styles.modal}
        centered
      >
        <VStack align="center" className={styles.items}>
          {comment.user._id === auth?._id && (
            <>
              <Text
                as="span"
                color="default"
                onClick={() => {
                  setIsOpenModal(true);
                }}
              >
                Редактировать
              </Text>
              <Text
                as="span"
                color="default"
                onClick={() => {
                  handleDeleteComment(comment);
                }}
              >
                Удалить
              </Text>
            </>
          )}
          {isOpenModal && (
            <EditCommentModal
              isOpen={isOpenModal}
              onClose={onClose}
              comment={comment}
            />
          )}
          <Text as="span" color="default">
            Пожаловаться
          </Text>
          <Text as="span" onClick={onClose}>
            Отмена
          </Text>
        </VStack>
      </Modal>
    </VStack>
  );
};
