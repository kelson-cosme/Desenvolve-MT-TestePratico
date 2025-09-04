import React, { useState } from 'react';
import apiClient from '../api/axios.config';
import { toast } from 'react-hot-toast'; 

interface InformationFormProps {
  ocorrenciaId: number;
  onClose: () => void;
}

const InformationForm: React.FC<InformationFormProps> = ({ ocorrenciaId, onClose }) => {
  const [observacao, setObservacao] = useState('');
  const [localizacao, setLocalizacao] = useState('');
  const [fotos, setFotos] = useState<FileList | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [dataHora, setDataHora] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!dataHora) {
      alert('Por favor, selecione uma data e hora.');
      return;
    }

    const dataFormatada = dataHora.split('T')[0];

    setIsSubmitting(true);
    const formData = new FormData();

    formData.append('ocoId', ocorrenciaId.toString());
    formData.append('informacao', `Local avistado: ${localizacao}. Observações: ${observacao}`);
    formData.append('data', dataFormatada);
    
    if (fotos) {
      for (let i = 0; i < fotos.length; i++) {
        formData.append('files', fotos[i]);
      }
    }

    try {
      await apiClient.post('/ocorrencias/informacoes-desaparecido', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      toast.success('Informações enviadas com sucesso!');
      onClose();
    } catch (error) {
      console.error('Erro ao enviar informações:', error);
      toast.error('Falha ao enviar informações. Tente novamente.'); 
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50 text-white">
      <div className="bg-[#2a2a2a] p-8 rounded-lg shadow-xl w-full max-w-lg relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-2xl font-bold">&times;</button>
        <h2 className="text-2xl font-bold mb-6">Registrar Nova Informação</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="dataHora" className="block mb-2">Data e Hora que viu a pessoa</label>
            <input 
              id="dataHora" 
              type="datetime-local"
              value={dataHora}
              onChange={(e) => setDataHora(e.target.value)}
              required 
              className="w-full p-2 rounded bg-[#444444] border border-gray-600 appearance-none" // 'appearance-none' ajuda a estilizar
            />
          </div>
          <div className="mb-4">
            <label htmlFor="localizacao" className="block mb-2">Localização (Cidade/Bairro/Rua)</label>
            <input id="localizacao" type="text" value={localizacao} onChange={(e) => setLocalizacao(e.target.value)} required className="w-full p-2 rounded bg-[#444444] border border-gray-600" />
          </div>
          <div className="mb-4">
            <label htmlFor="observacao" className="block mb-2">Observações Adicionais</label>
            <textarea id="observacao" value={observacao} onChange={(e) => setObservacao(e.target.value)} rows={4} className="w-full p-2 rounded bg-[#444444] border border-gray-600"></textarea>
          </div>
          <div className="mb-6">
            <label htmlFor="fotos" className="block mb-2">Anexar Fotos</label>
            <input id="fotos" type="file" multiple onChange={(e) => setFotos(e.target.files)} 
            
              className="block w-full text-sm text-gray-300
                file:mr-4 file:py-2 file:px-4
                file:rounded-full file:border-0
                file:text-sm file:font-semibold
                file:bg-blue-600 file:text-white
                hover:file:bg-blue-700
                transition duration-200"/>
          </div>
          <div className="flex justify-end gap-4">
            <button type="button" onClick={onClose} className="bg-gray-600 hover:bg-[#444444] text-white font-bold py-2 px-4 rounded">Cancelar</button>
            <button type="submit" disabled={isSubmitting} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50">
              {isSubmitting ? 'Enviando...' : 'Enviar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InformationForm;