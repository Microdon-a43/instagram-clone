import { Form, HStack, Icon, Message, VStack } from '@/shared/ui';
import React, { type ChangeEvent, useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import {
  getFetchMessages,
  getCurrentChat,
  getMessageData,
  createMessage,
  getIsNewCovAdded,
  getFetchConversations,
  conversationActions
} from '@/entities/Conversation/index';
import styles from './CurrentChatCard.module.scss';
import { getAuthData } from '@/entities/User';
import { useAppDispatch } from '@/shared/hooks/useAppDispatch';
import { profileActions } from '@/entities/Profile';
import { io } from 'socket.io-client';

export const socket = io('ws://localhost:5000');

export const CurrentChatCard = () => {
  const currentChat = useSelector(getCurrentChat);
  const messages = useSelector(getMessageData);
  const auth = useSelector(getAuthData);
  const scrollRef = useRef(null);
  const dispatch = useAppDispatch();
  const [newMessage, setNewMessage] = useState('');
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [isCreated, setIsCreated] = useState(false);
  const isNewConvAdded = useSelector(getIsNewCovAdded);

  const handleSubmit = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    const recipient = currentChat.members.find((m) => m._id !== auth?._id);

    const message = {
      sender: auth?._id,
      recipient: recipient?._id,
      text: newMessage
    };

    socket.emit('sendMessage', {
      sender: auth?._id,
      recipient: recipient._id,
      text: newMessage
    });

    dispatch(createMessage({ message }));
    setIsCreated(true);
    setNewMessage('');
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewMessage(e.target.value);
  };

  useEffect(() => {
    scrollRef?.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (isNewConvAdded) {
      dispatch(getFetchConversations());
    }
  }, [isNewConvAdded]);

  useEffect(() => {
    dispatch(getFetchConversations());
    socket.on('getMessage', (data) => {
      setArrivalMessage(data);
    });
  }, []);

  useEffect(() => {
    socket.emit('addUser', auth?._id);
  }, [auth]);

  useEffect(() => {
    arrivalMessage && dispatch(conversationActions.setMessages(arrivalMessage));
  }, [arrivalMessage]);

  useEffect(() => {
    if (currentChat || isCreated) {
      dispatch(getFetchMessages({ currentChat }));
    }
    return () => {
      setIsCreated(false);
      dispatch(profileActions.setClearNewUser());
    };
  }, [currentChat, isCreated]);

  return (
    <VStack className={styles.chat} align="center">
      <VStack justify="start" gap={12} className={styles.messages}>
        <VStack gap={18}>
          {messages.map((m) => (
            <Message
              ref={scrollRef}
              key={m._id}
              message={m}
              src={m.sender.avatar}
              type={m.sender._id === auth._id ? 'own' : 'friend'}
            />
          ))}
        </VStack>
      </VStack>
      <VStack justify="end">
        <Form className={styles.form} onSubmit={handleSubmit}>
          <HStack className={styles.input} align="end">
            <input
              placeholder={'Write something...'}
              value={newMessage}
              required
              style={{
                border: '1px solid lightgray'
              }}
              onChange={handleChange}
            />
            <button className={styles.btn}>
              <Icon type="Send" />
            </button>
          </HStack>
        </Form>
      </VStack>
    </VStack>
  );
};
