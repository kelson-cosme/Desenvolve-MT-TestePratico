import React, { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import apiClient from '../api/axios.config';
import PersonCard from '../components/PersonCard';
import Pagination from '../components/Pagination';
import FilterBar, { type Filters } from '../components/FilterBar'; 
import { type Person } from '@/types/person';
import CardSkeleton from '../components/CardSkeleton';

interface PaginatedResponse {
  content: Person[];
  totalPages: number;
}

const HomePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  
  const [searchParams, setSearchParams] = useSearchParams();
  
  const initialFilters: Filters = {
    nome: searchParams.get('nome') || '',
    idadeInicial: searchParams.get('faixaIdadeInicial') || '',
    idadeFinal: searchParams.get('faixaIdadeFinal') || '',
    sexo: searchParams.get('sexo') || '',
    status: searchParams.get('status') || '',
  };
  const currentPage = parseInt(searchParams.get('page') || '1', 10);

  const fetchData = useCallback(async () => {
    setLoading(true);
    
    const params: { [key: string]: any } = {
      pagina: currentPage - 1,
      porPagina: 10,
    };
    if (initialFilters.nome) params.nome = initialFilters.nome;
    if (initialFilters.idadeInicial) params.faixaIdadeInicial = initialFilters.idadeInicial;
    if (initialFilters.idadeFinal) params.faixaIdadeFinal = initialFilters.idadeFinal;
    if (initialFilters.sexo) params.sexo = initialFilters.sexo;
    if (initialFilters.status) params.status = initialFilters.status;

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
  }, [searchParams]); 
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleSearchSubmit = (filters: Filters) => {
    const newParams: { [key: string]: string } = { page: '1' };
    
    if (filters.nome) newParams.nome = filters.nome;
    if (filters.idadeInicial) newParams.faixaIdadeInicial = filters.idadeInicial;
    if (filters.idadeFinal) newParams.faixaIdadeFinal = filters.idadeFinal;
    if (filters.sexo) newParams.sexo = filters.sexo;
    if (filters.status) newParams.status = filters.status;
    
    setSearchParams(newParams);
  };

  const handlePageChange = (page: number) => {
    const currentParams = Object.fromEntries(searchParams.entries());
    setSearchParams({ ...currentParams, page: page.toString() });
  };

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8">
      <FilterBar
        initialFilters={initialFilters}
        onSearchSubmit={handleSearchSubmit}
      />
      
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {Array.from({ length: 10 }).map((_, index) => (
            <CardSkeleton key={index} />
          ))}
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {people.length > 0 ? (
              people.map(person => (
                <PersonCard 
                  key={person.id} 
                  person={person} 
                  forcedStatus={initialFilters.status} 
                />
              ))
            ) : (
              <div className="col-span-full text-center py-10 bg-[#333333] rounded-lg">
                <p className="text-lg text-white">Nenhum resultado encontrado.</p>
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