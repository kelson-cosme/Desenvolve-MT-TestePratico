import { AppRouter } from './routes';
import MainLayout from './layouts/MainLayout'; // Importe o layout

function App() {
  return (
    <MainLayout>
      <AppRouter />
    </MainLayout>
  );
}

export default App;