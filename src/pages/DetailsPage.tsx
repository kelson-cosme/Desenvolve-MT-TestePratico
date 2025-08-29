import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import apiClient from '../api/axios.config';
import InformationForm from '../components/InformationForm';
import { formatDate } from '../utils/dateFormatter';
import InformationLog, { type LogInfo } from '../components/InformationLog';

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
    ocorrenciaEntrevDesapDTO?: {
      vestimentasDesaparecido?: string;
    };
  };
}

const DetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
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
          // --- INÍCIO DA CORREÇÃO ---
          // Usando o formato de query param que você descobriu
          const logsResponse = await apiClient.get<LogInfo[]>(`/ocorrencias/informacoes-desaparecido`, {
            params: {
              ocorrenciaId: ocorrenciaId
            }
          });
          // --- FIM DA CORREÇÃO ---
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

  const statusClasses = 'bg-red-500 text-white font-bold py-1 px-3 rounded';
  const vestimentas = person.ultimaOcorrencia?.ocorrenciaEntrevDesapDTO?.vestimentasDesaparecido;

  return (
    <>
      <div className="container mx-auto p-4 max-w-4xl">
        <Link to="/" className="text-blue-400 hover:underline mb-6 inline-block">&larr; Voltar para a lista</Link>
        <div className="bg-gray-800 shadow-xl rounded-lg overflow-hidden md:flex mb-8">
           <img className="md:w-1/3 w-full h-auto object-cover" src={person.urlFoto} alt={person.nome} />
          <div className="p-6 md:w-2/3">
            <div className="flex justify-between items-start">
              <h1 className="text-3xl font-bold mb-2">{person.nome}</h1>
              <span className={statusClasses}>DESAPARECIDO</span>
            </div>
            <p className="text-gray-400 text-lg mb-4">{person.idade} anos</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <div><strong className="font-semibold text-white">Sexo:</strong> {person.sexo}</div>
              <div><strong className="font-semibold text-white">Desaparecimento:</strong> {formatDate(person.ultimaOcorrencia?.dtDesaparecimento)}</div>
              <div className="col-span-2"><strong className="font-semibold text-white">Local:</strong> {person.ultimaOcorrencia?.localDesaparecimentoConcat}</div>
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
        <div className="bg-gray-800 shadow-xl rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4 border-b border-gray-700 pb-2">Histórico de Informações</h2>
          {informationLogs.length > 0 ? (
            <div className="space-y-4">
              {informationLogs.map(log => (
                <InformationLog key={log.id} log={log} />
              ))}
            </div>
          ) : (
            <p className="text-gray-400">Nenhuma informação adicional foi registrada para este caso ainda.</p>
          )}
        </div>
      </div>
      {isFormVisible && <InformationForm ocorrenciaId={person.ultimaOcorrencia.ocoId} onClose={() => setIsFormVisible(false)} />}
    </>
  );
};

export default DetailsPage;