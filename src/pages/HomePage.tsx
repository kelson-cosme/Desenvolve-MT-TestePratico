import React, { useState, useEffect, useCallback } from 'react';
import apiClient from '../api/axios.config';
import PersonCard from '../components/PersonCard';
import Pagination from '../components/Pagination';
import SearchBar from '../components/SearchBar';

export interface Person {
  id: number;
  nome: string;
  urlFoto: string;
  idade: number;
  ultimaOcorrencia: {
    dtDesaparecimento: string;
    localDesaparecimentoConcat: string;
  };
}

interface PaginatedResponse {
  content: Person[];
  totalPages: number;
}


const HomePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [currentPage, setCurrentPage] = useState(1); // API agora espera base 1 para 'pagina'
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [submittedSearch, setSubmittedSearch] = useState('');

  const fetchData = useCallback(async () => {
    setLoading(true);
    
    const params = {
      nome: submittedSearch,
      pagina: currentPage - 1, 
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
    setCurrentPage(1); 
    setSubmittedSearch(searchTerm);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

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
                <p className="text-sm text-gray-500 mt-2">Tente buscar por outro nome ou limpe a busca.</p>
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