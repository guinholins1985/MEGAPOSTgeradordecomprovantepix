


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