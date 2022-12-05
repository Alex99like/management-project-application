import { forwardRef, useState } from 'react';
import { IField } from '../elements.props';
import cn from 'classnames';

import styles from './Field.module.scss';
import { MaterialIconAI, MaterialIconBS } from '../../../../../utils/MaterialIcon';

export const Field = forwardRef<HTMLInputElement, IField>(
  (
    {
      placeholder,
      error,
      type = 'text',
      style,
      icon,
      getValue,
      active,
      getValueBoard,
      getValueColumn,
      getValueTask,
      ...rest
    },
    ref
  ) => {
    const [onFocus, setOnFocus] = useState(active || false);

    const handlerFocus = () => {
      if (getValue) {
        if (getValue.fn(getValue.name).trim().length === 0) setOnFocus(false);
        else setOnFocus(true);
      }
      if (getValueBoard) {
        if (getValueBoard.fn(getValueBoard.name).trim().length === 0) setOnFocus(false);
        else setOnFocus(true);
      }
      if (getValueColumn) {
        if ((getValueColumn.fn(getValueColumn.name) as string).trim().length === 0)
          setOnFocus(false);
        else setOnFocus(true);
      }
      if (getValueTask) {
        if (getValueTask.fn(getValueTask.name).trim().length === 0) setOnFocus(false);
        else setOnFocus(true);
      }
    };

    return (
      <div className={styles.container} style={style}>
        <label className={styles.label} onFocus={() => setOnFocus(true)} onBlur={handlerFocus}>
          <span
            className={cn(styles.placeholder, {
              [styles.focus]: onFocus,
            })}
          >
            {placeholder}
          </span>
          <MaterialIconBS name={icon} />
          <input className={styles.input} ref={ref} type={type} {...rest} />
        </label>
        {error && (
          <div className={styles.error}>
            <MaterialIconAI name="AiOutlineWarning" /> {error.message}
          </div>
        )}
      </div>
    );
  }
);

Field.displayName = 'Field';
