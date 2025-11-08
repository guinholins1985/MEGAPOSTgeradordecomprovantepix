export enum Bank {
  Nubank = 'Nubank',
  PicPay = 'PicPay',
  Santander = 'Santander',
  Caixa = 'Caixa',
}

export interface TransactionData {
  banco: Bank;
  dataHora: string;
  valor: string;
  nomeDestino: string;
  cpfCnpjDestino: string;
  instituicaoDestino: string;
  agenciaDestino: string;
  contaDestino: string;
  chavePixDestino?: string;
  nomeOrigem: string;
  cpfCnpjOrigem: string;
  instituicaoOrigem: string;
  agenciaOrigem: string;
  contaOrigem: string;
  idTransacao: string;
}
