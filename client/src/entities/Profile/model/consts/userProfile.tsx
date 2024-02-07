import { Text } from '@/shared/ui';
import { type MenuProps } from 'antd';

export const userProfile = (isAuth: boolean) => {
  const profileDotsItems: MenuProps['items'] = [
    {
      label: <Text>Поделиться</Text>,
      key: 0
    }
  ];

  const newItems: MenuProps['items'] = [
    ...profileDotsItems,
    isAuth && { label: <Text>Настройки</Text>, key: 1 }
  ];

  return newItems;
};
