import './index.css';

import { Helmet, HelmetProvider } from 'react-helmet-async';
import { RouterProvider } from 'react-router-dom';
import { Toaster } from 'sonner';

import { router } from './pages/routes';
import { ThemeProvider } from './components/theme/theme-provider';

export function App() {
  return (
    <ThemeProvider storageKey="pizzashop-theme" defaultTheme="dark">
      <HelmetProvider>
        <Helmet titleTemplate="%s | Pizza Shop" />
        <Toaster richColors position="top-right" />
        <RouterProvider router={router} />
      </HelmetProvider>
    </ThemeProvider>
  );
}
