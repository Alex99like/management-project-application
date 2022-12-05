import { Menu, MenuItem } from '@mui/material';
import styles from './Header.module.scss';
import down from '../../../assets/icons/down.svg';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import i18n from '../../../utils/i18next';
import { useActions } from '../../../hooks/useAction';
import { useAppSelector } from '../../../store/store';

function SwitchLanguage() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [animate, setAnimate] = useState<boolean>(false);
  const isLightTheme = useAppSelector((state) => state.root.isLightTheme);
  const open = Boolean(anchorEl);
  const { t } = useTranslation();
  const { changeLang } = useActions();

  function handleOpen(event: React.MouseEvent<HTMLDivElement>) {
    setAnimate(true);
    setAnchorEl(event.currentTarget);
  }

  function handleClose(key: string) {
    setAnimate(false);
    setAnchorEl(null);
    if (typeof key === 'string') {
      changeLang(key);
      i18n.changeLanguage(key);
    }
  }

  return (
    <div>
      <div className={styles.select} onClick={handleOpen}>
        <span>{t('header.language.lang')}</span>
        <img
          src={down}
          alt="down"
          className={`${styles.down} ${!isLightTheme && styles.downDark} ${
            animate && styles.downRotate
          }`}
        />
      </div>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose} autoFocus={false}>
        <MenuItem
          onClick={() => handleClose('en')}
          sx={[
            {
              '&:hover': {
                backgroundColor: '#81bcf8',
              },
            },
          ]}
        >
          {t('header.language.en')}
        </MenuItem>
        <MenuItem
          onClick={() => handleClose('ru')}
          sx={[
            {
              '&:hover': {
                backgroundColor: '#81bcf8',
              },
            },
          ]}
        >
          {t('header.language.ru')}
        </MenuItem>
      </Menu>
    </div>
  );
}

export default SwitchLanguage;
