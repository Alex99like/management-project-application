import { createBrowserRouter } from 'react-router-dom';
import { ErrorElement } from '../views/components/Error/ErrorBoundary';
import { FormAuth } from '../views/components/Form/Form';
import Layout from '../views/components/Layout/Layout';
import BoardPage from '../views/pages/BoardPage/BoardPage';
import { EditPage } from '../views/pages/EditPage/EditPage';
import MainPage from '../views/pages/MainPage/MainPage';
import NotFound from '../views/pages/NotFoundPage/NotFoundPage';
import WelcomePage from '../views/pages/WelcomePage/WelcomePage';

export const publicRouter = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <ErrorElement />,
    children: [
      {
        path: '/',
        element: <WelcomePage />,
      },
      {
        path: 'main',
        element: <MainPage />,
        index: true,
      },
      {
        path: 'board',
        element: <BoardPage />,
      },
      {
        path: 'edit',
        element: <EditPage />,
      },
      {
        path: 'login',
        element: <FormAuth path={'login'} />,
      },
      {
        path: 'register',
        element: <FormAuth path={'register'} />,
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
]);

export const privateRouter = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <ErrorElement />,
    children: [
      {
        path: '/',
        element: <WelcomePage />,
        index: true,
      },
      {
        path: 'login',
        element: <FormAuth path={'login'} />,
      },
      {
        path: 'register',
        element: <FormAuth path={'register'} />,
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
]);
