import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useAuth } from '../../../hooks/useAuth';
import { Button } from '../../components/Form/Elements/Button/Button';
import { Field } from '../../components/Form/Elements/Field/Field';
import { IRegister } from '../../components/Form/form.interface';
import { nameValid } from '../../components/Form/validate';
import cn from 'classnames';
import styles from './EditPage.module.scss';
import { useActions } from '../../../hooks/useAction';
import Lottie from 'lottie-react';
import Loader from '../../../assets/animation/form-loader.json';
import ConfirmationModal from '../../components/ConfirmationModal/ConfirmationModal';
import { useTranslation } from 'react-i18next';

export const EditPage = () => {
  const { user, isLoading } = useAuth();
  const { updateUser } = useActions();
  const [bgDelete, setBgDelete] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const { t } = useTranslation();

  const {
    register,
    formState: { errors },
    handleSubmit,
    getValues,
  } = useForm<IRegister>({
    defaultValues: {
      login: user ? user.login : '',
      name: user ? user.name : '',
    },
  });

  const onSubmit: SubmitHandler<IRegister> = (data) => {
    user && updateUser({ ...data, id: user.id });
  };

  return (
    <>
      {isLoading && (
        <Lottie
          className={cn(styles.loader, { [styles.active]: isLoading })}
          animationData={Loader}
        />
      )}
      {user && (
        <div
          className={cn(styles.background, {
            [styles.bgExit]: bgDelete,
          })}
        >
          <div className={styles.container}>
            <div className={styles.profile}>
              <Button
                className={styles.deleteUser}
                onMouseEnter={() => setBgDelete(true)}
                onMouseOut={() => setBgDelete(false)}
                onClick={() => setOpenModal(true)}
              >
                {t('editPage.delete')}
              </Button>
              <div className={styles.avatar}></div>
              <div className={styles.data}>
                <h3 className={styles.name}>
                  <span>{t('editPage.name')}</span>
                  <p>{user.name}</p>
                </h3>
                <h3 className={styles.name}>
                  <span>{t('editPage.login')}</span>
                  <p>{user.login}</p>
                </h3>
              </div>
            </div>
            <h3 className={styles.id}>
              <span>{t('editPage.id')}</span>
              {user.id}
            </h3>
          </div>
          <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
            <fieldset className={styles.fieldset}>
              <legend className={styles.legend}>{t('editPage.update')}</legend>
              <Field
                {...register('name', {
                  required: t('editPage.form.name.required') as string,
                  pattern: {
                    value: nameValid,
                    message: t('editPage.form.name.valid'),
                  },
                })}
                icon={'BsEmojiSmile'}
                getValue={{ fn: getValues, name: 'name' }}
                placeholder={t('editPage.form.name.placeholder')}
                active={!!user.name}
                error={errors.name}
              />
              <Field
                {...register('login', {
                  required: t('editPage.form.login.required') as string,
                  pattern: {
                    value: nameValid,
                    message: t('editPage.form.login.valid'),
                  },
                })}
                icon={'BsPersonFill'}
                getValue={{ fn: getValues, name: 'login' }}
                placeholder={t('editPage.form.login.placeholder')}
                active={!!user.login}
                error={errors.login}
              />
              <Field
                {...register('password', {
                  required: t('editPage.form.password.required') as string,
                  minLength: {
                    value: 6,
                    message: t('editPage.form.password.valid'),
                  },
                })}
                icon={'BsKeyFill'}
                getValue={{ fn: getValues, name: 'password' }}
                type="password"
                placeholder={t('editPage.form.password.placeholder')}
                error={errors.password}
                autoComplete="off"
              />
            </fieldset>
            <Button className={styles.updateBtn}>{t('editPage.form.update')}</Button>
          </form>
          <ConfirmationModal
            id={user.id}
            open={openModal}
            setOpen={setOpenModal}
            title={t('confirmationModal.account')}
          />
        </div>
      )}
    </>
  );
};
