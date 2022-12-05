import styles from './Button.module.scss';
import arrow from '../../../assets/icons/icon-arrow-right.svg';
import { NavLink } from 'react-router-dom';

function Button(props: { title: string; link: string }) {
  const { title, link } = props;

  return (
    <NavLink to={link} className={styles.button}>
      {title}
      <img src={arrow} alt="arrow" className={styles.arrow} />
    </NavLink>
  );
}

export default Button;
