import { classNames } from '@/shared/lib/classNames';
import { memo, type FC, type ReactNode } from 'react';
import { AppLink } from '../AppLink/AppLink';
import { Avatar, type AvatarSize } from '../Avatar/Avatar';
import { HStack } from '../Stack/HStack';
import { VStack } from '../Stack/VStack';
import { Text } from '../Text/Text';
import styles from './UserCard.module.scss';

interface UserCardProps {
  className?: string;
  id: string;
  src?: string;
  title: string;
  content: string;
  size?: AvatarSize;
  onClick?: () => void;
  children?: ReactNode;
}

const sizeClasses: Record<AvatarSize, string> = {
  22: styles.size22,
  32: styles.size32,
  56: styles.size56,
  150: styles.size150
};

export const UserCard: FC<UserCardProps> = memo((props) => {
  const {
    src,
    className = '',
    id,
    title,
    content,
    size,
    onClick,
    children
  } = props;
  return (
    <HStack align="center">
      <HStack
        onClick={onClick}
        className={classNames(styles.userCard, {}, [
          className,
          sizeClasses[size]
        ])}
        gap={16}
        align="center"
      >
        <Avatar src={src && src} size={size} />
        <VStack gap={0} max>
          <Text color="default" as="h2" fw={700}>
            <AppLink to={`/profile/${id}`}>
              <Text color='title'>{title}</Text>
            </AppLink>
          </Text>
          {content && <Text as="span">{content}</Text>}
        </VStack>
      </HStack>
      {children}
    </HStack>
  );
});
