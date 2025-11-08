
import React from 'react';
import { TransactionData } from '../../types';
import { formatarDataHora, formatarCPFCNPJ, formatarValor } from '../../utils';

interface ReceiptProps {
  data: TransactionData;
}

const NubankReceipt: React.FC<ReceiptProps> = ({ data }) => {
  const DetailRow: React.FC<{ label: string; value: string | undefined }> = ({ label, value }) => (
    <div className="flex justify-between items-center py-3 border-b border-gray-200">
      <span className="text-sm text-gray-600">{label}</span>
      <span className="text-sm font-semibold text-gray-800 text-right">{value || '-'}</span>
    </div>
  );

  return (
    <div className="font-sans bg-white p-6 max-w-md mx-auto border-t-8 border-purple-600">
      <div className="text-center mb-6">
        <h2 className="text-xl font-bold text-gray-800">Comprovante de transferência</h2>
        <p className="text-sm text-gray-500 mt-1">{formatarDataHora(data.dataHora)}</p>
      </div>

      <div className="bg-gray-50 rounded-lg p-4 mb-6">
        <div className="flex justify-between items-center">
            <span className="text-gray-600">Valor</span>
            <span className="text-2xl font-bold text-gray-900">{formatarValor(data.valor)}</span>
        </div>
         <div className="flex justify-between items-center mt-2">
            <span className="text-sm text-gray-600">Tipo de transferência</span>
            <span className="text-sm font-semibold text-purple-600">Pix</span>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="font-bold text-gray-800 mb-2">Destino</h3>
        <div className="rounded-lg border border-gray-200 px-4">
          <DetailRow label="Nome" value={data.nomeDestino} />
          <DetailRow label="CPF/CNPJ" value={formatarCPFCNPJ(data.cpfCnpjDestino)} />
          <DetailRow label="Instituição" value={data.instituicaoDestino} />
          <DetailRow label="Agência" value={data.agenciaDestino} />
          <DetailRow label="Conta" value={data.contaDestino} />
          <DetailRow label="Chave Pix" value={data.chavePixDestino} />
        </div>
      </div>
      
      <div className="mb-6">
        <h3 className="font-bold text-gray-800 mb-2">Origem</h3>
        <div className="rounded-lg border border-gray-200 px-4">
          <DetailRow label="Nome" value={data.nomeOrigem} />
          <DetailRow label="CPF/CNPJ" value={formatarCPFCNPJ(data.cpfCnpjOrigem)} />
          <DetailRow label="Instituição" value={data.instituicaoOrigem} />
          <DetailRow label="Agência" value={data.agenciaOrigem} />
          <DetailRow label="Conta" value={data.contaOrigem} />
        </div>
      </div>

      <div className="text-center text-xs text-gray-500">
        <p className="break-words"><strong>ID da transação:</strong> {data.idTransacao}</p>
        <p className="mt-4">Nu Pagamentos S.A. - Instituição de Pagamento</p>
        <p>CNPJ 18.236.120/0001-58</p>
      </div>
    </div>
  );
};

export default NubankReceipt;
