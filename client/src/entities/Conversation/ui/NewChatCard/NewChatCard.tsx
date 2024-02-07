import { createMessage } from '@/entities/Conversation/model/service/createMessage';
import { getAuthData } from '@/entities/User';
import { type IUser } from '@/entities/User/model/types/user';
import { useAppDispatch } from '@/shared/hooks/useAppDispatch';
import {
  Avatar,
  Form,
  HStack,
  Icon,
  Text,
  UserCard,
  VStack
} from '@/shared/ui';
import EmojiPicker, {
  EmojiStyle,
  type EmojiClickData
} from 'emoji-picker-react';
import React, { useState, type ChangeEvent, type FC } from 'react';
import { useSelector } from 'react-redux';
import styles from './NewChatCard.module.scss';

interface NewChatCardProps {
  user?: IUser;
}

export const NewChatCard: FC<NewChatCardProps> = ({ user }) => {
  const [message, setMessage] = useState('');
  const auth = useSelector(getAuthData);
  const [showPickers, setShowPickers] = useState(false);
  const dispatch = useAppDispatch();

  const handleChange = (emojiData: EmojiClickData, e: MouseEvent) => {
    setMessage((prev) => prev + emojiData.emoji);
  };

  const handleSubmit = async (e: React.KeyboardEvent<HTMLFormElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const newMessage = {
        sender: auth._id,
        recipient: user._id,
        text: message
      };
      await dispatch(createMessage({ message: newMessage }));
    }
  };

  return (
    <VStack className={styles.newChat}>
      <HStack className={styles.top} align="center">
        <UserCard
          id={user._id}
          title={user.fullname}
          content={user.username}
          size={56}
          src={user.avatar}
        />
        <Icon type="Info" />
      </HStack>
      <VStack className={styles.middle} justify="between">
        <VStack align="center" gap={6}>
          <Avatar size={150} src={user.avatar} />
          <Text as="h2">{user.fullname}</Text>
          <HStack justify="center" gap={6}>
            <Text as="span">{user.username}</Text>
            <Text as="span">Instagram</Text>
          </HStack>
        </VStack>
      </VStack>
      <HStack className={styles.bottom}>
        <HStack className={styles.inputBox} align="center">
          <Form onKeyDown={handleSubmit}>
            <input
              value={message}
              placeholder="Напищите сообщение..."
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                setMessage(e.target.value);
              }}
            />

            <div className={styles.leftIcon}>
              <Icon
                type="Emoji"
                onClick={() => {
                  setShowPickers(!showPickers);
                }}
              />
            </div>
            {showPickers && (
              <div className={styles.pickers}>
                <EmojiPicker
                  onEmojiClick={handleChange}
                  autoFocusSearch={false}
                  emojiStyle={EmojiStyle.NATIVE}
                />
              </div>
            )}
            <HStack className={styles.rightIcons} gap={4} justify="end">
              <Icon type="Microphone" />
              <Icon type="Pic" />
            </HStack>
          </Form>
        </HStack>
      </HStack>
    </VStack>
  );
};
