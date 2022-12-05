import { Box, Modal } from '@mui/material';
import { Dispatch, SetStateAction, useEffect } from 'react';
import styles from './ConfirmationModal.module.scss';
import { useDeleteBoardMutation } from '../../../services/Board.service';
import Lottie from 'lottie-react';
import Loader from '../../../assets/animation/loader.json';
import { toastr } from 'react-redux-toastr';
import { useDeleteColumnMutation } from '../../../services/Column.service';
import { useAppSelector } from '../../../store/store';
import { useActions } from '../../../hooks/useAction';
import { useAuth } from '../../../hooks/useAuth';
import { useDeleteTaskMutation } from '../../../services/Task.service';
import { useTranslation } from 'react-i18next';
import i18n from '../../../utils/i18next';

function ConfirmationModal(props: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  title: string;
  id: string;
  columnsId?: string;
}) {
  const { open, setOpen, title, id, columnsId } = props;
  const boardId = useAppSelector((state) => state.root.boardId);
  const handleClose = () => setOpen(false);
  const { deleteUser, toggleRoutes, changeLang } = useActions();
  const { user } = useAuth();
  const { t } = useTranslation();

  const [deleteBoard, { isSuccess: isSuccessDelete, isLoading: isLoadingDelete }] =
    useDeleteBoardMutation();

  const [deleteColumn, { isSuccess: isSuccessColumnDelete, isLoading: isLoadingColumnDelete }] =
    useDeleteColumnMutation();

  const [deleteTask, { isSuccess: isSuccessTaskDelete, isLoading: isLoadingTaskDelete }] =
    useDeleteTaskMutation();

  useEffect(() => {
    if (isSuccessDelete || isSuccessColumnDelete || isSuccessTaskDelete) {
      toastr.success(t('toastr.success'), `${title} ${t('toastr.delete')}!`);
      handleClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccessDelete, isSuccessColumnDelete, isSuccessTaskDelete]);

  const handleDelete = () => {
    switch (title) {
      case 'Column':
        deleteColumn({ boardId, columnsId: id });
        break;
      case 'Колонка':
        deleteColumn({ boardId, columnsId: id });
        break;
      case 'All board data':
        deleteBoard({ boardId: id });
        break;
      case 'Вся доска':
        deleteBoard({ boardId: id });
        break;
      case 'Account':
        changeLang('en');
        i18n.changeLanguage('en');
        toggleRoutes(true);
        user && deleteUser({ id: user?.id });
        break;
      case 'Учетная запись':
        changeLang('en');
        i18n.changeLanguage('en');
        toggleRoutes(true);
        user && deleteUser({ id: user?.id });
        break;
      case 'Task':
        deleteTask({ boardId, columnsId: columnsId as string, taskId: id });
        break;
      case 'Задача':
        deleteTask({ boardId, columnsId: columnsId as string, taskId: id });
        break;
    }
  };

  return (
    <Modal
      className={styles.confirmationModal}
      open={open}
      onClose={handleClose}
      disableAutoFocus={true}
    >
      <>
        {(isLoadingDelete || isLoadingColumnDelete || isLoadingTaskDelete) && (
          <Lottie className={styles.loader} animationData={Loader} />
        )}
        <Box className={styles.box}>
          <h4>{t('confirmationModal.sure')}</h4>
          <p>
            {title}
            {t('confirmationModal.delete')}
          </p>
          <div className={styles.buttons}>
            <button className={styles.button} onClick={handleDelete}>
              {t('confirmationModal.ok')}
            </button>
            <button className={styles.button} onClick={handleClose}>
              {t('confirmationModal.cancel')}
            </button>
          </div>
        </Box>
      </>
    </Modal>
  );
}

export default ConfirmationModal;
