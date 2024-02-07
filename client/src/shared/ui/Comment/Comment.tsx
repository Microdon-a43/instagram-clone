/* eslint-disable @typescript-eslint/no-confusing-void-expression */
import { type StateSchema } from '@/app/provider';
import { postActions, type IComment } from '@/entities/PostCard';
import { LikeCommentBtn } from '@/features';
import { CommentMenuModal } from '@/features/Comment';
import { useAppDispatch } from '@/shared/hooks/useAppDispatch';
import { classNames } from '@/shared/lib/classNames';
import { AppLink, Avatar, HStack, Icon, Text, VStack } from '@/shared/ui';
import { Button } from 'antd';
import moment from 'moment';
import React, { type MouseEventHandler, type FC, useState } from 'react';
import { useSelector } from 'react-redux';
import { type AvatarSize } from '../Avatar/Avatar';
import styles from './Comment.module.scss';

interface CommentProps {
  className?: string;
  src?: string;
  name: string;
  id?: string;
  size?: AvatarSize;
  content: string;
  createdAt?: Date;
  onClick?: () => void;
  onMouseEnter?: MouseEventHandler;
  onReply?: () => void;
  isOpen?: boolean;
  emoji?: any;
  comment: IComment;
  edit?: boolean;
}

const sizeClasses: Record<AvatarSize, string> = {
  22: styles.size22,
  32: styles.size32,
  56: styles.size56,
  150: styles.size150
};

export const Comment: FC<CommentProps> = (props) => {
  const {
    className = '',
    src,
    name,
    id,
    content,
    size,
    createdAt,
    onClick,
    isOpen,
    comment
  } = props;
  const [onFocusEl, setOnFocusEl] = useState(null);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const dispatch = useAppDispatch();
  const createdDate = moment(createdAt).fromNow();
  const replies = useSelector((state: StateSchema) => state.post.replies);

  const handleFocusOn = (e: React.MouseEvent<HTMLDivElement>) => {
    setOnFocusEl(e.currentTarget);
  };

  const handleFocusOff = (e: React.MouseEvent<HTMLDivElement>) => [
    setOnFocusEl(null)
  ];
  const onReply = (id: string) => {
    dispatch(postActions.setReplyComment(id));
  };

  const onClose = () => {
    setIsOpenModal(false);
  };
  console.log(replies);
  if (!comment.reply) {
    return (
      <VStack
        className={classNames(styles.comment, {}, [className])}
        gap={12}
        onMouseEnter={handleFocusOn}
        onMouseLeave={handleFocusOff}
      >
        <HStack gap={32}>
          <HStack gap={16}>
            <Avatar
              size={size}
              src={src && src}
              className={classNames(styles.avatar, {}, [sizeClasses[size]])}
            />

            <Text as="p">
              <AppLink to={`/profile/${id}`}>
                <Text color="title" fw={600} as="span">
                  {name + ' '}
                </Text>
              </AppLink>

              {content}
            </Text>
          </HStack>
          <LikeCommentBtn comment={comment} />
        </HStack>
        <HStack gap={16} align="center">
          <Text as="span" size={10}>
            {createdAt ? createdDate : '2 дн'}
          </Text>
          {comment.likes.length > 0 && (
            <Text as="span" size={10}>
              {comment.likes.length} likes
            </Text>
          )}

          <Button
            style={{ border: 'none' }}
            onClick={() => onReply(comment._id)}
          >
            Ответить
          </Button>
          {/* {hasReplies && <Text>Посмотреть комментарий</Text>} */}
          {onFocusEl && (
            <Icon
              type="Dots"
              size={24}
              className={styles.icon}
              onClick={() => setIsOpenModal(true)}
            />
          )}

          {isOpenModal && (
            <CommentMenuModal
              isOpen={isOpenModal}
              onClose={onClose}
              comment={comment}
            />
          )}
        </HStack>
      </VStack>
    );
  }
};
