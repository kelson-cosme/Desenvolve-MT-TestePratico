import React from 'react';
import { formatDate } from '../utils/dateFormatter';

// A palavra 'export' aqui é a correção crucial
export interface LogInfo {
  id: number;
  informacao: string;
  data: string;
  anexos: string[];
}

interface InformationLogProps {
  log: LogInfo;
}

const InformationLog: React.FC<InformationLogProps> = ({ log }) => {
  return (
    <div className="bg-gray-700 p-4 rounded-lg border border-gray-600">
      <p className="text-gray-300 mb-2">{log.informacao}</p>
      <p className="text-sm text-gray-400 mb-4">
        Data da informação: {formatDate(log.data)}
      </p>
      {log.anexos && log.anexos.length > 0 && (
        <div>
          <h4 className="font-semibold text-sm mb-2">Anexos:</h4>
          <div className="flex flex-wrap gap-2">
            {log.anexos.map((anexo, index) => (
              <a href={anexo} key={index} target="_blank" rel="noopener noreferrer">
                <img 
                  src={anexo} 
                  alt={`Anexo ${index + 1}`} 
                  className="w-24 h-24 object-cover rounded-md border-2 border-gray-500 hover:border-blue-400 transition"
                />
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default InformationLog;