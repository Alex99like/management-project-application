import { useState } from 'react';
import { IFormColumn } from './FormColumn';

export const useFormColumn = () => {
  const [activeModal, setActiveModal] = useState(false);
  const [column, setColumn] = useState<IFormColumn>();

  const closeModal = () => {
    setActiveModal(false);
  };

  const callCreate = () => {
    setColumn(undefined);
    setActiveModal(true);
  };

  return { activeModal, closeModal, callCreate, column };
};
