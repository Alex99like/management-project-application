import { useTranslation } from 'react-i18next';
import styles from './ErrorElement.module.scss';

export const ErrorElement = () => {
  const { t } = useTranslation();

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{t('errorBoundary.title')}</h1>
      <div className={styles.containerChoice}>
        <div className={styles.btnContainer}>
          <p className={styles.description}>{t('errorBoundary.tryAgain')}</p>
          <button className={styles.btn} onClick={() => window.location.reload()}>
            {t('errorBoundary.back')}
          </button>
        </div>
        <h2 className={styles.or}>{t('errorBoundary.or')}</h2>
        <div className={styles.btnContainer}>
          <p className={styles.description}>{t('errorBoundary.mainPage')}</p>
          <button className={styles.btn} onClick={() => location.replace('/')}>
            {t('errorBoundary.welcome')}
          </button>
        </div>
      </div>
    </div>
  );
};
