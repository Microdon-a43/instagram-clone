import { AppLink, HStack, Text, UserCard, VStack } from '@/shared/ui';
import { Button } from 'antd';
import { type FC } from 'react';
import { useTranslation } from 'react-i18next';
import { type HomeUserProps } from '../../model/types/home';
import styles from '../HomePage/HomePage.module.scss';

export const HomeSuggestions: FC<HomeUserProps> = ({ user }) => {
  const { t } = useTranslation('homePage');
  return (
    <VStack className={styles.suggestions} gap={16}>
      <HStack justify="between" align="center">
        <Text as="h1">{t('Рекомендации для Вас')}</Text>
        <AppLink to="/">
          <Text color="default" fw={700}>
            {t('Смотреть все')}
          </Text>
        </AppLink>
      </HStack>
      <VStack gap={12}>
        {[1, 2, 3, 4, 5].map((_, i) => (
          <HStack>
            <UserCard
              key={i}
              size={32}
              id={user?._id}
              title={user?.fullname}
              src={user?.avatar}
              content={user?.username}
            />
            <Button>Switch</Button>
          </HStack>
        ))}
      </VStack>
    </VStack>
  );
};
