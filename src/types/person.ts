export interface Person {
  id: number;
  nome: string;
  urlFoto: string;
  idade: number;
  status: 'DESAPARECIDO' | 'LOCALIZADO';
  ultimaOcorrencia: {
    dtDesaparecimento: string;
    localDesaparecimentoConcat: string;
    dataLocalizacao: string | null; // Adicionado
    encontradoVivo: boolean | null;   // Adicionado
  };
}