/* eslint-disable react/jsx-key */
import {
  getSearchLoading,
  getSearchUsers,
  profileActions,
  searchUsers
} from '@/entities/Profile';
import { useAppDispatch } from '@/shared/hooks/useAppDispatch';
import { HStack, Icon, Text, UserCard, VStack } from '@/shared/ui';
import { Spin } from 'antd';
import { debounce } from 'lodash-es';
import { useCallback, useMemo, useState, type ChangeEvent } from 'react';
import { useSelector } from 'react-redux';
import styles from './NavSearch.module.scss';

const NavSearch = () => {
  const [search, setSearch] = useState<string>('');
  const dispatch = useAppDispatch();
  const users = useSelector(getSearchUsers);
  const searchLoading = useSelector(getSearchLoading);

  const onSearchUsers = useMemo(
    () =>
      debounce(async (query) => {
        dispatch(searchUsers({ search: query }));
      }, 700),
    []
  );

  const onChangeSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;
    setSearch(value);
    onSearchUsers(value);
  };

  const onClearSearch = useCallback(() => {
    setSearch('');
    dispatch(profileActions.setSearchUsers());
  }, []);

  return (
    <div className={styles.search}>
      <input type="text" onChange={onChangeSearch} value={search} />
      {!search ? (
        <div className={styles.text}>
          <Icon type="Search" />
          <Text as="span">Search</Text>
        </div>
      ) : (
        <span className={styles.close} onClick={onClearSearch}>
          &times;
        </span>
      )}

      {search && (
        <HStack className={styles.list} align="center" justify="center">
          {users.length > 0 && !searchLoading ? (
            <VStack>
              {users.map((user) => (
                <UserCard
                  key={user._id}
                  onClick={onClearSearch}
                  title={user.fullname}
                  content={`@${user.username}`}
                  id={user._id}
                />
              ))}
            </VStack>
          ) : search && !searchLoading ? (
            <Text> Пользователи не найдены </Text>
          ) : (
            searchLoading && <Spin size="small" />
          )}
        </HStack>
      )}
    </div>
  );
};

export default NavSearch;
