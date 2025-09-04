import { AppRouter } from './routes';
import MainLayout from './layouts/MainLayout';
import { Toaster } from 'react-hot-toast'; 

function App() {
  return (
    <MainLayout>
      <Toaster 
        position="bottom-right"
        toastOptions={{
          style: {
            background: '#333',
            color: '#fff',
          },
        }}
      />
      <AppRouter />
    </MainLayout>
  );
}

export default App;