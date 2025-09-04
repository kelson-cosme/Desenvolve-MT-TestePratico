import React, { useState } from 'react';
import apiClient from '../api/axios.config';

interface InformationFormProps {
  ocorrenciaId: number;
  onClose: () => void;
}

const InformationForm: React.FC<InformationFormProps> = ({ ocorrenciaId, onClose }) => {
  const [dataHora, setDataHora] = useState('');
  const [localizacao, setLocalizacao] = useState('');
  const [observacoes, setObservacoes] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0]);
    } else {
      setSelectedFile(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    const formData = new FormData();
    formData.append('ocorrenciaId', ocorrenciaId.toString());
    formData.append('informacaoAvistamento', observacoes);
    formData.append('dataAvistamento', dataHora); // Formato esperado pela API "YYYY-MM-DDTHH:MM:SS"
    formData.append('localAvistamento', localizacao);
    
    if (selectedFile) {
      formData.append('arquivos', selectedFile);
    }

    try {
      await apiClient.post('/ocorrencias/informacoes-desaparecido', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setSuccess('Informação registrada com sucesso!');
      // Limpa o formulário após sucesso
      setDataHora('');
      setLocalizacao('');
      setObservacoes('');
      setSelectedFile(null);
      // Opcional: fechar o formulário automaticamente
      // setTimeout(onClose, 2000); 
    } catch (err) {
      setError('Falha ao registrar informação. Verifique os dados e tente novamente.');
      console.error('Erro ao enviar informações:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50">
      <div className="bg-[#2a2a2a] p-8 rounded-lg shadow-xl w-full max-w-md border border-gray-700 relative">
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition duration-200"
          aria-label="Fechar"
        >
          &times;
        </button>
        <h2 className="text-2xl font-bold text-white mb-6">Registrar Nova Informação</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="dataHora" className="block text-gray-300 text-sm font-bold mb-2">
              Data e Hora que viu a pessoa
            </label>
            <input
              type="text" // Usar text para input customizado ou date-time-local
              id="dataHora"
              value={dataHora}
              onChange={(e) => setDataHora(e.target.value)}
              placeholder="AAAA-MM-DD HH:MM" // Exemplo de formato
              className="shadow appearance-none border border-gray-600 rounded w-full py-2 px-3 bg-[#444444] text-white leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label htmlFor="localizacao" className="block text-gray-300 text-sm font-bold mb-2">
              Localização (Cidade/Bairro/Rua)
            </label>
            <input
              type="text"
              id="localizacao"
              value={localizacao}
              onChange={(e) => setLocalizacao(e.target.value)}
              placeholder="Ex: Cuiabá/Centro/Rua Principal"
              className="shadow appearance-none border border-gray-600 rounded w-full py-2 px-3 bg-[#444444] text-white leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label htmlFor="observacoes" className="block text-gray-300 text-sm font-bold mb-2">
              Observações Adicionais
            </label>
            <textarea
              id="observacoes"
              value={observacoes}
              onChange={(e) => setObservacoes(e.target.value)}
              rows={4}
              placeholder="Descreva detalhes como vestimentas, comportamento, etc."
              className="shadow appearance-none border border-gray-600 rounded w-full py-2 px-3 bg-[#444444] text-white leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            ></textarea>
          </div>
          <div>
            <label htmlFor="anexarFotos" className="block text-gray-300 text-sm font-bold mb-2">
              Anexar Fotos
            </label>
            <input
              type="file"
              id="anexarFotos"
              onChange={handleFileChange}
              className="block w-full text-sm text-gray-300
                file:mr-4 file:py-2 file:px-4
                file:rounded-full file:border-0
                file:text-sm file:font-semibold
                file:bg-blue-600 file:text-white
                hover:file:bg-blue-700
                transition duration-200"
            />
          </div>

          {error && <p className="text-red-400 text-sm">{error}</p>}
          {success && <p className="text-green-400 text-sm">{success}</p>}

          <div className="flex justify-end space-x-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded transition duration-200"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Enviando...' : 'Enviar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InformationForm;