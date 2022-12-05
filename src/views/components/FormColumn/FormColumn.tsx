import React from 'react';
import styles from '../FormBoard/FormBoard.module.scss';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Field } from '../Form/Elements/Field/Field';
import { columnValid } from '../Form/validate';
import { Modal } from '@mui/material';
import cn from 'classnames';
import { Button } from '../Form/Elements/Button/Button';
import Lottie from 'lottie-react';
import Loader from '../../../assets/animation/loader.json';
import { IColumnReq } from '../../../types/column.type';
import { useTranslation } from 'react-i18next';

export interface IFormColumn {
  title: string;
  order: number;
  id: string;
}

interface IPropsFormColumn {
  activeModal: boolean;
  close: () => void;
  handleColumn: (data: IColumnReq) => void;
  column?: IFormColumn;
  loading: boolean;
}

export const FormColumn = ({
  activeModal,
  close,
  handleColumn,
  column,
  loading,
}: IPropsFormColumn) => {
  const {
    register,
    getValues,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<IFormColumn>({
    mode: 'onChange',
    defaultValues: {
      title: column?.title ? column.title : '',
    },
  });

  const { t } = useTranslation();

  const onSubmit: SubmitHandler<IFormColumn> = (data) => {
    handleColumn(data);
  };

  return (
    <Modal onClose={close} open={activeModal} className={styles.background}>
      <>
        {loading && <Lottie className={cn(styles.loader)} animationData={Loader} />}
        <form onSubmit={handleSubmit(onSubmit)} className={cn(styles.form)}>
          <h2 className={styles.title}>
            {column
              ? `${t('editPage.form.formColumn.update')} ${column.title}`
              : t('editPage.form.formColumn.create')}
          </h2>
          <Field
            {...register('title', {
              required: t('editPage.form.title.required') as string,
              pattern: {
                value: columnValid,
                message: t('editPage.form.title.valid'),
              },
            })}
            getValueColumn={{ fn: getValues, name: 'title' }}
            icon={'BsFileEarmarkWordFill'}
            error={errors.title}
            active={!!column}
            placeholder={t('editPage.form.title.placeholder')}
          />
          <div className={styles.btnContainer}>
            <Button disabled={!isValid} className={cn(styles.btn, styles.create)}>
              {column ? t('editPage.form.button.update') : t('editPage.form.button.create')}
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
