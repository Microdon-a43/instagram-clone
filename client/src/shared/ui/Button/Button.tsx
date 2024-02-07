import { classNames, type Mods } from '@/shared/lib/classNames';
import { type ButtonHTMLAttributes, type FC, type ReactNode } from 'react';
import { Spinner } from '../Spinner/Spinner';
import styles from './Button.module.scss';

type ButtonVariant = 'default' | 'outline';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  addOnLeft?: JSX.Element;
  addOnRight?: JSX.Element;
  variant?: ButtonVariant;
  children: ReactNode;
  max?: boolean;
  border?: boolean;
}

export const Button: FC<ButtonProps> = (props) => {
  const {
    disabled,
    className,
    loading,
    children,
    variant = 'default',
    addOnLeft,
    addOnRight,
    max = false,
    border = false
  } = props;

  const variantClasses: Record<ButtonVariant, string> = {
    default: styles.default,
    outline: styles.outline
  };

  const classes = [variant && variantClasses[variant], className];

  const mods: Mods = {
    [styles.disabled]: disabled,
    [styles.max]: max,
    [styles.noBorders]: border
  };

  return (
    <button
      disabled={disabled}
      className={classNames(styles.btn, mods, classes)}
    >
      {addOnLeft}
      {loading ? (
        <Spinner size="small" option="white" className={styles.loading} />
      ) : (
        children
      )}
      {addOnRight}
    </button>
  );
};

// ${styles.btn} ${variantClasses[variant]}
