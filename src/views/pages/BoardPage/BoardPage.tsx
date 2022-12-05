import { NavLink } from 'react-router-dom';
import AddButton from '../../components/AddButton/AddButton';
import arrow from '../../../assets/icons/icon-arrow-right.svg';
import Column from '../../components/Column/Column';
import styles from './BoardPage.module.scss';
import {
  useCreateColumnMutation,
  useGetColumnsQuery,
  useUpdateColumnMutation,
} from '../../../services/Column.service';
import { useGetBoardsQuery } from '../../../services/Board.service';
import { useAppSelector, useRootState } from '../../../store/store';
import Lottie from 'lottie-react';
import Loader from '../../../assets/animation/page-loader.json';
import cn from 'classnames';
import { FormColumn } from '../../components/FormColumn/FormColumn';
import { useFormColumn } from '../../components/FormColumn/useFormColumn';
import { useEffect, useState } from 'react';
import { IColumn, IColumnReq } from '../../../types/column.type';
import { toastr } from 'react-redux-toastr';
import { DragDropContext, DropResult, Droppable } from 'react-beautiful-dnd';
import {
  useCreateTaskMutation,
  useDeleteTaskMutation,
  useUpdateTaskMutation,
} from '../../../services/Task.service';
import { ITask } from '../../../types/tasks.type';
import LoaderPlane from '../../../assets/animation/paperplane.json';
import { useActions } from '../../../hooks/useAction';
import { useTranslation } from 'react-i18next';

