export const formatDate = (dateString: string | null): string => {
  if (!dateString) {
    return 'Data não informada';
  }

  const datePart = dateString.split('T')[0];
  
  const parts = datePart.split('-');

  if (parts.length !== 3) {
    return 'Data inválida';
  }

  const [year, month, day] = parts;

  return `${day}/${month}/${year}`;
};