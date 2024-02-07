import { classNames } from '@/shared/lib/classNames';
import { type FC } from 'react';
import styles from './Avatar.module.scss';

export type AvatarSize = 22 | 32 | 56 | 150;
type AvatarVariant = 'default' | 'stories';

const sizeClasses: Record<AvatarSize, string> = {
  22: styles.size22,
  32: styles.size32,
  56: styles.size56,
  150: styles.size150
};

const variantClasses: Record<AvatarVariant, string> = {
  default: styles.default,
  stories: styles.stories
};

export interface AvatarProps {
  size?: AvatarSize;
  variant?: AvatarVariant;
  className?: string;
  src?: string;
}

export const Avatar: FC<AvatarProps> = (props) => {
  const { size = 32, className, variant = 'default', src } = props;

  const classes = [
    size && sizeClasses[size],
    variant && variantClasses[variant],
    className
  ];

  return (
    <div className={classNames(styles.avatar, {}, classes)}>
      {src ? (
        <img src={src} alt="" />
      ) : (
        <div className={styles.noImage}>In</div>
      )}
    </div>
  );
};
