import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { formatDate } from '../utils/dateFormatter';
import { type Person } from '@/types/person';
import PlaceholderImage from '@/assets/logo.png';

interface PersonCardProps {
  person: Person;
  forcedStatus?: string;
}

const PersonCard: React.FC<PersonCardProps> = ({ person, forcedStatus }) => {
  const [imageSrc, setImageSrc] = useState(person.urlFoto);

  useEffect(() => {
    setImageSrc(person.urlFoto);
  }, [person.urlFoto]);

  let isMissing: boolean;

  if (forcedStatus) {
    isMissing = forcedStatus === 'DESAPARECIDO';
  } else {
    isMissing = person.ultimaOcorrencia.dataLocalizacao === null;
  }
  
  const statusText = isMissing ? 'Desaparecido(a)' : 'Localizado(a)';
  const statusColor = isMissing ? 'text-yellow-400' : 'text-green-400';
  const statusBgColor = isMissing ? 'bg-yellow-500/20' : 'bg-green-500/20';

  const local = person.ultimaOcorrencia?.localDesaparecimentoConcat || 'Local não informado';
  
  // Lógica de data aprimorada
  const dateText = isMissing ? 'Em:' : 'Localizado(a) em:';
  const dateToShow = isMissing 
    ? person.ultimaOcorrencia?.dtDesaparecimento 
    : person.ultimaOcorrencia?.dataLocalizacao;

  return (
    <Link 
      to={`/person/${person.id}`} 
      className="group flex flex-col bg-[#333333] border-gray-700 rounded-lg overflow-hidden shadow-lg hover:shadow-cyan-500/20 hover:border-cyan-500 transition-all duration-300"
    >
      <div className="overflow-hidden">
        <img 
          className="w-full h-60 object-cover group-hover:scale-105 transition-transform duration-300" 
          src={imageSrc || PlaceholderImage}
          alt={person.nome} 
          onError={() => { setImageSrc(PlaceholderImage); }}
        />
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-lg font-bold text-white mb-2 truncate">{person.nome}</h3>
        <p className="text-gray-300 text-sm mb-3">{person.idade} anos</p>
        <p className="text-gray-300 text-sm mb-4">
          {isMissing ? 'Visto por último em:' : 'Local:'} {local}
        </p>
        
        {/* Usando a data e o texto corretos */}
        <p className="text-gray-300 text-sm">{dateText} {formatDate(dateToShow)}</p>

        <div className="mt-auto pt-4">
          <span className={`inline-block text-xs font-semibold px-3 py-1 rounded-full ${statusColor} ${statusBgColor}`}>
            {statusText}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default PersonCard;