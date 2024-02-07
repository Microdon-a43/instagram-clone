import styles from './LangSwitcher.module.scss';
import { useTranslation } from 'react-i18next';

export const LangSwitcher = () => {
  const { i18n } = useTranslation<any>();

  const toggleLang = () => {
    i18n.changeLanguage(i18n.language === 'ru' ? 'en' : 'ru');
  };
  return (
    <div
      onClick={toggleLang}
      style={{ width: '20px', textAlign: 'center' }}
      className={styles.lang}
    >
      {i18n.language}
    </div>
  );
};
