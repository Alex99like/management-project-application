import { NavLink } from 'react-router-dom';
import AddButton from '../../components/AddButton/AddButton';
import arrow from '../../../assets/icons/icon-arrow-right.svg';
import Column from '../../components/Column/Column';
import styles from './BoardPage.module.scss';
import { useCreateColumnMutation, useUpdateColumnMutation } from '../../../services/Column.service';
import { useGetBoardByIdQuery, useGetBoardsQuery } from '../../../services/Board.service';
import { useAppSelector } from '../../../store/store';
import Lottie from 'lottie-react';
import Loader from '../../../assets/animation/page-loader.json';
import cn from 'classnames';
import { FormColumn } from '../../components/FormColumn/FormColumn';
import { useFormColumn } from '../../components/FormColumn/useFormColumn';
import { useEffect, useState } from 'react';
import { IColumnReq } from '../../../types/column.type';
import { toastr } from 'react-redux-toastr';
import { DragDropContext, DropResult, Droppable } from 'react-beautiful-dnd';
import { useUpdateTaskMutation } from '../../../services/Task.service';
import LoaderPlane from '../../../assets/animation/paperplane.json';
import { useActions } from '../../../hooks/useAction';
import { useTranslation } from 'react-i18next';
import { TestColumns } from '../../../types/allTypes';

function BoardPage() {
  const boardId = useAppSelector((state) => state.root.boardId);
  const userId = useAppSelector((state) => state.auth.user.id);
  const isLightTheme = useAppSelector((state) => state.root.isLightTheme);
  const { t } = useTranslation();
  const [newData, setNewData] = useState<TestColumns[] | undefined>([]);

  const [loading] = useState(false);

  const [createLoading, setCreateLoading] = useState(false);

  const { data, isLoading } = useGetBoardByIdQuery(boardId);

  const { data: boardData } = useGetBoardsQuery();
  const { activeModal, column, closeModal, callCreate } = useFormColumn();

  const [create, { isSuccess, data: dataItem, isLoading: isCreateLoading }] =
    useCreateColumnMutation();

  const [update] = useUpdateColumnMutation();
  const [updateTask] = useUpdateTaskMutation();

  const { setData } = useActions();

  useEffect(() => {
    setCreateLoading(isCreateLoading);
  }, [isCreateLoading, isSuccess]);

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
    if (data) {
      setData(data.columns);
    }
  }, [data, setData]);

  useEffect(() => {
    data && setNewData(data.columns);
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

    if (type === 'column' && newData) {
      const newDataArr = [...newData].sort((a, b) => a.order - b.order);
      const columnToChange = newDataArr.find((columnData) => columnData.id === draggableId);
      const arr = newDataArr.filter((columnData) => columnData.id !== draggableId);

      arr.sort((a, b) => a.order - b.order);
      const filterData = arr.filter((el) => el.id !== draggableId);
      filterData.splice(destination.index, 0, {
        ...columnToChange!,
        order: destination.index + 1,
      });

      const sortData = filterData.map((el, i) => {
        if (el.id !== draggableId) return { ...el, order: i + 1 };
        else return el;
      });
      setNewData(sortData);

      await update({
        column: { order: destination.index + 1, title: columnToChange!.title },
        boardId: boardId!,
        columnsId: columnToChange!.id,
      });

      return;
    }

    const start = newData!.find((column) => column.id === source.droppableId);
    const finish = newData!.find((column) => column.id === destination.droppableId);

    if (start === finish && start) {
      const column = newData!.find((column) => column.id === start.id);
      if (column && newData) {
        const newTaskOrder = Array.from(column.tasks);
        newTaskOrder.sort((a, b) => a.order - b.order);
        const actualTask = newTaskOrder[source.index];

        const newTasksArray = newTaskOrder.filter((task) => task.id !== actualTask.id);
        newTasksArray.splice(destination.index, 0, actualTask);

        const newColumn = {
          id: start.id,
          title: start.title,
          order: start.order,
          tasks: newTasksArray.map((task, index) => {
            return { ...task, order: index + 1 };
          }),
        };

        const columnIndex = newData!.findIndex((column) => column.id === start.id);
        const finalColumns = [...newData];
        finalColumns.splice(columnIndex, 1, newColumn);

        setNewData(finalColumns);

        await updateTask({
          taskId: actualTask.id,
          boardId,
          columnId: start.id,
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
        const startColumn = newData!.find((column) => column.id === start.id);
        const finishColumn = newData!.find((column) => column.id === finish.id);

        if (startColumn && finishColumn) {
          const startTaskOrder = Array.from(startColumn.tasks);
          startTaskOrder.sort((a, b) => a.order - b.order);
          const actualTask = startTaskOrder[source.index];

          const finishTaskOrder = Array.from(finishColumn.tasks);
          finishTaskOrder.sort((a, b) => a.order - b.order);

          startTaskOrder.splice(source.index, 1);
          finishTaskOrder.splice(destination.index, 0, actualTask);

          const newStartColumn = {
            id: start.id,
            title: start.title,
            order: start.order,
            tasks: startTaskOrder.map((task, index) => {
              return { ...task, order: index + 1 };
            }),
          };

          const newFinishColumn = {
            id: finish.id,
            title: finish.title,
            order: finish.order,
            tasks: finishTaskOrder.map((task, index) => {
              return { ...task, order: index + 1 };
            }),
          };

          const startColumnIndex = newData!.findIndex((column) => column.id === startColumn.id);
          const finishColumnIndex = newData!.findIndex((column) => column.id === finishColumn.id);
          const finalColumns = [...newData!];
          finalColumns.splice(startColumnIndex, 1, newStartColumn);
          finalColumns.splice(finishColumnIndex, 1, newFinishColumn);

          setNewData(finalColumns);

          await updateTask({
            taskId: actualTask.id,
            boardId,
            columnId: source.droppableId,
            task: {
              boardId,
              order: destination.index + 1,
              columnId: destination.droppableId,
              title: actualTask.title,
              description: actualTask.description,
              userId,
            },
          });
        }
      }
    }
  };

  return (
    <div className={`${styles.boardPage} ${isLightTheme ? styles.lightTheme : styles.darkTheme}`}>
      <div className={styles.wrapper}>
        {}
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
                loading={createLoading}
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
                      {newData &&
                        [...newData]
                          .sort((a, b) => a.order - b.order)
                          .map((column, index) => {
                            return (
                              <Column
                                key={column.id}
                                id={column.id}
                                title={column.title}
                                index={index}
                                order={column.order}
                                data={column.tasks}
                                boardId={boardId}
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
