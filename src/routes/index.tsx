import { lazy, Suspense } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// Importa as páginas usando lazy loading
const HomePage = lazy(() => import('@/pages/HomePage'));
// const DetailsPage = lazy(() => import('../pages/DetailsPage'));

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
//   {
//     path: '/person/:id', // Rota para a página de detalhes 
//     element: <DetailsPage />,
//   },
]);

export const AppRouter = () => (
  <Suspense fallback={<div>Carregando...</div>}>
    <RouterProvider router={router} />
  </Suspense>
);