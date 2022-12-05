import styles from '../FormBoard/FormBoard.module.scss';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Field } from '../Form/Elements/Field/Field';
import { taskValid } from '../Form/validate';
import { Modal } from '@mui/material';
import cn from 'classnames';
import { Button } from '../Form/Elements/Button/Button';
import Lottie from 'lottie-react';
import Loader from '../../../assets/animation/loader.json';
import { useTranslation } from 'react-i18next';

export interface IFormTask {
  title: string;
  description: string;
}

interface IPropsFormTask {
  activeModal: boolean;
  close: () => void;
  handleTask: (data: IFormTask) => void;
  task?: IFormTask;
  loading: boolean;
}

export const FormTask = ({ activeModal, close, handleTask, task, loading }: IPropsFormTask) => {
  const {
    register,
    getValues,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<IFormTask>({
    mode: 'onChange',
    defaultValues: {
      title: task?.title ? task.title : '',
      description: task?.description ? task.description : '',
    },
  });

  const { t } = useTranslation();

  const onSubmit: SubmitHandler<IFormTask> = (data) => {
    handleTask(data);
  };

  return (
    <Modal onClose={close} open={activeModal} className={styles.background}>
      <>
        {loading && <Lottie className={cn(styles.loader)} animationData={Loader} />}
        <form onSubmit={handleSubmit(onSubmit)} className={cn(styles.form)}>
          <h2 className={styles.title}>
            {task
              ? `${t('editPage.form.formTask.update')} ${task.title}`
              : t('editPage.form.formTask.create')}
          </h2>
          <Field
            {...register('title', {
              required: t('editPage.form.title.required') as string,
              pattern: {
                value: taskValid,
                message: t('editPage.form.title.valid'),
              },
            })}
            getValueTask={{ fn: getValues, name: 'title' }}
            icon={'BsFileEarmarkWordFill'}
            error={errors.title}
            active={!!task}
            placeholder={t('editPage.form.title.placeholder')}
          />
          <Field
            {...register('description', {
              required: t('editPage.form.description.required') as string,
              pattern: {
                value: taskValid,
                message: t('editPage.form.description.valid'),
              },
            })}
            getValueTask={{ fn: getValues, name: 'description' }}
            icon={'BsChatLeftTextFill'}
            error={errors.description}
            active={!!task}
            placeholder={t('editPage.form.description.placeholder')}
          />
          <div className={styles.btnContainer}>
            <Button disabled={!isValid} className={cn(styles.btn, styles.create)}>
              {task ? t('editPage.form.button.update') : t('editPage.form.button.create')}
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
