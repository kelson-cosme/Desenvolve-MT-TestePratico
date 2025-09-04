export interface Person {
  id: number;
  nome: string;
  urlFoto: string;
  idade: number;
  ultimaOcorrencia: {
    dtDesaparecimento: string;
    localDesaparecimentoConcat: string;
    dataLocalizacao: string | null; // Adicionamos este campo
  };
}