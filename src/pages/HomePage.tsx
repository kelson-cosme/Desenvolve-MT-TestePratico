import { useState, useEffect } from 'react';
import apiClient from '../api/axios.config';
// Supondo que você crie esses componentes
// import PersonCard from '../components/PersonCard';
// import Pagination from '../components/Pagination';
// import SearchBar from '../components/SearchBar';

// Defina uma interface para os dados da pessoa
interface Person {
  id: number;
  nome: string;
  foto: string;
  status: 'DESAPARECIDO' | 'LOCALIZADO';
  // Adicione outros campos conforme a API
}

const HomePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    // Função para buscar os dados da API
    const fetchData = async (page: number) => {
      try {
        // Exemplo: a API pode aceitar 'page' e 'size' como parâmetros
        const response = await apiClient.get(`/pessoas?page=${page}&size=10`);
        setPeople(response.data.content);
        setTotalPages(response.data.totalPages);
      } catch (error) {
        console.error("Falha ao buscar dados", error);
      }
    };

    fetchData(currentPage);
  }, [currentPage]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Pessoas Desaparecidas e Localizadas</h1>
      <SearchBar />
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {people.map(person => (
          <PersonCard key={person.id} person={person} />
        ))}
      </div>
      
      <Pagination 
        currentPage={currentPage} 
        totalPages={totalPages} 
        onPageChange={setCurrentPage} 
      />
    </div>
  );
};

export default HomePage;