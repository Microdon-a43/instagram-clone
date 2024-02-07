import { ThemeContext } from '@/app/provider';
import {
  ConversationList,
  CurrentChatCard,
  getCurrentChat,
  NewChatCard
} from '@/entities/Conversation';
import { getUserNewChat } from '@/entities/Profile';
import { FindRecipientModal } from '@/features/FindRecipientModal/FindRecipientModal';
import { Theme } from '@/shared/consts/theme';
import { HStack, Icon, Text, VStack } from '@/shared/ui';
import { Button } from 'antd';
import { useContext, useState } from 'react';
import { useSelector } from 'react-redux';
import styles from './ConversationForm.module.scss';

export const ConversationForm = () => {
  const currentChat = useSelector(getCurrentChat);
  const newChatUser = useSelector(getUserNewChat);
  const { theme } = useContext(ThemeContext);
  const [isOpenFindWindow, setIsOpenFindWindow] = useState(false);

  const onCloseModal = () => {
    setIsOpenFindWindow(false);
  };

  return (
    <HStack className={styles.conversation}>
      <ConversationList />
      {currentChat ? (
        <CurrentChatCard />
      ) : newChatUser ? (
        <NewChatCard user={newChatUser} />
      ) : (
        <VStack
          className={styles.noConversation}
          align="center"
          justify="center"
          gap={12}
        >
          {isOpenFindWindow && (
            <FindRecipientModal
              isOpen={isOpenFindWindow}
              onClose={onCloseModal}
            />
          )}
          <div className={styles.iconBox}>
            <Icon
              type="SharePostsBig"
              className={theme === Theme.DARK && styles.dark}
            />
          </div>
          <Text as="h2">Your Messages</Text>
          <Text as="p">
            Send private photos and messages to a friend or group.
          </Text>
          <Button
            type="primary"
            className={styles.startBtn}
            onClick={() => {
              setIsOpenFindWindow(true);
            }}
          >
            Send Message
          </Button>
        </VStack>
      )}
    </HStack>
  );
};

// import { ThemeContext } from '@/app/provider';
// import {
//   Conversation,
//   conversationActions,
//   createMessage,
//   getConvData,
//   getCurrentChat,
//   getFetchConversations,
//   getFetchMessages,
//   getIsNewCovAdded,
//   getMessageData,
//   NewChatCard
// } from '@/entities/Conversation';

// import { getUserNewChat, profileActions } from '@/entities/Profile';
// import { getAuthData } from '@/entities/User';
// import { type IUser } from '@/entities/User/model/types/user';
// import { FindRecipientModal } from '@/features';
// import { Theme } from '@/shared/consts/theme';
// import { useAppDispatch } from '@/shared/hooks/useAppDispatch';
// import { Form, HStack, Icon, Message, Text, VStack } from '@/shared/ui';
// import { Button } from 'antd';
// import {
//   memo,
//   useCallback,
//   useContext,
//   useEffect,
//   useState,
//   type ChangeEvent
// } from 'react';
// import { useSelector } from 'react-redux';
// import { io } from 'socket.io-client';
// import styles from './ConversationForm.module.scss';

// export const socket = io('ws://localhost:5000');

// export const ConversationForm = () => {
//   const { theme } = useContext(ThemeContext);
//   const auth = useSelector(getAuthData);
//   const dispatch = useAppDispatch();
//   const conversations = useSelector(getConvData);
//   const [recipient, setRecipient] = useState(null);
//   const [isCreated, setIsCreated] = useState(false);
//   const messages = useSelector(getMessageData);
//   const currentChat = useSelector(getCurrentChat);
//   // const [currentChat, setCurrentChat] = useState(null);
//   const [newMessage, setNewMessage] = useState('');
//   const [arrivalMessage, setArrivalMessage] = useState(null);
//   const [isOpenFindWindow, setIsOpenFindWindow] = useState(false);
//   const newChatUser = useSelector(getUserNewChat);
//   const isNewConvAdded = useSelector(getIsNewCovAdded);

//   const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
//     setNewMessage(e.target.value);
//   };

//   const onChangeChatAndRecipient = (id: string, members: IUser[]) => {
//     // setCurrentChat(id);
//     dispatch(conversationActions.setCurrentChat({ id }));
//     const recipient = members.find((m) => m._id !== auth?._id);
//     setRecipient(recipient);
//   };

//   const handleSubmit = (e: ChangeEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     const message = {
//       sender: auth?._id,
//       recipient: recipient._id,
//       text: newMessage
//     };

//     socket.emit('sendMessage', {
//       sender: auth?._id,
//       recipient: recipient._id,
//       text: newMessage
//     });
//     dispatch(createMessage({ message }));
//     setIsCreated(true);
//     setNewMessage('');
//   };

//   const onCloseModal = () => {
//     setIsOpenFindWindow(false);
//   };

//   useEffect(() => {
//     if (isNewConvAdded) {
//       dispatch(getFetchConversations());
//     }
//   }, [isNewConvAdded]);

//   useEffect(() => {
//     dispatch(getFetchConversations());
//     socket.on('getMessage', (data) => {
//       setArrivalMessage(data);
//     });
//   }, []);

//   useEffect(() => {
//     socket.emit('addUser', auth?._id);
//   }, [auth]);
