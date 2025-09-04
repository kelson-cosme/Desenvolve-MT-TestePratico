import { lazy, Suspense } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const HomePage = lazy(() => import('@/pages/HomePage'));
const DetailsPage = lazy(() => import('@/pages/DetailsPage')); 

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/person/:id', 
    element: <DetailsPage />, 
  },
]);

export const AppRouter = () => (
  <Suspense fallback={<div className="flex justify-center items-center h-screen">Carregando...</div>}>
    <RouterProvider router={router} />
  </Suspense>
);