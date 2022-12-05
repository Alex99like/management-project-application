import styles from './WelcomePage.module.scss';
import arrow from '../../../assets/icons/icon-arrow-right.svg';
import { useTranslation } from 'react-i18next';

function Card(props: { img: string; title: string; description: string; link: string }) {
  const { img, title, description, link } = props;
  const { t } = useTranslation();

  return (
    <div className={styles.card}>
      <img src={img} alt="image" className={styles.cardImage} />
      <h4>{title}</h4>
      <p>{description}</p>
      <a href={link} className={styles.link} target="_blank" rel="noreferrer">
        {t('welcomePage.learnMore')}
        <img src={arrow} alt="arrow" />
      </a>
    </div>
  );
}

export default Card;
