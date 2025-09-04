import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import apiClient from '../api/axios.config';
import InformationForm from '../components/InformationForm';
import { formatDate } from '../utils/dateFormatter';
import InformationLog, { type LogInfo } from '../components/InformationLog';

// Interface corrigida para incluir 'dataLocalizacao'
interface PersonDetails {
  id: number;
  nome: string;
  idade: number;
  sexo: string;
  urlFoto: string;
  ultimaOcorrencia: {
    ocoId: number;
    dtDesaparecimento: string;
    localDesaparecimentoConcat: string;
    dataLocalizacao: string | null; // Campo chave para o status
    ocorrenciaEntrevDesapDTO?: {
      vestimentasDesaparecido?: string;
    };
  };
}


const DetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [person, setPerson] = useState<PersonDetails | null>(null);
  const [informationLogs, setInformationLogs] = useState<LogInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isFormVisible, setIsFormVisible] = useState(false);

    useEffect(() => {
    const fetchDetailsAndLogs = async () => {
      try {
        setLoading(true);
        const personResponse = await apiClient.get<PersonDetails>(`/pessoas/${id}`);
        setPerson(personResponse.data);
        
        const ocorrenciaId = personResponse.data.ultimaOcorrencia.ocoId;
        if (ocorrenciaId) {
          const logsResponse = await apiClient.get<LogInfo[]>(`/ocorrencias/informacoes-desaparecido`, {
            params: {
              ocorrenciaId: ocorrenciaId
            }
          });
          setInformationLogs(logsResponse.data);
        }

        setError(null);
      } catch (err) {
        setError("Não foi possível carregar os dados.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchDetailsAndLogs();
    }
  }, [id]);

  if (loading) { return <div className="text-center mt-10">Carregando detalhes...</div>; }
  if (error) { return <div className="text-center mt-10 text-red-500">{error}</div>; }
  if (!person) { return <div className="text-center mt-10">Pessoa não encontrada.</div>; }

  // --- INÍCIO DA CORREÇÃO ---
  // Lógica dinâmica para o status baseada em 'dataLocalizacao'
  const isMissing = person.ultimaOcorrencia.dataLocalizacao === null;
  const statusText = isMissing ? 'DESAPARECIDO' : 'LOCALIZADO';
  const statusClasses = isMissing 
    ? 'bg-yellow-500 text-black font-bold py-1 px-3 rounded' 
    : 'bg-green-500 text-white font-bold py-1 px-3 rounded';
  // --- FIM DA CORREÇÃO ---
  
  const vestimentas = person.ultimaOcorrencia?.ocorrenciaEntrevDesapDTO?.vestimentasDesaparecido;


  return (
    <>
      <div className="container mx-auto p-4 max-w-4xl">
        <button onClick={() => navigate(-1)} className="text-blue-400 hover:underline mb-6 inline-block">
          &larr; Voltar para a lista
        </button>

        <div className="bg-[#333333] shadow-xl rounded-lg overflow-hidden md:flex mb-8">
           <img className="md:w-1/3 w-full h-auto object-cover" src={person.urlFoto} alt={person.nome} />
          <div className="p-6 md:w-2/3">
            <div className="flex justify-between items-start">
              <h1 className="text-3xl font-bold text-white mb-2">{person.nome}</h1>
              {/* Usando as variáveis dinâmicas */}
              <span className={statusClasses}>{statusText}</span>
            </div>
            <p className="text-gray-300 text-lg mb-4">{person.idade} anos</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <div><strong className="font-semibold text-white">Sexo:</strong> <p className='text-white'>{person.sexo}</p></div>
              <div><strong className="font-semibold text-white">Desaparecimento:</strong><p className='text-white'>{formatDate(person.ultimaOcorrencia?.dtDesaparecimento)}</p> </div>
              <div className="col-span-2"><strong className="font-semibold text-white">Local:</strong> <p className='text-white'>{person.ultimaOcorrencia?.localDesaparecimentoConcat}</p> </div>
            </div>
            <div className="mb-6">
              <h3 className="font-semibold text-white border-b border-gray-600 pb-2 mb-2">Vestimentas</h3>
              <p className="text-gray-300">{vestimentas || 'Nenhuma informação registrada.'}</p>
            </div>
            <button onClick={() => setIsFormVisible(true)} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded transition duration-300">
              Enviar Informações Adicionais
            </button>
          </div>
        </div>
        <div className="bg-[#333333] text-white shadow-xl rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4 border-b border-gray-700 pb-2">Histórico de Informações</h2>
          {informationLogs.length > 0 ? (
            <div className="space-y-4">
              {informationLogs.map(log => (
                <InformationLog key={log.id} log={log} />
              ))}
            </div>
          ) : (
            <p className="text-gray-300">Nenhuma informação adicional foi registrada para este caso ainda.</p>
          )}
        </div>
      </div>
      {isFormVisible && <InformationForm ocorrenciaId={person.ultimaOcorrencia.ocoId} onClose={() => setIsFormVisible(false)} />}
    </>
  );
};

export default DetailsPage;