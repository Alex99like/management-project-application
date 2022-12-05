import React, { PropsWithChildren } from 'react';
import { Provider } from 'react-redux';
import { persister, store } from '../store/store';
import { PersistGate } from 'reduxjs-toolkit-persist/integration/react';

export const RootProvider = ({ children }: PropsWithChildren) => {
  return (
    <>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persister}>
          {children}
        </PersistGate>
      </Provider>
    </>
  );
};
