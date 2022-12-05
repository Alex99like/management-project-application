import { useTranslation } from 'react-i18next';
import { useAuth } from '../../../hooks/useAuth';
import Button from '../../components/Button/Button';
import styles from './NotFoundPage.module.scss';

function NotFoundPage() {
  const classNames: string[] = ['last', 'second', 'first', 'basic', 'first', 'second', 'last'];
  const error = 401;
  const { routes } = useAuth();
  const { t } = useTranslation();

  return (
    <div className={styles.notFound}>
      <div className={styles.error}>
        {classNames.map((className, index) => (
          <p className={styles[className]} key={error + index}>
            {error + index}
          </p>
        ))}
      </div>
      <p className={styles.title}>{t('notFoundPage.title')}</p>
      <Button
        title={
          routes === 'private' ? t('notFoundPage.routesWelcome') : t('notFoundPage.routesMain')
        }
        link={routes === 'private' ? '/' : '/main'}
      />
    </div>
  );
}

export default NotFoundPage;
