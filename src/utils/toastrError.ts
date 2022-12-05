import { toastr } from 'react-redux-toastr';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const errorCatch = (error: any): string =>
  error.response && error.response.data
    ? typeof error.response.data.message === 'object'
      ? error.response.data.message[0]
      : error.response.data.message
    : error.message;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const toastError = (error: any, title?: string) => {
  const message = errorCatch(error);
  toastr.error(title || 'Error request', message);
  throw message;
};
