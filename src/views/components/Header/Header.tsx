import { NavLink, useNavigate } from 'react-router-dom';
import styles from './Header.module.scss';
import logo from '../../../assets/icons/circle.svg';
import { useEffect, useRef, useState } from 'react';
import SwitchTheme from './SwitchTheme';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import DrawerLayout from './DrawerLayout';
import SwitchLanguage from './SwitchLanguage';
import Buttons from './Buttons';
import { useAuth } from '../../../hooks/useAuth';
import { useTranslation } from 'react-i18next';
import { useFormBoard } from '../FormBoard/useFormBoard';
import { FormBoard } from '../FormBoard/FormBoard';
import { IBoardReq } from '../../../types/board.type';
import { useCreateBoardMutation } from '../../../services/Board.service';
import { toastr } from 'react-redux-toastr';
import { useAppSelector } from '../../../store/store';

function Header() {
  const [animate, setAnimate] = useState<boolean>(false);
  const headerRef = useRef<HTMLElement | null>(null);
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const isLightTheme = useAppSelector((state) => state.root.isLightTheme);
  const { t } = useTranslation();
  const navigate = useNavigate();

  const { user } = useAuth();
  const { activeModal, closeModal, callCreate, board } = useFormBoard();

  const [create, { isSuccess, data: dataItem, isLoading: isLoadingCreate }] =
    useCreateBoardMutation();

  function handleScroll(elTopOffset: number) {
    window.pageYOffset > elTopOffset ? setAnimate(true) : setAnimate(false);
  }

  useEffect(() => {
    if (isSuccess) {
      toastr.success(
        t('toastr.success'),
        `${t('toastr.mainPage.create')} ${dataItem ? dataItem.title : ''} !`
      );
      closeModal();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataItem, isSuccess]);

  useEffect(() => {
    const header = (headerRef.current as HTMLElement).getBoundingClientRect();
    const handleScrollEvent = () => {
      handleScroll(header.top);
    };

    window.addEventListener('scroll', handleScrollEvent);

    return () => {
      window.removeEventListener('scroll', handleScrollEvent);
    };
  }, []);

  function handleCreateButton() {
    navigate('/main');
    callCreate();
  }

  return (
    <header
      className={`${styles.header} ${
        isLightTheme
          ? `${styles.headerLight} ${animate && styles.headerLightActive}`
          : `${styles.headerDark} ${animate && styles.headerDarkActive}`
      }`}
      ref={headerRef}
    >
      <NavLink to="/" className={styles.title} onClick={() => setMenuOpen(false)}>
        <img src={logo} alt="logo" className={styles.logo} />
        Taskero
      </NavLink>
      {user && (
        <nav>
          {activeModal && (
            <FormBoard
              handleBoard={(data: IBoardReq) => {
                create(data);
              }}
              board={board}
              activeModal={activeModal}
              close={closeModal}
              loading={isLoadingCreate}
            />
          )}
          <ul className={styles.navList}>
            <li onClick={handleCreateButton}>{t('header.board')}</li>
            <li onClick={() => navigate('/edit')}>{t('header.profile')}</li>
            <li>
              <SwitchLanguage />
            </li>
          </ul>
        </nav>
      )}
      <div className={styles.rightPanel}>
        <SwitchTheme />
        <MenuRoundedIcon className={styles.burger} onClick={() => setMenuOpen((prev) => !prev)} />
        <Buttons />
      </div>
      <DrawerLayout
        menuOpen={menuOpen}
        closeMenu={() => setMenuOpen(false)}
        handleCreateButton={handleCreateButton}
      />
    </header>
  );
}

export default Header;
