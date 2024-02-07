import { getConvData } from '@/entities/Conversation';
import {
  getSearchLoading,
  getSearchUsers,
  profileActions,
  searchUsers
} from '@/entities/Profile';
import { useAppDispatch } from '@/shared/hooks/useAppDispatch';
import { Form, HStack, Input, Text, UserCard, VStack } from '@/shared/ui';
import { Button, message, Modal, Spin } from 'antd';
import { debounce } from 'lodash-es';
import {
  useCallback,
  useMemo,
  useState,
  type ChangeEvent,
  type FC
} from 'react';
import { useSelector } from 'react-redux';
import styles from './FindRecipientModal.module.scss';

interface FindRecipientModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FindRecipientModal: FC<FindRecipientModalProps> = ({
  isOpen,
  onClose
}) => {
  const [response, setResponse] = useState<string>('');
  const dispatch = useAppDispatch();
  const conversations = useSelector(getConvData);
  const users = useSelector(getSearchUsers);
  const [user, setUser] = useState(null);
  const searchLoading = useSelector(getSearchLoading);

  const onSearchUsers = useMemo(
    () =>
      debounce(async (query) => {
        dispatch(searchUsers({ search: query }));
      }, 700),
    []
  );

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setResponse(e.target.value);
    onSearchUsers(e.target.value);
  };

  const onClearSearch = useCallback(() => {
    setResponse('');
    setUser(null);
    dispatch(profileActions.setSearchUsers());
  }, []);

  const onSubmit = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    const isConvConsistUser = conversations.some((c) =>
      c.members.find((u) => u._id === user?._id)
    );
    if (!isConvConsistUser) {
      dispatch(profileActions.getUserForChat(user?._id));
      setResponse('');
      setUser(null);
      onClose();
    } else {
      message.error('С данным пользователем уже начата беседа');
    }
  };

  return (
    <>
      <Modal
        title={
          <Text fw={700} size={18} color="default" align="center">
            Новое сообщение
          </Text>
        }
        open={isOpen}
        onCancel={onClose}
        footer={false}
        style={{
          position: 'relative'
        }}
        className={styles.modal}
        centered
      >
        <Form onSubmit={onSubmit}>
          <HStack className={styles.search} align="center">
            <Text as="span" color="default">
              Кому:
            </Text>

            {!user ? (
              <Input
                value={response}
                placeholder={response ? null : 'Поиск...'}
                onChange={handleChange}
              />
            ) : (
              <HStack justify="between" gap={6} className={styles.user}>
                <HStack className={styles.userInfo} align="center" gap={8}>
                  <div className={styles.username}>{user?.username}</div>
                  <span className={styles.close} onClick={onClearSearch}>
                    &times;
                  </span>
                </HStack>
              </HStack>
            )}
          </HStack>
          <VStack>
            <div className={styles.accounts}>
              {response && (
                <>
                  {users.length > 0 && !searchLoading ? (
                    <VStack gap={8} className={styles.userCards}>
                      {users.map((user) => (
                        <UserCard
                          key={user._id}
                          id={user._id}
                          src={user.avatar}
                          title={user.fullname}
                          content={`@${user.username}`}
                          onClick={() => {
                            setUser(user);
                          }}
                          className={styles.userCard}
                        />
                      ))}
                    </VStack>
                  ) : response && !searchLoading ? (
                    <div>Аккаунты не найдены.</div>
                  ) : (
                    searchLoading && <Spin size="small" />
                  )}
                </>
              )}
            </div>
            <Button
              type="primary"
              className={styles.btn}
              disabled={!user || searchLoading}
              htmlType="submit"
            >
              Чат
            </Button>
          </VStack>
        </Form>
      </Modal>
    </>
  );
};
