import { RootState } from './../store/store';
import { API_URL } from './../api/axios';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { IUser } from '../types/user.type';

export const api = createApi({
  reducerPath: 'api',
  tagTypes: ['Users', 'Boards', 'Columns', 'Tasks'],
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.user.token;

      if (token) headers.set('Authorization', `Bearer ${token}`);

      return headers;
    },
  }),
  endpoints: (builder) => ({
    getUsers: builder.query<IUser, void>({
      query: () => `users`,
      providesTags: () => [{ type: 'Users' }],
    }),
  }),
});

export const { useGetUsersQuery } = api;
