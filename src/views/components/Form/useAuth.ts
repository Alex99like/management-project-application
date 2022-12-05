import { useAppSelector } from '../../../store/store';

export const useAuth = () => useAppSelector((state) => state.auth);
