import { RouterProvider } from 'react-router-dom';
import { privateRouter, publicRouter } from './config/routes';
import { useAuth } from './views/components/Form/useAuth';
import { Suspense, useEffect } from 'react';
import { useRootState } from './store/store';
import i18n from './utils/i18next';

function App() {
  const { user } = useAuth();
  const routes = user ? publicRouter : privateRouter;
  const state = useRootState();

  useEffect(() => {
    i18n.changeLanguage(state.lang);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Suspense fallback="Loading..">
      <RouterProvider router={routes} />
    </Suspense>
  );
}

export default App;
