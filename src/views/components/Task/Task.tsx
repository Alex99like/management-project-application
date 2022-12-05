import styles from './Task.module.scss';
import closeImg from '../../../assets/icons/close-button.svg';
import dotsImg from '../../../assets/icons/dots.svg';
import { useState } from 'react';
import ConfirmationModal from '../ConfirmationModal/ConfirmationModal';
import { Draggable } from 'react-beautiful-dnd';
import { ITask, IUpdateTask } from '../../../types/tasks.type';
import { useTranslation } from 'react-i18next';

interface IPropsTask {
  task: ITask;
  columnsId: string;
  index: number;
  callUpdate: (data: IUpdateTask) => void;
}

function Task({ task, columnsId, index, callUpdate }: IPropsTask) {
  const [openModal, setOpenModal] = useState(false);
  const { t } = useTranslation();

  return (
    <>
      <Draggable draggableId={task.id} index={index}>
        {(provided, snapshot) => (
          <div
            className={snapshot.isDragging ? styles.draggable : styles.task}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
          >
            <p>{task.title}</p>
            <img
              className={styles.image}
              src={dotsImg}
              alt="edit"
              onClick={() =>
                callUpdate({
                  title: task.title,
                  description: task.description,
                  taskId: task.id,
                  order: task.order,
                })
              }
            />
            <img
              className={styles.image}
              src={closeImg}
              alt="close"
              onClick={() => setOpenModal(true)}
            />
          </div>
        )}
      </Draggable>
      <ConfirmationModal
        id={task.id}
        open={openModal}
        setOpen={setOpenModal}
        title={t('confirmationModal.task')}
        columnsId={columnsId}
      />
    </>
  );
}

export default Task;
