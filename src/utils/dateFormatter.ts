export const formatDate = (dateString: string | null): string => {
  if (!dateString) {
    return 'Data não informada';
  }
  const date = new Date(dateString);
  // Verifica se a data é válida
  if (isNaN(date.getTime())) {
    return 'Data inválida';
  }
  // Correção do nome da função
  return date.toLocaleDateString('pt-BR');
};