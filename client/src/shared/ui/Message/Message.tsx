import { type IMessage } from '@/entities/Conversation';
import { classNames } from '@/shared/lib/classNames';
import moment from 'moment';
import { forwardRef } from 'react';
import { Avatar, type AvatarSize } from '../Avatar/Avatar';
import { HStack } from '../Stack/HStack';
import { VStack } from '../Stack/VStack';
import { Text } from '../Text/Text';
import styles from './Message.module.scss';

export type MessageTypes = 'own' | 'friend';
export type Ref = HTMLDivElement;

interface MessageProps {
  type?: MessageTypes;
  className?: string;
  src?: string;
  size?: AvatarSize;
  message: IMessage;
}

const typeClasses: Record<MessageTypes, string> = {
  own: styles.own,
  friend: styles.friend
};

export const Message = forwardRef<Ref, MessageProps>((props, ref) => {
  const { type = 'own', className = '', src, size, message } = props;
  const createdDate = moment(message.createdAt).fromNow();

  const classes = [type && typeClasses[type], className];

  return (
    <VStack className={classNames(styles.message, {}, classes)} gap={6}>
      <HStack
        className={styles.top}
        gap={12}
        align="center"
        justify={type === 'own' ? 'end' : 'start'}
      >
        <Avatar src={src && src} size={size} />
        <Text as="p" className={styles.text}>
          {message.text}
        </Text>
      </HStack>
      <HStack
        className={styles.bottom}
        justify={type === 'own' ? 'end' : 'start'}
      >
        <Text as="span" size={12}>
          {createdDate}
        </Text>
        <div ref={ref}></div>
      </HStack>
    </VStack>
  );
});
