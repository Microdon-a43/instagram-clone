import { classNames, type Mods } from '@/shared/lib/classNames';
import {
  forwardRef,
  type FC,
  type InputHTMLAttributes,
  type ReactNode
} from 'react';
import styles from './Input.module.scss';

interface InputProps
  extends InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  className?: string;
  error?: string;
  value: string;
  textarea?: boolean;
  children?: ReactNode;
}

export const Input: FC<InputProps> = forwardRef((props, ref: any) => {
  const {
    className = '',
    error,
    value = '',
    placeholder,
    textarea = false,
    ...rest
  } = props;

  const mods: Mods = {
    [styles.active]: value,
    [styles.errorField]: error,
    [styles.textareaActive]: textarea
  };

  return (
    <div className={classNames(styles.field, mods, [className])}>
      <div className={styles.label}>
        {textarea ? (
          <textarea ref={ref} defaultValue={value} {...rest} />
        ) : (
          <input ref={ref} defaultValue={value} {...rest} />
        )}

        {placeholder && (
          <span className={styles.placeholder}>{placeholder}</span>
        )}
      </div>
      {error && (
        <span className={classNames(styles.error, mods, [])}>{error}</span>
      )}
    </div>
  );
});
