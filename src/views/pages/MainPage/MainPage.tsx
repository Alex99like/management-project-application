import { useEffect, useState } from 'react';
import { toastr } from 'react-redux-toastr';
import {
  useCreateBoardMutation,
  useGetBoardsQuery,
  useUpdateBoardMutation,
} from '../../../services/Board.service';
import { IBoardReq } from '../../../types/board.type';
import { MaterialIconBS } from '../../../utils/MaterialIcon';
import Board from '../../components/Board/Board';
import { FormBoard } from '../../components/FormBoard/FormBoard';
import styles from './MainPage.module.scss';
import Lottie from 'lottie-react';
import Loader from '../../../assets/animation/page-loader.json';
import cn from 'classnames';
import { useFormBoard } from '../../components/FormBoard/useFormBoard';
import { useAppSelector } from '../../../store/store';
import { useListenError } from '../../../utils/useListenError';
import { useTranslation } from 'react-i18next';

function MainPage() {
  const isLightTheme = useAppSelector((state) => state.root.isLightTheme);
  const { data, isLoading, error } = useGetBoardsQuery();
  const [create, { isSuccess, data: dataItem, isLoading: isLoadingCreate, error: errorCreate }] =
    useCreateBoardMutation();
  const [
    update,
    {
      isSuccess: isSuccessUpdate,
      data: dataItemUpdate,
      isLoading: isLoadingUpdate,
      error: errorUpdate,
    },
  ] = useUpdateBoardMutation();

  useListenError([error, errorCreate, errorUpdate]);
  const { activeModal, closeModal, callCreate, callUpdate, board, type } = useFormBoard();

  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    if (isLoadingCreate || isLoadingUpdate) setLoading(true);
    if (!isLoadingCreate && !isLoadingUpdate) setLoading(false);
  }, [isLoadingCreate, isLoadingUpdate]);

  useEffect(() => {
    if (isSuccess) {
      toastr.success(
        t('toastr.success'),
        `${t('toastr.mainPage.create')} ${dataItem ? dataItem.title : ''}!`
      );
      closeModal();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataItem, isSuccess]);

  useEffect(() => {
    if (isSuccessUpdate) {
      toastr.success(
        t('toastr.success'),
        `${t('toastr.mainPage.update')}  ${dataItemUpdate ? dataItemUpdate.title : ''}!`
      );
      closeModal();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataItemUpdate, isSuccessUpdate]);

  const handleCreateBoard = (data: IBoardReq) => {
    if (type === 'create') create(data);
    if (type === 'update' && board) update({ board: data, boardId: board.id });
  };

  return (
    <>
      {isLoading && (
        <Lottie
          className={cn(styles.loader, { [styles.active]: isLoading })}
          animationData={Loader}
        />
      )}
      {activeModal && (
        <FormBoard
          handleBoard={handleCreateBoard}
          board={board}
          activeModal={activeModal}
          close={closeModal}
          loading={loading}
        />
      )}
      <div
        className={`${styles.wrapper} ${isLightTheme ? styles.lightWrapper : styles.darkWrapper}`}
      >
        <div className={styles.main}>
          {!isLoading && (
            <h3 style={{ color: isLightTheme ? '#000' : '#fff' }}>{t('mainPage.title')}</h3>
          )}
          <div className={styles.boards}>
            {!isLoading && (
              <button className={styles.newBoard} onClick={callCreate}>
                <div className={styles.dashed}>
                  <span className={styles.add}>
                    <MaterialIconBS name={'BsPlusLg'} />
                  </span>
                  <p className={styles.title}>{t('mainPage.newBoard')}</p>
                </div>
              </button>
            )}
            {data &&
              data.map((board) => {
                return <Board key={board.id} board={board} update={callUpdate} />;
              })}
          </div>
        </div>
      </div>
    </>
  );
}

export default MainPage;
