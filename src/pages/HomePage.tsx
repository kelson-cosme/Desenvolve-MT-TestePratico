import React, { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom'; // 1. Importar useSearchParams
import apiClient from '../api/axios.config';
import PersonCard from '../components/PersonCard';
import Pagination from '../components/Pagination';
import SearchBar from '../components/SearchBar';
import { type Person } from '@/types/person';

interface PaginatedResponse {
  content: Person[];
  totalPages: number;
}

const HomePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  
  // 2. Usar useSearchParams para controlar o estado da página e da busca
  const [searchParams, setSearchParams] = useSearchParams();
  
  // Lemos os valores da URL ou usamos um valor padrão
  const currentPage = parseInt(searchParams.get('page') || '1', 10);
  const submittedSearch = searchParams.get('nome') || '';

  const fetchData = useCallback(async () => {
    setLoading(true);
    
    const params = {
      nome: submittedSearch,
      pagina: currentPage - 1, // API espera base 0
      porPagina: 10,
      faixaIdadeInicial: 0,
      faixaIdadeFinal: 120
    };

    try {
      const response = await apiClient.get<PaginatedResponse>('/pessoas/aberto/filtro', { params });
      setPeople(response.data.content);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error("Falha ao buscar dados", error);
      setPeople([]);
      setTotalPages(0);
    } finally {
      setLoading(false);
    }
  }, [currentPage, submittedSearch]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleSearchSubmit = () => {
    // 3. Ao buscar, atualizamos a URL. Isso dispara a refetch.
    setSearchParams({ nome: searchTerm, page: '1' });
  };

  const handlePageChange = (page: number) => {
    // 4. Ao mudar de página, atualizamos a URL.
    setSearchParams({ nome: submittedSearch, page: page.toString() });
  };
  
  // Sincroniza o input com o termo de busca na URL
  useEffect(() => {
    setSearchTerm(submittedSearch);
  }, [submittedSearch]);


  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8">
      <SearchBar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        onSearchSubmit={handleSearchSubmit}
      />
      
      {loading ? (
        <div className="text-center py-10">Carregando...</div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {people.length > 0 ? (
              people.map(person => <PersonCard key={person.id} person={person} />)
            ) : (
              <div className="col-span-full text-center py-10 bg-gray-800 rounded-lg">
                <p className="text-lg text-gray-400">Nenhum resultado encontrado para "{submittedSearch}".</p>
              </div>
            )}
          </div>
          
          {totalPages > 1 && (
            <Pagination 
              currentPage={currentPage}
              totalPages={totalPages} 
              onPageChange={handlePageChange} 
            />
          )}
        </>
      )}
    </div>
  );
};

export default HomePage;