import { IColumn, IColumnReq } from '../types/column.type';
import { api } from './Api.service';

export const columnApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getColumns: builder.query<IColumn[], { boardId: string }>({
      query: ({ boardId }) => `boards/${boardId}/columns`,
      providesTags: () => [{ type: 'Boards' }],
    }),
    createColumn: builder.mutation<IColumn, { column: IColumnReq; boardId: string }>({
      query: ({ boardId, column }) => ({
        url: `boards/${boardId}/columns`,
        method: 'POST',
        body: column,
      }),
      invalidatesTags: () => [{ type: 'Boards' }],
    }),
    updateColumn: builder.mutation<
      IColumn,
      { column: Omit<IColumn, 'id'>; boardId: string; columnsId: string }
    >({
      query: ({ boardId, columnsId, column }) => ({
        url: `boards/${boardId}/columns/${columnsId}`,
        method: 'PUT',
        body: column,
      }),
      invalidatesTags: () => [{ type: 'Boards' }],
    }),
    deleteColumn: builder.mutation<void, { boardId: string; columnsId: string }>({
      query: ({ columnsId, boardId }) => ({
        url: `boards/${boardId}/columns/${columnsId}`,
        method: 'DELETE',
      }),
      invalidatesTags: () => [{ type: 'Boards' }],
    }),
  }),
});

export const {
  useUpdateColumnMutation,
  useCreateColumnMutation,
  useGetColumnsQuery,
  useDeleteColumnMutation,
} = columnApi;
