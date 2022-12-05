import { ITasks } from './../types/tasks.type';
import { ITask, ITaskReq } from '../types/tasks.type';
import { api } from './Api.service';

export const tasksApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getTasks: builder.query<ITasks, { boardId: string; columnsId: string }>({
      query: ({ boardId, columnsId }) => `boards/${boardId}/columns/${columnsId}`,
      providesTags: () => [{ type: 'Tasks' }],
    }),
    createTask: builder.mutation<ITask, { task: ITaskReq; boardId: string; columnsId: string }>({
      query: ({ boardId, columnsId, task }) => ({
        url: `boards/${boardId}/columns/${columnsId}/tasks`,
        method: 'POST',
        body: task,
      }),
      invalidatesTags: () => [{ type: 'Tasks' }],
    }),
    updateTask: builder.mutation<ITask, { task: Omit<ITask, 'id'>; taskId: string }>({
      query: ({ taskId, task }) => ({
        url: `boards/${task.boardId}/columns/${task.columnId}/tasks/${taskId}`,
        method: 'PUT',
        body: task,
      }),
      invalidatesTags: () => [{ type: 'Tasks' }],
    }),
    deleteTask: builder.mutation<void, { boardId: string; columnsId: string; taskId: string }>({
      query: ({ taskId, boardId, columnsId }) => ({
        url: `boards/${boardId}/columns/${columnsId}/tasks/${taskId}`,
        method: 'DELETE',
      }),
      invalidatesTags: () => [{ type: 'Tasks' }],
    }),
  }),
});

export const {
  useGetTasksQuery,
  useCreateTaskMutation,
  useUpdateTaskMutation,
  useDeleteTaskMutation,
} = tasksApi;
