import { ThemeContext } from '@/app/provider';
import {
  conversationActions,
  ConversationCard,
  getConvData,
  getFetchConversations,
  type IConversation
} from '@/entities/Conversation/index';
import { Theme } from '@/shared/consts/theme';
import { useAppDispatch } from '@/shared/hooks/useAppDispatch';
import { HStack, Icon, Text, VStack } from '@/shared/ui';
import { useContext, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { FindRecipientModal } from '@/features';
import styles from './ConversationList.module.scss';
import { getAuthData } from '@/entities/User';
import { classNames } from '@/shared/lib/classNames';

export const ConversationList = () => {
  const { theme } = useContext(ThemeContext);
  const conversations = useSelector(getConvData);
  const auth = useSelector(getAuthData);
  const dispatch = useAppDispatch();
  const [isOpenFindWindow, setIsOpenFindWindow] = useState(false);

  const onChangeChat = (currentChat: IConversation): void => {
    dispatch(conversationActions.setCurrentChat(currentChat));
  };

  const onCloseModal = () => {
    setIsOpenFindWindow(false);
  };

  useEffect(() => {
    dispatch(getFetchConversations());
  }, []);

  useEffect(() => {
    dispatch(conversationActions.setClearCurrentChat());
  }, [isOpenFindWindow]);

  return (
    <VStack className={styles.conversationsList}>
      <HStack
        className={styles.profile}
        justify="center"
        align="center"
        gap={40}
      >
        <HStack align="center" gap={8} className={styles.author}>
          <Text as="h2" size={14} fw={600} color="default">
            {auth?.username}
          </Text>
          <Icon type="Arrow" className={theme === Theme.DARK && styles.dark} />
        </HStack>
        <Icon
          type="NewMessages"
          className={theme === Theme.DARK && styles.dark}
          onClick={() => {
            setIsOpenFindWindow(true);
          }}
        />
      </HStack>
      {isOpenFindWindow && (
        <FindRecipientModal isOpen={isOpenFindWindow} onClose={onCloseModal} />
      )}
      <VStack className={styles.talk}>
        {conversations.map((conv) => (
          <div
            key={conv._id}
            className={classNames(styles.talkList, {}, [])}
            onClick={() => {
              onChangeChat(conv);
            }}
          >
            <ConversationCard conv={conv} />
          </div>
        ))}
      </VStack>
    </VStack>
  );
};
