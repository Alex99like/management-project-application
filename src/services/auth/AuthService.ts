import { IUser } from './../../types/user.type';
import { axiosClassic, axiosClassicToken } from '../../api/axios';

export const AuthService = {
  async register(login: string, name: string, password: string) {
    const response = await axiosClassic.post<IUser>(`/signup`, {
      name,
      login,
      password,
    });

    return response;
  },

  async login(login: string, password: string) {
    const response = await axiosClassic.post<IUser>(`/signin`, {
      login,
      password,
    });

    return response;
  },

  async update(login: string, name: string, password: string, idUser: string) {
    const response = await axiosClassicToken.put<IUser>(`/users/${idUser}`, {
      name,
      login,
      password,
    });

    return response;
  },

  async delete(idUser: string) {
    const response = await axiosClassicToken.delete(`/users/${idUser}`);

    return response;
  },
};
