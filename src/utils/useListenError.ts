import { useActions } from './../hooks/useAction';
import { toastr } from 'react-redux-toastr';
import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const isFetchBaseQueryError = (
  error: FetchBaseQueryError | SerializedError | undefined
): error is FetchBaseQueryError => {
  if (error && 'status' in error) return true;
  else return false;
};

export const useListenError = (
  errors: Array<FetchBaseQueryError | SerializedError | undefined>
) => {
  const { toggleRoutes, logout } = useActions();
  const { t } = useTranslation();

  useEffect(() => {
    errors.forEach((error) => {
      if (isFetchBaseQueryError(error)) {
        if (error.status === 401) {
          toastr.error(t('toastr.rtkError'), t('toastr.authorization'));
          toggleRoutes(true);
          logout();
        } else {
          toastr.error(
            t('toastr.rtkError'),
            (error.data as { message: string }).message || t('toastr.anyError')
          );
        }
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...errors]);
};
