
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

export const parseValor = (valor: string): number => {
    if (typeof valor !== 'string' || valor.trim() === '') {
        return NaN;
    }

    let cleaned = valor.replace(/[^0-9,.]/g, '');

    // Case 1: Brazilian format (e.g., "1.234,56") where the last separator is a comma.
    if (cleaned.lastIndexOf(',') > cleaned.lastIndexOf('.')) {
        // Remove thousand separators (dots) and replace decimal comma with a dot.
        cleaned = cleaned.replace(/\./g, '').replace(',', '.');
    } 
    // Case 2: American format (e.g., "1,234.56") or formats with only dots.
    else { 
        // Remove thousand separators (commas).
        cleaned = cleaned.replace(/,/g, '');
        
        // If multiple dots exist, they are thousand separators, so remove them.
        // This handles cases like "1.000.000".
        const dotCount = (cleaned.match(/\./g) || []).length;
        if (dotCount > 1) {
            cleaned = cleaned.replace(/\./g, '');
        } 
        // If only one dot exists, check if it's a thousand separator (e.g., "5.000").
        // A single dot is a thousand separator if it's followed by exactly 3 digits.
        else if (dotCount === 1 && cleaned.length - cleaned.lastIndexOf('.') === 4) {
             cleaned = cleaned.replace('.', '');
        }
        // Otherwise, the single dot is a decimal separator, and parseFloat will handle it.
    }

    return parseFloat(cleaned);
};

export const formatarValor = (valor: string): string => {
    const num = parseValor(valor);
    if (isNaN(num)) return 'R$ 0,00';
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(num);
};

export const formatarNumero = (valor: string): string => {
    const num = parseValor(valor);
    if (isNaN(num)) return '0,00';
    return new Intl.NumberFormat('pt-BR', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(num);
};