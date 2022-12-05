import { IUser } from './../../types/user.type';
import { toastError } from './../../utils/toastrError';
import { IRegister } from './../../views/components/Form/form.interface';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AuthService } from '../../services/auth/AuthService';
import { toastr } from 'react-redux-toastr';
import { REHYDRATE, getStoredState } from 'reduxjs-toolkit-persist';
import storage from 'reduxjs-toolkit-persist/lib/storage';
import { RootState } from '../store';

export const register = createAsyncThunk<IUser, IRegister>(
  'auth/register',
  async ({ login, password, name }, thunkApi) => {
    try {
      const state = thunkApi.getState() as RootState;
      toastr.success(
        state.root.lang === 'en' ? 'Registration' : 'Регистрация',
        state.root.lang === 'en' ? 'Completed successfully' : 'Успешно'
      );
      const response = await AuthService.register(login, name, password);
      return response.data;
    } catch (error) {
      toastError(error);
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const login = createAsyncThunk<IUser, IRegister>(
  'auth/login',
  async ({ login, password }, thunkApi) => {
    try {
      const state = thunkApi.getState() as RootState;
      const response = await AuthService.login(login, password);
      toastr.success(
        state.root.lang === 'en' ? 'Login' : 'Логин',
        state.root.lang === 'en' ? 'Completed successfully' : 'Успешно'
      );
      return response.data;
    } catch (error) {
      toastError(error);
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const updateUser = createAsyncThunk<Omit<IUser, 'token'>, IRegister & { id: string }>(
  'users/update',
  async ({ login, password, name, id }, thunkApi) => {
    try {
      const response = await AuthService.update(login, name, password, id);
      const state = thunkApi.getState() as RootState;
      toastr.success(
        state.root.lang === 'en' ? 'Update' : 'Обновление',
        state.root.lang === 'en' ? 'Completed successfully' : 'Успешно'
      );
      return response.data;
    } catch (error) {
      toastError(error);
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const deleteUser = createAsyncThunk<void, { id: string }>(
  'users/delete',
  async ({ id }, thunkApi) => {
    try {
      await AuthService.delete(id);
      const state = thunkApi.getState() as RootState;
      toastr.success(
        state.root.lang === 'en' ? 'Delete' : 'Удаление',
        state.root.lang === 'en' ? 'Completed successfully' : 'Успешно'
      );
    } catch (error) {
      toastError(error);
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const logout = createAsyncThunk<void>('auth/logout', async (_, thunkApi) => {
  const state = thunkApi.getState() as RootState;
  toastr.warning(
    state.root.lang === 'en' ? 'Logout' : 'Логаут',
    state.root.lang === 'en' ? 'You have logged out of your account' : 'Вы вышли из своего аккаунта'
  );
});

export const getUserLS = createAsyncThunk(REHYDRATE, async () => {
  const user = (await getStoredState({ key: 'user', storage })) as {
    user: IUser;
    routes: 'private' | 'public';
  };

  return user;
});
