import React from 'react';
import { Link } from 'react-router-dom';
import { formatDate } from '../utils/dateFormatter';

interface Person {
  id: number;
  nome: string;
  urlFoto: string; 
  idade: number;
  ultimaOcorrencia: {
    dtDesaparecimento: string;
    localDesaparecimentoConcat: string;
  };
}

interface PersonCardProps {
  person: Person;
}

const PersonCard: React.FC<PersonCardProps> = ({ person }) => {
  const statusColor = 'text-yellow-400';
  const statusBgColor = 'bg-yellow-500/20';

  const local = person.ultimaOcorrencia?.localDesaparecimentoConcat || 'Local não informado';

  return (
    <Link 
      to={`/person/${person.id}`} 
      className="group flex flex-col bg-[#333333] border-gray-700 rounded-lg overflow-hidden shadow-lg hover:shadow-cyan-500/20 hover:border-cyan-500 transition-all duration-300"
    >
      <div className="overflow-hidden">
        <img 
          className="w-full h-60 object-cover group-hover:scale-105 transition-transform duration-300" 
          src={person.urlFoto} 
          alt={person.nome} 
          onError={(e) => { e.currentTarget.src = 'https://placehold.co/400x600?text=Foto+Indispon%C3%ADvel'; }}
        />
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-lg font-bold text-white mb-2 truncate">{person.nome}</h3>
        <p className="text-gray-300 text-sm mb-3">{person.idade} anos</p>
        <p className="text-gray-300 text-sm mb-4">
          Visto por último em: {local}
        </p>
        
        <p className="text-gray-300 text-sm">Em: {formatDate(person.ultimaOcorrencia?.dtDesaparecimento)}</p>

        <div className="mt-auto pt-4">
          <span className={`inline-block text-xs font-semibold px-3 py-1 rounded-full ${statusColor} ${statusBgColor}`}>
            Desaparecido(a)
          </span>
        </div>
      </div>
    </Link>
  );
};

export default PersonCard;