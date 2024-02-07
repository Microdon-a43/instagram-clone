import { classNames } from '@/shared/lib/classNames';
import { type FC, type FormHTMLAttributes, type ReactNode } from 'react';
import styles from './Form.module.scss';

interface FormProps extends FormHTMLAttributes<HTMLFormElement> {
  children: ReactNode;
  className?: string;
}

export const Form: FC<FormProps> = ({ children, className = '', ...rest }) => {
  return (
    <form className={classNames(styles.form, {}, [className])} {...rest}>
      {children}
    </form>
  );
};
