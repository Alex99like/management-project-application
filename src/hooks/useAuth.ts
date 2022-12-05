import { IInitialStateAuth } from './../store/AuthAction/authSlice';
import { useAppSelector } from '../store/store';

export const useAuth = () => useAppSelector((state) => state.auth as IInitialStateAuth);
