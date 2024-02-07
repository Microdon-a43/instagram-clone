import { getAuthData } from '@/entities/User';
import { Avatar, HStack, Text } from '@/shared/ui';
import React, { type FC, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { type IConversation } from '../../model/types/conversation';
import styles from './ConversationCard.module.scss';

interface ConversationCardProps {
  conv: IConversation;
}

export const ConversationCard: FC<ConversationCardProps> = ({ conv }) => {
  const auth = useSelector(getAuthData);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const friend = conv.members.find((m) => m._id !== auth?._id);
    setUser(friend);
  }, [conv, auth]);

  return (
    <HStack className={styles.conversation}>
      <HStack align="center" gap={12}>
        <Avatar size={56} src={user?.avatar} />
        <Text>{user?.fullname}</Text>
      </HStack>
    </HStack>
  );
};
