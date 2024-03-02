import { createBrowserRouter } from 'react-router-dom'

import { AppLayoyut } from './_layouts/app'
import { AuthLayout } from './_layouts/auth'
import { Dashboard } from './app/dashboard'
import { SignIn } from './auth/sign-in'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayoyut />,
    children: [
      {
        path: '/',
        element: <Dashboard />,
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
    ],
  },
])
