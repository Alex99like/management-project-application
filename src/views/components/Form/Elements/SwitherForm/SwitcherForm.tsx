import React, { Dispatch, SetStateAction } from 'react';
import { Button } from '../Button/Button';
import styles from './SwitcherForm.module.scss';
import cn from 'classnames';

interface ISwither {
  setSwitcher: Dispatch<SetStateAction<'register' | 'login'>>;
  switcher: 'register' | 'login';
  onDisabled: boolean;
  onLogin: () => void;
  onRegister: () => void;
}

export const SwitcherForm = ({ switcher, onDisabled, onLogin, onRegister }: ISwither) => {
  return (
    <div className={styles.container}>
      <Button
        disabled={onDisabled}
        type="button"
        onClick={onLogin}
        className={cn(styles.btn, {
          [styles.active]: switcher === 'login',
        })}
      >
        Log In
      </Button>
      <Button
        disabled={onDisabled}
        type="button"
        onClick={onRegister}
        className={cn(styles.btn, {
          [styles.active]: switcher === 'register',
        })}
      >
        Sign Up
      </Button>
    </div>
  );
};
