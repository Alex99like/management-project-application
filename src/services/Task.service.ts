import { ITasks } from './../types/tasks.type';
import { ITask, ITaskReq } from '../types/tasks.type';
import { api } from './Api.service';

export const tasksApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getTasks: builder.query<ITasks, { boardId: string; columnsId: string }>({
      query: ({ boardId, columnsId }) => `boards/${boardId}/columns/${columnsId}`,
      providesTags: () => [{ type: 'Boards' }],
    }),
    createTask: builder.mutation<ITask, { task: ITaskReq; boardId: string; columnsId: string }>({
      query: ({ boardId, columnsId, task }) => ({
        url: `boards/${boardId}/columns/${columnsId}/tasks`,
        method: 'POST',
        body: task,
      }),
      invalidatesTags: () => [{ type: 'Boards' }],
    }),
    updateTask: builder.mutation<
      ITask,
      { task: Omit<ITask, 'id'>; taskId: string; boardId: string; columnId: string }
    >({
      query: ({ taskId, boardId, columnId, task }) => ({
        url: `boards/${boardId}/columns/${columnId}/tasks/${taskId}`,
        method: 'PUT',
        body: task,
      }),
      invalidatesTags: () => [{ type: 'Boards' }],
    }),
    deleteTask: builder.mutation<void, { boardId: string; columnsId: string; taskId: string }>({
      query: ({ taskId, boardId, columnsId }) => ({
        url: `boards/${boardId}/columns/${columnsId}/tasks/${taskId}`,
        method: 'DELETE',
      }),
      invalidatesTags: () => [{ type: 'Boards' }],
    }),
  }),
});

export const {
  useGetTasksQuery,
  useCreateTaskMutation,
  useUpdateTaskMutation,
  useDeleteTaskMutation,
} = tasksApi;
