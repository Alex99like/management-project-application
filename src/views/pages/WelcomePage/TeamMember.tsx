import styles from './WelcomePage.module.scss';
import alexImg from '../../../assets/team/alex.jpg';
import annaImg from '../../../assets/team/anna.jpg';
import mariaImg from '../../../assets/team/maria.jpg';
import githubImg from '../../../assets/icons/github.svg';
import { useTranslation } from 'react-i18next';

function TeamMember(props: { name: string; index: number }) {
  const { name, index } = props;
  const { t } = useTranslation();
  const avatars = [alexImg, annaImg, mariaImg];
  const links = [
    'https://github.com/Alex99like',
    'https://github.com/muannna',
    'https://github.com/sleepyMaryAlex',
  ];

  return (
    <div className={styles.teamMember}>
      <img className={styles.avatar} src={avatars[index]} alt="avatar" />
      <div className={styles.info}>
        <div className={styles.heading}>
          <div className={styles.name}>
            <h4>{name}</h4>
            <a href={links[index]} target="_blank" rel="noreferrer">
              <img src={githubImg} alt="github" className={styles.github} />
            </a>
          </div>
          <p>{t<string, string[]>('welcomePage.statuses', { returnObjects: true })[index]}</p>
        </div>
        <p className={styles.quote}>
          <span>❝</span>
          {t<string, string[]>('welcomePage.quotes', { returnObjects: true })[index]}
          <span>❞</span>
        </p>
      </div>
    </div>
  );
}

export default TeamMember;
