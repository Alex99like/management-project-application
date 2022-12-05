import styles from './Board.module.scss';
import deleteImg from '../../../assets/icons/delete.svg';
import dotsImg from '../../../assets/icons/dots.svg';
import { useNavigate } from 'react-router-dom';
import ConfirmationModal from '../ConfirmationModal/ConfirmationModal';
import { useState } from 'react';
import { IFormBoard } from '../FormBoard/FormBoard';
import { useActions } from '../../../hooks/useAction';
import { useTranslation } from 'react-i18next';

interface IBoardProps {
  board: {
    id: string;
    title: string;
    description: string;
  };
  update: (data: IFormBoard) => void;
}

function Board({ board: { title, description, id }, update }: IBoardProps) {
  const [openModal, setOpenModal] = useState(false);
  const { t } = useTranslation();

  const navigate = useNavigate();
  const { setBoardId } = useActions();

  function handleClick(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    const target = e.target as HTMLDivElement;
    if (target.classList.contains(styles.deleteImg)) {
      setOpenModal(true);
    } else if (target.tagName !== 'IMG') {
      setBoardId(id);
      navigate('/board');
    }
  }

  return (
    <>
      <div className={styles.board} onClick={(e) => handleClick(e)}>
        <div className={styles.container}>
          <p className={styles.title}>{title}</p>
          <div>
            <img
              className={styles.image}
              src={dotsImg}
              alt="edit"
              onClick={() => update({ title, description, id })}
            />
            <img className={styles.deleteImg} src={deleteImg} alt="delete" />
          </div>
        </div>
        <p className={styles.description}>{description}</p>
      </div>
      <ConfirmationModal
        id={id}
        open={openModal}
        setOpen={setOpenModal}
        title={t('confirmationModal.board') as string}
      />
    </>
  );
}

export default Board;
