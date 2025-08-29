export const formatDate = (dateString: string): string => {
  if (!dateString) {
    return 'Data não informada';
  }
  const date = new Date(dateString);
  // Verifica se a data é válida
  if (isNaN(date.getTime())) {
    return 'Data inválida';
  }
  return date.toLocaleDateString('pt-BR');
};