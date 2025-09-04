import React, { useState, useEffect } from 'react';
import apiClient from '@/api/axios.config'; 
import Logo from "@/assets/logo.png";

interface Stats {
  quantPessoasDesaparecidas: number;
  quantPessoasEncontradas: number;
}

const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [stats, setStats] = useState<Stats | null>(null);
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await apiClient.get<Stats>('/pessoas/aberto/estatistico');
        setStats(response.data);
      } catch (error) {
        console.error("Erro ao buscar estatísticas:", error);
      }
    };

    fetchStats();
  }, []); 

  return (
    <div className="min-h-screen  text-pjc-light font-sans">
      <header className="bg-[linear-gradient(137deg,_rgba(0,0,0,1)_0%,_rgba(94,99,95,1)_50%,_rgba(0,0,0,1)_100%)] shadow-lg backdrop-blur-sm border-b border-white/10">
        <nav className="container mx-auto px-6 py-4 flex flex-wrap justify-between items-center">
          <div className="flex items-center gap-4">
            <img className='w-20' src={Logo} alt="Logo PJC-MT" />
            <div className='text-white'>
              <h1 className="text-xl font-bold">POLÍCIA JUDICIÁRIA CIVIL</h1>
              <p>Estado de Mato Grosso</p>
            </div>
          </div>
          
          {stats && (
            <div className="flex gap-6 mt-4 sm:mt-0 text-center">
              <div>
                <p className="text-2xl font-bold text-yellow-400">{stats.quantPessoasDesaparecidas}</p>
                <p className="text-sm text-gray-300">Desaparecidos</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-green-400">{stats.quantPessoasEncontradas}</p>
                <p className="text-sm text-gray-300">Encontrados</p>
              </div>
            </div>
          )}
        </nav>
      </header>
      <main>
        {children}
      </main>

<footer className="bg-[#1a1a1a] border-t border-white/10 mt-12 py-8">
      <div className="container mx-auto px-6 text-center text-gray-400">
        <p>
          &copy; {currentYear} Polícia Judiciária Civil - Estado de Mato Grosso
        </p>
        <p className="text-sm mt-2">
          Desenvolvido por <a href="https://kelson-cosme.vercel.app" target='blank'>Kelson Cosme de Almeida</a> 
        </p>
        <div className="mt-4">
          <a href="https://www.pjc.mt.gov.br/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline mx-2">
            Site Oficial PJC-MT
          </a>
          <span className="text-gray-500">|</span>
          <a href="https://www.sesp.mt.gov.br" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline mx-2">
            SESP-MT
          </a>
        </div>
      </div>
    </footer>
    </div>
  );
};

export default MainLayout;