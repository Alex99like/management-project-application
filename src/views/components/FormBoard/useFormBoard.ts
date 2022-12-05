import { IFormBoard } from './FormBoard';
import { useState } from 'react';

export const useFormBoard = () => {
  const [activeModal, setActiveModal] = useState(false);
  const [type, setType] = useState<'create' | 'update'>('create');
  const [board, setBoard] = useState<IFormBoard>();

  const closeModal = () => {
    setActiveModal(false);
  };

  const callCreate = () => {
    setBoard(undefined);
    setType('create');
    setActiveModal(true);
  };

  const callUpdate = (data: IFormBoard) => {
    setBoard(data);
    setType('update');
    setActiveModal(true);
  };

  return { activeModal, closeModal, callCreate, callUpdate, board, type };
};
