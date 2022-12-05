import { useState } from 'react';
import { IUpdateTask } from '../../../types/tasks.type';

export const useFormTask = () => {
  const [activeModal, setActiveModal] = useState(false);
  const [type, setType] = useState<'create' | 'update'>('create');
  const [task, setTask] = useState<IUpdateTask>();

  const closeModal = () => {
    setActiveModal(false);
  };

  const callCreate = () => {
    setTask(undefined);
    setType('create');
    setActiveModal(true);
  };

  const callUpdate = (data: IUpdateTask) => {
    setTask(data);
    setType('update');
    setActiveModal(true);
  };

  return { activeModal, closeModal, callCreate, callUpdate, task, type };
};
