import { classNames } from '@/shared/lib/classNames';
import { type FC } from 'react';
import styles from './Spinner.module.scss';

type SpinnerSizes = 'small' | 'middle' | 'large';
type SpinnerOptions = 'primary' | 'default' | 'gray' | 'white';

interface SpinnerProps {
  className?: string;
  size?: SpinnerSizes;
  option?: SpinnerOptions;
}

export const Spinner: FC<SpinnerProps> = (props) => {
  const { className = '', size = 'large', option = 'primary' } = props;

  const sizeClasses: Record<SpinnerSizes, string> = {
    small: styles.small,
    middle: styles.middle,
    large: styles.large
  };

  const optionClasses: Record<SpinnerOptions, string> = {
    primary: styles.primary,
    default: styles.default,
    gray: styles.gray,
    white: styles.white
  };

  const classes = [
    size && sizeClasses[size],
    option && optionClasses[option],
    className
  ];

  return (
    <div>
      <div className={classNames(styles.ldsRing, {}, classes)}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};