function BoardPage() {
  const boardId = useAppSelector((state) => state.root.boardId);
  const userId = useAppSelector((state) => state.auth.user.id);
  const isLightTheme = useAppSelector((state) => state.root.isLightTheme);
  const { t } = useTranslation();
  const [newData, setNewData] = useState<IColumn[] | undefined>([]);

  const [loading, setLoading] = useState(false);

  const { data, isLoading } = useGetColumnsQuery({ boardId });
  const { data: boardData } = useGetBoardsQuery();
  const { activeModal, column, closeModal, callCreate } = useFormColumn();

  const [create, { isSuccess, data: dataItem, isLoading: isLoadingCreate }] =
    useCreateColumnMutation();

  const [update, { isLoading: isLoadingUpdate }] = useUpdateColumnMutation();
  const [updateTask, { isLoading: isLoadingTaskUpdate }] = useUpdateTaskMutation();
  const [createTask, { isLoading: isLoadingTaskCreate }] = useCreateTaskMutation();
  const [deleteTask, { isLoading: isLoadingTaskDelete }] = useDeleteTaskMutation();

  const state = useRootState();
  const dataSort = newData && [...newData];
  const { setData } = useActions();

  useEffect(() => {
    if (isSuccess) {
      toastr.success(
        t('toastr.success'),
        `${t('toastr.boardPage.create')} ${dataItem ? dataItem.title : ''}!`
      );
      closeModal();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataItem, isSuccess]);

  useEffect(() => {
    if (isLoading) setLoading(true);
    else setLoading(false);
  }, [isLoading, data]);

  useEffect(() => {
    if (
      isLoadingCreate ||
      isLoadingUpdate ||
      isLoadingTaskUpdate ||
      isLoadingTaskCreate ||
      isLoadingTaskDelete
    )
      setLoading(true);
    if (
      !isLoadingCreate &&
      !isLoadingUpdate &&
      !isLoadingTaskUpdate &&
      !isLoadingTaskCreate &&
      !isLoadingTaskDelete
    )
      setLoading(false);
  }, [
    isLoadingCreate,
    isLoadingUpdate,
    isLoadingTaskUpdate,
    isLoadingTaskDelete,
    isLoadingTaskCreate,
  ]);

  useEffect(() => {
    if (data) {
      setData(data);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  useEffect(() => {
    setNewData(data ? [...data] : undefined);
  }, [data]);

  const handleCreateColumn = (data: IColumnReq) => {
    create({ column: { title: data.title }, boardId });
  };

  const dragEndHandler = async (result: DropResult) => {
    const { destination, source, draggableId, type } = result;

    if (!destination) {
      return;
    }
    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return;
    }

    if (type === 'column' && data) {
      const columnToChange = data.find((columnData) => columnData.id === draggableId);
      if (newData && columnToChange) {
        const arr = newData.filter((columnData) => columnData.id !== draggableId);

        arr.sort((a, b) => a.order - b.order);
        const filterData = arr.filter((el) => el.id !== draggableId);
        filterData.splice(destination.index, 0, {
          ...columnToChange,
          order: destination.index + 1,
        });

        const sortData = filterData.map((el, i) => {
          if (el.id !== draggableId) return { ...el, order: i + 1 };
          else return el;
        });
        setNewData(sortData);
      }
      columnToChange &&
        update({
          column: { order: destination.index + 1, title: columnToChange.title },
          boardId,
          columnsId: draggableId,
        });
      return;
    }

    const start = data?.find((column) => column.id === source.droppableId);
    const finish = data?.find((column) => column.id === destination.droppableId);

    if (start === finish && start) {
      const column = state.initialData.columns[start.id as keyof typeof state.initialData.columns];
      if (column && newData) {
        const newTaskOrder: Record<string, string>[] = Array.from(
          column.order as Record<string, string>[]
        );
        newTaskOrder.sort((a, b) => +a.order - +b.order);
        const actualTask = newTaskOrder[source.index];
        updateTask({
          taskId: actualTask.id,
          task: {
            boardId,
            order: destination.index + 1,
            columnId: start.id,
            title: actualTask.title,
            description: actualTask.description,
            userId,
          },
        });
        return;
      }
    } else {
      if (start && finish) {
        const startColumn =
          state.initialData.columns[start.id as keyof typeof state.initialData.columns];
        const finishColumn =
          state.initialData.columns[finish.id as keyof typeof state.initialData.columns];
        if (startColumn && finishColumn) {
          const startTaskOrder = Array.from(startColumn.order as Record<string, string>[]);
          startTaskOrder.sort((a, b) => +a.order - +b.order);
          const actualTask = { ...startTaskOrder[source.index] };
          const finishTaskOrder = Array.from(finishColumn.order as Record<string, string>[]);
          finishTaskOrder.sort((a, b) => +a.order - +b.order);

          deleteTask({
            boardId,
            columnsId: start.id,
            taskId: actualTask.id,
          });
          const createdTask = await createTask({
            boardId,
            columnsId: finish.id,
            task: {
              title: actualTask.title,
              description: actualTask.description,
              userId,
            },
          });
          actualTask.id = (createdTask as { data: ITask }).data.id;
          if (actualTask.id) {
            updateTask({
              taskId: actualTask.id,
              task: {
                boardId,
                order: destination.index + 1,
                columnId: finish.id,
                title: actualTask.title,
                description: actualTask.description,
                userId,
              },
            });
          }
        }
      }
    }
  };

  return (
    <div className={`${styles.boardPage} ${isLightTheme ? styles.lightTheme : styles.darkTheme}`}>
      <div className={styles.wrapper}>
        {isLoading ? (
          <Lottie
            className={cn(styles.loader, { [styles.active]: isLoading })}
            animationData={Loader}
          />
        ) : (
          <>
            {!activeModal && loading && (
              <Lottie className={cn(styles.loaderPlane)} animationData={LoaderPlane} />
            )}
            {activeModal && (
              <FormColumn
                handleColumn={handleCreateColumn}
                column={column}
                activeModal={activeModal}
                close={closeModal}
                loading={loading}
              />
            )}
            <div className={styles.topPanel}>
              <NavLink to="/main" className={styles.button}>
                <img src={arrow} alt="arrow" className={styles.arrow} />
                {t('boardPage.back')}
              </NavLink>
              <h3 style={{ color: isLightTheme ? '#000' : '#fff' }}>
                {boardData?.find((board) => board.id === boardId)?.title || ''}
              </h3>
            </div>
            <div className={styles.boardContainer}>
              <DragDropContext onDragEnd={dragEndHandler}>
                <Droppable droppableId="all" direction="horizontal" type="column">
                  {(provided) => (
                    <div
                      className={styles.board}
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                    >
                      {dataSort &&
                        dataSort
                          .sort((a, b) => a.order - b.order)
                          .map((column, index) => {
                            return (
                              <Column
                                key={column.id}
                                id={column.id}
                                title={column.title}
                                index={index}
                                order={column.order}
                              />
                            );
                          })}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
                <div>
                  <AddButton title="column" callCreate={callCreate} />
                </div>
              </DragDropContext>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
export default BoardPage;
