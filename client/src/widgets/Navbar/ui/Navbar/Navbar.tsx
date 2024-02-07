import { ThemeContext } from '@/app/provider';
import Logo from '@/shared/assets/Logo.png';
import { Theme } from '@/shared/consts/theme';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { NavMenu, NavSearch } from '../index';
import styles from './Navbar.module.scss';

export const Navbar = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <div className={styles.navbar}>
      <div className="container">
        <div className={styles.wrapper}>
          <Link to='/'>
            <img
              className={theme === Theme.DARK && styles.dark}
              src={Logo}
              alt=""
            />
          </Link>

          <NavSearch />
          <NavMenu />
        </div>
      </div>
    </div>
  );
};
