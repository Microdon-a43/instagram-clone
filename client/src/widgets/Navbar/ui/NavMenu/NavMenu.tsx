/* eslint-disable multiline-ternary */
import { ThemeContext } from '@/app/provider';
import { SwitchButton } from '@/features';
import { Theme } from '@/shared/consts/theme';
import { classNames } from '@/shared/lib/classNames';
import { AppLink, Avatar, DropDown, Icon, Text } from '@/shared/ui';
import { useCallback, useContext } from 'react';
import { type INavMenuItem } from '../../model/consts/navMenu';
import { Link } from 'react-router-dom';
import styles from './NavMenu.module.scss';
import { LangSwitcher } from '@/widgets/LangSwitcher/ui/LangSwitcher';
import type { MenuProps } from 'antd';
import { useSelector } from 'react-redux';
import { getAuthData, logout } from '@/entities/User';
import { useAppDispatch } from '@/shared/hooks/useAppDispatch';
import {
  AddPostModal,
  addPostModalActions,
  getAddPostModalOpen
} from '@/features/AddPostModal';

const NavMenu = () => {
  const { theme } = useContext(ThemeContext);
  const user = useSelector(getAuthData);
  const dispatch = useAppDispatch();
  const addPostIsOpen = useSelector(getAddPostModalOpen);

  const onCloseAddPostModal = useCallback(() => {
    dispatch(addPostModalActions.setIsAddPostModal(false));
  }, [addPostIsOpen, dispatch]);

  const navMenuItems: INavMenuItem[] = [
    {
      href: '/',
      type: 'Home'
    },
    {
      href: '/conversation',
      type: 'Messenger'
    },
    {
      type: 'AddPostIcon',
      onClick: () => dispatch(addPostModalActions.setIsAddPostModal(true))
    },
    {
      href: '/',
      type: 'FindIcon'
    },
    {
      href: '/favourite',
      type: 'LikeIcon'
    }
  ];

  const dropdownItems: MenuProps['items'] = [
    {
      label: <Text color="blue">{user.fullname}</Text>,
      key: '0'
    },
    {
      label: (
        <AppLink to={`/profile/${user._id}`}>
          <Text color="default">Профиль</Text>
        </AppLink>
      ),
      key: '1'
    },
    {
      label: (
        <AppLink to="/">
          <Text color="default">Настройки</Text>
        </AppLink>
      ),
      key: '2'
    },
    {
      label: <Text color="default">Выйти</Text>,
      onClick: async () => await dispatch(logout()),
      key: '3'
    }
  ];

  return (
    <nav className={styles.nav}>
      <ul className={styles.list}>
        {navMenuItems.map((item) => (
          <li
            key={item.type}
            className={classNames(
              styles.item,
              { [styles.dark]: theme === Theme.DARK },
              []
            )}
          >
            {item.href ? (
              <Link to={item.href} className={styles.link}>
                <Icon type={item.type} />
              </Link>
            ) : (
              <Icon type={item.type} onClick={item.onClick} />
            )}
          </li>
        ))}

        <AddPostModal isOpen={addPostIsOpen} onClose={onCloseAddPostModal} />

        <li
          className={classNames(
            '',
            { [styles.dark]: theme === Theme.DARK },
            []
          )}
        >
          <SwitchButton />
        </li>

        <li>
          <LangSwitcher />
        </li>

        <li>
          <DropDown items={dropdownItems} placement="bottomRight">
            <Avatar
              src={
                user
                  ? user.avatar
                  : 'https://cdn.icon-icons.com/icons2/2468/PNG/512/user_icon_149329.png'
              }
              size={22}
              variant="stories"
            />
          </DropDown>
        </li>
      </ul>
    </nav>
  );
};

export default NavMenu;
