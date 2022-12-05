import { IUser } from './../../types/user.type';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { deleteUser, getUserLS, login, logout, register, updateUser } from './authAction';

export interface IInitialStateAuth {
  user: IUser | null;
  isLoading: boolean;
  routes: 'private' | 'public';
  isAuth: boolean;
}

const initialState: IInitialStateAuth = {
  user: null,
  isLoading: false,
  routes: 'private',
  isAuth: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    toggleRoutes(state, { payload }: PayloadAction<boolean>) {
      state.isAuth = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, { payload }: PayloadAction<IUser>) => {
        state.isLoading = false;
        state.user = payload;
        state.routes = 'public';
      })
      .addCase(login.rejected, (state) => {
        state.isLoading = false;
        state.isAuth = false;
      })
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, { payload }: PayloadAction<IUser>) => {
        state.isLoading = false;
        state.user = payload;
        state.routes = 'public';
      })
      .addCase(register.rejected, (state) => {
        state.isLoading = false;
        state.isAuth = false;
      })
      .addCase(logout.fulfilled, (state) => {
        state.isLoading = false;
        state.user = null;
        state.routes = 'private';
      })
      .addCase(updateUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateUser.fulfilled, (state, { payload }: PayloadAction<Omit<IUser, 'token'>>) => {
        state.isLoading = false;
        if (state.user) {
          state.user.login = payload.login;
          state.user.name = payload.name;
        }
      })
      .addCase(updateUser.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(deleteUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteUser.fulfilled, (state) => {
        state.isLoading = false;
        state.user = null;
        state.routes = 'private';
      })
      .addCase(deleteUser.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(getUserLS.fulfilled, (state, { payload }) => {
        state.user = payload.user = payload.user;
        state.routes = payload.routes;
      });
  },
});
