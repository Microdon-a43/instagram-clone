import React, { type FC } from 'react';
import styles from './Skeleton.module.scss';
import { classNames } from '@/shared/lib/classNames';
import { type CSSProperties } from '@ant-design/cssinjs/lib/hooks/useStyleRegister';

interface SkeletonProps {
  className?: string;
  width?: number | string;
  height?: number | string;
  radius?: number | string;
}

export const Skeleton: FC<SkeletonProps> = ({
  className = '',
  width,
  height,
  radius
}) => {
  const myStyles: CSSProperties = {
    width,
    height,
    borderRadius: radius
  };
  return (
    // @ts-expect-error
    <div className={classNames(styles.skeleton, {}, [className])} style={myStyles}
    />
  );
};
