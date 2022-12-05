import styles from './Footer.module.scss';
import rsImg from '../../../assets/icons/rs.svg';
import { useAppSelector } from '../../../store/store';

function Footer() {
  const isLightTheme = useAppSelector((state) => state.root.isLightTheme);

  return (
    <footer className={`${styles.footer} ${isLightTheme ? styles.footerLight : styles.footerDark}`}>
      <p className={styles.year}>2022</p>
      <div className={styles.links}>
        <a
          className={styles.link}
          href="https://github.com/Alex99like"
          target="_blank"
          rel="noreferrer"
        >
          alex99like
        </a>
        <a
          className={styles.link}
          href="https://github.com/muannna"
          target="_blank"
          rel="noreferrer"
        >
          muannna
        </a>
        <a
          className={styles.link}
          href="https://github.com/sleepyMaryAlex"
          target="_blank"
          rel="noreferrer"
        >
          sleepyMaryAlex
        </a>
      </div>
      <a href="https://rs.school/react/" target="_blank" rel="noreferrer">
        <img src={rsImg} alt="link" className={styles.rsLink} />
      </a>
    </footer>
  );
}

export default Footer;
