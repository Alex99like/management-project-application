import React from 'react';
import styles from './FormBoard.module.scss';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Field } from '../Form/Elements/Field/Field';
import { boardValid } from '../Form/validate';
import { Modal } from '@mui/material';
import cn from 'classnames';
import { Button } from '../Form/Elements/Button/Button';
import { IBoardReq } from '../../../types/board.type';
import Lottie from 'lottie-react';
import Loader from '../../../assets/animation/loader.json';
import { useTranslation } from 'react-i18next';

export interface IFormBoard {
  title: string;
  description: string;
  id: string;
}

interface IPropsFormBoard {
  activeModal: boolean;
  close: () => void;
  handleBoard: (data: IBoardReq) => void;
  board?: IFormBoard;
  loading: boolean;
}

export const FormBoard = ({ activeModal, close, handleBoard, board, loading }: IPropsFormBoard) => {
  const {
    register,
    getValues,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<IFormBoard>({
    mode: 'onChange',
    defaultValues: {
      title: board?.title ? board.title : '',
      description: board?.description ? board.description : '',
    },
  });

  const { t } = useTranslation();

  const onSubmit: SubmitHandler<IFormBoard> = (data) => {
    handleBoard(data);
  };

  return (
    <Modal onClose={close} open={activeModal} className={styles.background}>
      <>
        {loading && <Lottie className={cn(styles.loader)} animationData={Loader} />}
        <form onSubmit={handleSubmit(onSubmit)} className={cn(styles.form)}>
          <h2 className={styles.title}>
            {board ? `${t('formBoard.update')} ${board.title}` : t('formBoard.create')}
          </h2>
          <Field
            {...register('title', {
              required: t('editPage.form.title.required') as string,
              pattern: {
                value: boardValid,
                message: t('editPage.form.title.valid'),
              },
            })}
            getValueBoard={{ fn: getValues, name: 'title' }}
            icon={'BsFileEarmarkWordFill'}
            error={errors.title}
            active={!!board}
            placeholder={t('editPage.form.title.placeholder')}
          />
          <Field
            {...register('description', {
              required: t('editPage.form.description.required') as string,
              pattern: {
                value: boardValid,
                message: t('editPage.form.description.valid'),
              },
            })}
            getValueBoard={{ fn: getValues, name: 'description' }}
            icon={'BsChatLeftTextFill'}
            error={errors.description}
            active={!!board}
            placeholder={t('editPage.form.description.placeholder')}
          />
          <div className={styles.btnContainer}>
            <Button disabled={!isValid} className={cn(styles.btn, styles.create)}>
              {board ? t('editPage.form.button.update') : t('editPage.form.button.create')}
            </Button>
            <Button type={'button'} onClick={close} className={cn(styles.btn, styles.cancel)}>
              {t('editPage.form.button.cancel')}
            </Button>
          </div>
        </form>
      </>
    </Modal>
  );
};
