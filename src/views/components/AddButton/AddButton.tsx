import { useTranslation } from 'react-i18next';
import styles from './AddButton.module.scss';

function AddButton(props: { title: string; callCreate: () => void }) {
  const { t } = useTranslation();
  return (
    <button className={styles.button} onClick={props.callCreate} data-title={props.title}>
      + {t('addButton.add')} {props.title}
    </button>
  );
}

export default AddButton;
