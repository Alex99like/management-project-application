import { IInitialStateRoot, rootSlice } from './rootSlice';
import { authSlice } from './AuthAction/authSlice';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { reducer as toastrReducer } from 'react-redux-toastr';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'reduxjs-toolkit-persist';
import storage from 'reduxjs-toolkit-persist/lib/storage';
import { api } from '../services/Api.service';

const authPersistConfig = {
  key: 'user',
  storage,
  blacklist: ['isLoading'],
};

const rootPersistConfig = {
  key: 'root',
  storage,
};

const reducers = combineReducers({
  [api.reducerPath]: api.reducer,
  auth: persistReducer(authPersistConfig, authSlice.reducer),
  root: persistReducer(rootPersistConfig, rootSlice.reducer),
  toastr: toastrReducer,
});

export const store = configureStore({
  reducer: reducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(api.middleware),
});

export const persister = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useRootState = () => useAppSelector((state) => state.root as IInitialStateRoot);
