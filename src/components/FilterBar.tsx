import React, { useState, useEffect } from 'react';

export interface Filters {
  nome: string;
  idadeInicial: string;
  idadeFinal: string;
  sexo: string;
  status: string;
}

interface FilterBarProps {
  initialFilters: Filters;
  onSearchSubmit: (filters: Filters) => void;
}

const FilterBar: React.FC<FilterBarProps> = ({ initialFilters, onSearchSubmit }) => {
  const [filters, setFilters] = useState<Filters>(initialFilters);

  useEffect(() => {
    setFilters(initialFilters);
  }, [initialFilters]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearchSubmit(filters);
  };

  const handleClearFilters = () => {
    const clearedFilters = { nome: '', idadeInicial: '', idadeFinal: '', sexo: '', status: '' };
    setFilters(clearedFilters);
    onSearchSubmit(clearedFilters);
  };

  return (
    <form onSubmit={handleFormSubmit} className="p-4 bg-[#333333] rounded-lg mb-8 space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <input
          type="text"
          name="nome"
          value={filters.nome}
          onChange={handleChange}
          placeholder="Buscar por nome..."
          className="w-full p-2 rounded bg-[#555555] border border-gray-600 text-white"
        />

        <select name="sexo" value={filters.sexo} onChange={handleChange} className="w-full p-2 rounded bg-[#555555] border border-gray-600 text-white">
          <option value="">Todos os Sexos</option>
          <option value="MASCULINO">Masculino</option>
          <option value="FEMININO">Feminino</option>
        </select>

        <select name="status" value={filters.status} onChange={handleChange} className="w-full p-2 rounded bg-[#555555] border border-gray-600 text-white">
          <option value="">Todos os Status</option>
          <option value="DESAPARECIDO">Desaparecido</option>
          <option value="LOCALIZADO">Localizado</option>
        </select>

        <div className="flex items-center gap-2">
          <input
            type="number"
            name="idadeInicial"
            value={filters.idadeInicial}
            onChange={handleChange}
            placeholder="Idade de"
            className="w-1/2 p-2 rounded bg-[#555555] border border-gray-600 text-white"
          />
          <input
            type="number"
            name="idadeFinal"
            value={filters.idadeFinal}
            onChange={handleChange}
            placeholder="Idade até"
            className="w-1/2 p-2 rounded bg-[#555555] border border-gray-600 text-white"
          />
        </div>
      </div>
      <div className="flex justify-end gap-4">
        <button type="button" onClick={handleClearFilters} className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
          Limpar Filtros
        </button>
        <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Buscar
        </button>
      </div>
    </form>
  );
};

export default FilterBar;