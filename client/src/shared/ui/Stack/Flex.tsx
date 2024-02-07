import { type ReactNode, type FC, type MouseEventHandler } from 'react';
import styles from './Flex.module.scss';
import { classNames, type Mods } from '@/shared/lib/classNames';

type DirectionType = 'row' | 'column';
type JustifyType = 'center' | 'end' | 'start' | 'between';
type AlignType = 'center' | 'end' | 'start';
type WrapType = 'wrap' | 'nowrap';
type GapType = 0 | 4 | 6 | 8 | 12 | 16 | 18 | 22 | 26 | 28 | 32 | 36 | 40;

export interface FlexProps {
  children: ReactNode;
  direction: DirectionType;
  justify?: JustifyType;
  align?: AlignType;
  gap?: GapType;
  wrap?: WrapType;
  max?: boolean;
  className?: string;
  onClick?: () => void;
  onMouseEnter?: MouseEventHandler;
  onMouseLeave?: MouseEventHandler;
}

const Flex: FC<FlexProps> = (props) => {
  const {
    children,
    direction,
    align = 'start',
    gap = 0,
    justify = 'start',
    max = true,
    wrap = 'nowrap',
    className = '',
    onClick,
    onMouseEnter,
    onMouseLeave
  } = props;

  const directionClasses: Record<DirectionType, string> = {
    row: styles.row,
    column: styles.column
  };

  const justifyClasses: Record<JustifyType, string> = {
    center: styles.center,
    end: styles.end,
    start: styles.start,
    between: styles.between
  };

  const alignClasses: Record<AlignType, string> = {
    center: styles.alignCenter,
    end: styles.alignEnd,
    start: styles.alignStart
  };
  const wrapClasses: Record<WrapType, string> = {
    wrap: styles.wrap,
    nowrap: styles.nowrap
  };

  const gapClasses: Record<GapType, string> = {
    0: styles.gap0,
    4: styles.gap4,
    6: styles.gap6,
    8: styles.gap8,
    12: styles.gap12,
    16: styles.gap16,
    18: styles.gap18,
    22: styles.gap22,
    26: styles.gap26,
    28: styles.gap28,
    32: styles.gap32,
    36: styles.gap36,
    40: styles.gap40
  };

  const mods: Mods = {
    [styles.max]: max
  };

  const classes = [
    direction && directionClasses[direction],
    align && alignClasses[align],
    justify && justifyClasses[justify],
    gap && gapClasses[gap],
    wrap && wrapClasses[wrap],
    className
  ];

  return (
    <div
      className={classNames(styles.flex, mods, classes)}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {children}
    </div>
  );
};

export default Flex;
