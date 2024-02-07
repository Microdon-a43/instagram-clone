import { Text } from '@/shared/ui';
import { type MenuProps } from 'antd';

export const commentFunc = (hasRights: boolean) => {
  const defaultItems: MenuProps['items'] = [
    {
      label: <Text color="error">Пожаловаться</Text>,
      key: 0
    },
    {
      label: <Text>Отмена</Text>,
      key: 1
    }
  ];
  const fullItems: MenuProps['items'] = [
    hasRights && {
      label: <Text>Изменить</Text>,
      key: 2
    },
    {
      label: <Text>Удалить</Text>,
      key: 3
    },
    ...defaultItems
  ];

  return fullItems;
};
