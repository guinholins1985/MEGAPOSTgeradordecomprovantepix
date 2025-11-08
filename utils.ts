

export const formatarDataHora = (dataHora: string): string => {
  if (!dataHora) return '';
  try {
    const data = new Date(dataHora);
    const dia = String(data.getDate()).padStart(2, '0');
    const mes = String(data.getMonth() + 1).padStart(2, '0');
    const ano = data.getFullYear();
    const horas = String(data.getHours()).padStart(2, '0');
    const minutos = String(data.getMinutes()).padStart(2, '0');
    const segundos = String(data.getSeconds()).padStart(2, '0');
    return `${dia}/${mes}/${ano} - ${horas}:${minutos}:${segundos}`;
  } catch (error) {
    return 'Data inválida';
  }
};

export const formatarCPFCNPJ = (cpfCnpj: string): string => {
  const cleaned = cpfCnpj.replace(/\D/g, '');
  if (cleaned.length === 11) {
    // Mask the first 3 and last 2 digits of the CPF
    return cleaned.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "***.$2.$3-**");
  }
  if (cleaned.length === 14) {
    return cleaned.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5");
  }
  return cpfCnpj;
};

export const formatarValor = (valor: string): string => {
    const num = parseFloat(valor.replace(',', '.'));
    if (isNaN(num)) return 'R$ 0,00';
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(num);
};