import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import ReduxToastrLib from 'react-redux-toastr';
import { useAuth } from '../../../hooks/useAuth';
import { useActions } from '../../../hooks/useAction';
import { withErrorBoundary } from 'react-error-boundary';
import { ErrorElement } from '../Error/ErrorBoundary';

const Layout = (): JSX.Element => {
  const navigate = useNavigate();
  const { routes, isAuth } = useAuth();
  const { toggleRoutes } = useActions();

  useEffect(() => {
    if (routes === 'public' && isAuth) {
      navigate('/main');
      toggleRoutes(false);
    }
    if (routes === 'private' && isAuth) {
      navigate('/');
      toggleRoutes(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [routes]);

  return (
    <>
      <Header />
      <main>
        <ReduxToastrLib
          newestOnTop={false}
          preventDuplicates
          progressBar
          closeOnToastrClick
          timeOut={4000}
          transitionIn="bounceIn"
          transitionOut="fadeOut"
        />
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default withErrorBoundary(Layout, {
  fallback: <ErrorElement />,
});
