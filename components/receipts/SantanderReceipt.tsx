
import React from 'react';
import { TransactionData } from '../../types';
import { formatarDataHora, formatarCPFCNPJ, formatarValor } from '../../utils';

interface ReceiptProps {
  data: TransactionData;
}

const SantanderReceipt: React.FC<ReceiptProps> = ({ data }) => {
    
  const Section: React.FC<{title: string, children: React.ReactNode}> = ({title, children}) => (
    <div className="mb-5">
        <h3 className="text-red-600 font-bold border-b-2 border-red-600 pb-1 mb-2">{title}</h3>
        <div className="space-y-1">{children}</div>
    </div>
  );

  const InfoPair: React.FC<{label: string, value: string | undefined}> = ({label, value}) => (
    <div>
        <p className="text-xs text-gray-500">{label}</p>
        <p className="text-sm font-semibold text-gray-800">{value || '-'}</p>
    </div>
  );

  return (
    <div className="font-sans bg-white p-6 max-w-md mx-auto border-t-8 border-red-600">
        <div className="text-center mb-6">
            <h2 className="text-3xl font-bold text-red-600">Santander</h2>
            <h3 className="text-lg font-semibold text-gray-700 mt-1">Comprovante do Pix</h3>
            <p className="text-sm text-gray-500 mt-2">{formatarDataHora(data.dataHora)}</p>
        </div>

        <div className="flex justify-between items-center bg-gray-50 p-3 rounded-md mb-6">
            <span className="text-sm text-gray-600">Valor pago</span>
            <span className="text-xl font-bold text-gray-900">{formatarValor(data.valor)}</span>
        </div>

        <Section title="Dados do recebedor">
            <InfoPair label="Para" value={data.nomeDestino} />
            <InfoPair label="CPF/CNPJ" value={formatarCPFCNPJ(data.cpfCnpjDestino)} />
            <InfoPair label="Chave" value={data.chavePixDestino} />
            <InfoPair label="Instituição" value={data.instituicaoDestino} />
        </Section>
        
        <Section title="Dados do pagador">
            <InfoPair label="De" value={data.nomeOrigem} />
            <InfoPair label="CPF/CNPJ" value={formatarCPFCNPJ(data.cpfCnpjOrigem)} />
            <InfoPair label="Instituição" value={data.instituicaoOrigem} />
        </Section>

        <div className="mt-6 border-t border-gray-200 pt-3">
             <InfoPair label="ID/Transação" value={data.idTransacao} />
        </div>
    </div>
  );
};

export default SantanderReceipt;
