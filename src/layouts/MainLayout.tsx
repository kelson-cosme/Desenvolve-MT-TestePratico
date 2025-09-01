import React from 'react';
import Logo from "@/assets/logo.jpg"

const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    // Aplicando o seu gradiente customizado diretamente com a sintaxe de colchetes
    // O Tailwind converte espaços em underscores dentro dos colchetes
    <div className="min-h-screen text-pjc-light font-sans">
      <header className="bg-[linear-gradient(137deg,_rgba(0,0,0,1)_0%,_rgba(94,99,95,1)_50%,_rgba(0,0,0,1)_100%)]  bg-transparent shadow-lg backdrop-blur-sm border-b border-white/10">
        <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <img className='w-20' src={Logo} alt="" />
            <div className='text-white'>
              <h1 className="text-xl font-bold ">POLÍCIA JUDICIÁRIA CIVIL</h1>
              <p>Estado de Mato Grosso</p>
            </div>
          </div>
        </nav>
      </header>
      <main>
        {children}
      </main>
    </div>
  );
};

export default MainLayout;