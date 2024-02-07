import { type FC, type ReactNode } from 'react';
import { NavLink, type LinkProps } from 'react-router-dom';
import styles from './AppLink.module.scss';
import { classNames } from '@/shared/lib/classNames';

type AppLinkProps = {
  children: ReactNode;
  className?: string;
} & LinkProps;

export const AppLink: FC<AppLinkProps> = (props) => {
  const { to, children, className = '', ...rest } = props;

  return (
    <NavLink
      to={to}
      className={classNames(styles.appLink, {}, [className])}
      {...rest}
    >
      {children}
    </NavLink>
  );
};
