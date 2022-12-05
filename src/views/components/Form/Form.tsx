import React, { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Button } from './Elements/Button/Button';
import { Field } from './Elements/Field/Field';
import { SwitcherForm } from './Elements/SwitherForm/SwitcherForm';
import { IRegister } from './form.interface';
import styles from './Form.module.scss';
import { nameValid } from './validate';
import cn from 'classnames';
import { useSwitcher } from './useSwitcher';
import { useAuth } from '../../../hooks/useAuth';
import { useActions } from '../../../hooks/useAction';
import { useNavigate } from 'react-router-dom';
import Lottie from 'lottie-react';
import Loader from '../../../assets/animation/form-loader.json';
import { useAppSelector } from '../../../store/store';

export const FormAuth = ({ path }: { path: 'login' | 'register' }) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    getValues,
  } = useForm<IRegister>();

  const [switcher, setSwitcher] = useState<'login' | 'register'>(path);
  const { switcherDown, switcherUp } = useSwitcher(switcher);
  const [active, setActive] = useState(false);
  const { isLoading, user } = useAuth();
  const isLightTheme = useAppSelector((state) => state.root.isLightTheme);

  const navigate = useNavigate();
  if (user) navigate('/');

  const onLogin = () => {
    navigate('/login');
    setSwitcher('login');
  };

  const onRegister = () => {
    navigate('/register');
    setSwitcher('register');
  };

  useEffect(() => {
    setSwitcher(path);
  }, [path]);

  const { login: loginAction, register: registerAction, toggleRoutes } = useActions();

  useEffect(() => {
    setActive(true);
  }, []);

  const onReset = () => {
    reset();
  };

  const onSubmit: SubmitHandler<IRegister> = (data) => {
    toggleRoutes(true);
    if (switcher === 'register') registerAction(data);
    else loginAction(data);
  };

  return (
    <div
      className={cn(styles.background, {
        [styles.active]: active,
        [styles.backgroundLight]: isLightTheme,
        [styles.backgroundDark]: !isLightTheme,
      })}
    >
      {isLoading && (
        <Lottie
          className={cn(styles.loader, { [styles.active]: isLoading })}
          animationData={Loader}
        />
      )}
      <form
        className={cn(styles.form, {
          [styles.switcherUp]: switcherUp,
          [styles.switcherDown]: switcherDown,
          [styles.active]: active,
        })}
        onSubmit={handleSubmit(onSubmit)}
        onClick={(e) => e.stopPropagation()}
      >
        {switcher === 'register' && (
          <Field
            {...register('name', {
              required: 'Name is required',
              pattern: {
                value: nameValid,
                message: 'Please enter a valid name',
              },
            })}
            icon={'BsEmojiSmile'}
            getValue={{ fn: getValues, name: 'name' }}
            placeholder="Name"
            active={!!getValues('name')}
            error={errors.name}
          />
        )}
        <Field
          {...register('login', {
            required: 'Login is required',
            pattern: {
              value: nameValid,
              message: 'Please enter a valid login',
            },
          })}
          icon={'BsPersonFill'}
          getValue={{ fn: getValues, name: 'login' }}
          placeholder="Login"
          active={!!getValues('login')}
          error={errors.login}
        />
        <Field
          {...register('password', {
            required: 'Password is required',
            minLength: {
              value: 6,
              message: 'Please enter a valid password',
            },
          })}
          icon={'BsKeyFill'}
          getValue={{ fn: getValues, name: 'password' }}
          type="password"
          autoComplete="off"
          placeholder="Password"
          active={!!getValues('password')}
          error={errors.password}
        />
        <div className={styles['container-btn']}>
          <Button disabled={isLoading} type={'submit'} className={styles.btn}>
            Submit
          </Button>
          <Button disabled={isLoading} onClick={onReset} type={'reset'} className={styles.btn}>
            Reset
          </Button>
        </div>
        <SwitcherForm
          onLogin={onLogin}
          onRegister={onRegister}
          onDisabled={isLoading}
          switcher={path}
          setSwitcher={setSwitcher}
        />
      </form>
    </div>
  );
};
