import { getUserLoading } from '@/entities/User';
import { Spinner } from '@/shared/ui';
import { useSelector } from 'react-redux';
import styles from './PageLoader.module.scss';

export const PageLoader = () => {
  const loading = useSelector(getUserLoading);

  if (loading) {
    return (
      <div className={styles.pageLoader}>
        <Spinner size="large" />
      </div>
    );
  }
  return null;
};
