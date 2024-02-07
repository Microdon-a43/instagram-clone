import { classNames } from '@/shared/lib/classNames';
import { memo, type FC, type ReactNode } from 'react';
import styles from './Text.module.scss';

export type AsType = 'h1' | 'h2' | 'h3' | 'span' | 'p';
export type TextSize = 10 | 12 | 14 | 16 | 18 | 24;
export type TextFw = 300 | 400 | 500 | 600 | 700 | 800 | 900;
export type TextAlign = 'left' | 'center' | 'right';
export type TextColor = 'default' | 'gray' | 'blue' | 'error' | 'title';

interface TextProps {
  children: ReactNode;
  as?: AsType;
  size?: TextSize;
  fw?: TextFw;
  align?: TextAlign;
  className?: string;
  color?: TextColor;
  onClick?: () => void;
}

const sizeClasses: Record<TextSize, string> = {
  10: styles.size10,
  12: styles.size12,
  14: styles.size14,
  16: styles.size16,
  18: styles.size18,
  24: styles.size24
};
const fwClasses: Record<TextFw, string> = {
  300: styles.fw300,
  400: styles.fw400,
  500: styles.fw500,
  600: styles.fw600,
  700: styles.fw700,
  800: styles.fw800,
  900: styles.fw900
};
const alignClasses: Record<TextAlign, string> = {
  left: styles.left,
  center: styles.center,
  right: styles.right
};

const colorClasses: Record<TextColor, string> = {
  default: styles.default,
  gray: styles.gray,
  blue: styles.blue,
  error: styles.error,
  title: styles.title
};

export const Text: FC<TextProps> = memo((props) => {
  const {
    children,
    as = 'h2',
    size = 14,
    fw = 300,
    className = '',
    align,
    color = 'gray',
    onClick
  } = props;

  const classes = [
    size && sizeClasses[size],
    fw && fwClasses[fw],
    align && alignClasses[align],
    color && colorClasses[color],
    className
  ];

  const getAs = {
    h1: (
      <h1 className={classNames(styles.text, {}, classes)} onClick={onClick}>
        {children}
      </h1>
    ),
    h2: (
      <h2 className={classNames(styles.text, {}, classes)} onClick={onClick}>
        {children}
      </h2>
    ),
    h3: (
      <h3 className={classNames(styles.text, {}, classes)} onClick={onClick}>
        {children}
      </h3>
    ),
    span: (
      <span className={classNames(styles.text, {}, classes)} onClick={onClick}>
        {children}
      </span>
    ),
    p: (
      <p className={classNames(styles.text, {}, classes)} onClick={onClick}>
        {children}
      </p>
    )
  };

  return getAs[as];
});
