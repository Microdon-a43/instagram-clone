import { classNames } from '@/shared/lib/classNames';
import { type FC } from 'react';
import styles from './Icon.module.scss';
import { iconName, type IconType } from './IconName';

type IconSizes = 24 | 32;

interface IconProps {
  type: IconType;
  className?: string;
  size?: IconSizes;
  onClick?: (value: any) => void;
}

export const Icon: FC<IconProps> = ({
  type,
  className = '',
  size,
  onClick
}) => {
  const sizeCLasses: Record<IconSizes, string> = {
    24: styles.size24,
    32: styles.size32
  };

  const classes = [size && sizeCLasses[size], className];

  return (
    <div className={classNames(styles.icon, {}, classes)} onClick={onClick}>{iconName[type]}</div>
  );
};
