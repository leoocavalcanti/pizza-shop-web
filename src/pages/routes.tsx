import { createBrowserRouter } from 'react-router-dom';

import { AppLayoyut } from './_layouts/app';
import { AuthLayout } from './_layouts/auth';
import { Dashboard } from './app/dashboard';
import { SignIn } from './auth/sign-in';
import { SignUp } from './auth/sign-up';
import { Orders } from './app/orders/orders';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayoyut />,
    children: [
      {
        path: '/',
        element: <Dashboard />,
      },
      {
        path: '/orders',
        element: <Orders />,
      },
    ],
  },
  {
    path: '/',
    element: <AuthLayout />,
    children: [
      {
        path: '/sign-in',
        element: <SignIn />,
      },
      {
        path: '/sign-up',
        element: <SignUp />,
      },
    ],
  },
]);
