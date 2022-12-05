import { IBoard, IBoardReq } from '../types/board.type';
import { api } from './Api.service';

export const boardApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getBoards: builder.query<IBoard[], void>({
      query: () => 'boards',
      providesTags: () => [{ type: 'Boards' }],
    }),
    createBoard: builder.mutation<IBoard, IBoardReq>({
      query: (board) => ({
        url: 'boards',
        method: 'POST',
        body: board,
      }),
      invalidatesTags: () => [{ type: 'Boards' }],
    }),
    updateBoard: builder.mutation<IBoard, { board: Omit<IBoard, 'id'>; boardId: string }>({
      query: ({ board, boardId }) => ({
        url: `boards/${boardId}`,
        method: 'PUT',
        body: board,
      }),
      invalidatesTags: () => [{ type: 'Boards' }],
    }),
    deleteBoard: builder.mutation<void, { boardId: string }>({
      query: ({ boardId }) => ({
        url: `boards/${boardId}`,
        method: 'DELETE',
      }),
      invalidatesTags: () => [{ type: 'Boards' }],
    }),
  }),
});

export const {
  useGetBoardsQuery,
  useCreateBoardMutation,
  useUpdateBoardMutation,
  useDeleteBoardMutation,
} = boardApi;
