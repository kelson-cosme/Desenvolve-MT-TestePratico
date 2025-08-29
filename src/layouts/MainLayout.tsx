import React from 'react';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-900 text-white font-sans">
      <header className="bg-gray-800 shadow-md">
        <nav className="container mx-auto px-6 py-4">
          <h1 className="text-xl font-bold">Pessoas Desaparecidas</h1>
        </nav>
      </header>
      <main>
        {children}
      </main>
    </div>
  );
};

export default MainLayout;