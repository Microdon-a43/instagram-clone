import { type FC, type ReactNode } from 'react';
import styles from './Modal.module.scss';
import { classNames } from '@/shared/lib/classNames';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  className?: string;
  children: ReactNode;
}

export const Modal: FC<ModalProps> = (props) => {
  const { isOpen, className, onClose, children } = props;
  return (
    <div
      className={classNames(styles.modal, { [styles.modalActive]: isOpen }, [
        className
      ])}
    >
      <div className={styles.box}>
        <span className={styles.close} onClick={onClose}>
          &times;
        </span>
        <div className={styles.content}>{children}</div>
      </div>
    </div>
  );
};
