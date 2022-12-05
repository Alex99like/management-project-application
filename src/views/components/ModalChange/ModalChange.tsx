import React from 'react';
import { useRootState } from '../../../store/store';
import styles from './ModalChange.module.scss';

export const ModalChange = () => {
  const { lang } = useRootState();

  return (
    <div className={styles.container}>
      <div className={styles.modal}>
        <h3 className={styles.title}>
          {lang === 'ru'
            ? 'Пдождите пока идет обновление !!!'
            : 'Wait until the update is underway !!!'}
        </h3>
        <div className={styles.spanContainer}>
          <span className={styles.spanOne}></span>
          <span className={styles.spanTwo}></span>
          <span className={styles.spanTree}></span>
          <span className={styles.spanFour}></span>
          <span className={styles.spanFive}></span>
        </div>
      </div>
    </div>
  );
};
