import * as AuthAction from './AuthAction/authAction';
import { authSlice } from './AuthAction/authSlice';
import { rootSlice } from './rootSlice';

export const allActions = {
  ...AuthAction,
  ...rootSlice.actions,
  ...authSlice.actions,
};
