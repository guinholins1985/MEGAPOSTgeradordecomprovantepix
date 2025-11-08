
import React from 'react';
import { TransactionData } from '../../types';
import { formatarDataHora, formatarCPFCNPJ, formatarValor } from '../../utils';

interface ReceiptProps {
  data: TransactionData;
}

const CaixaReceipt: React.FC<ReceiptProps> = ({ data }) => {

  const Section: React.FC<{title: string, children: React.ReactNode}> = ({title, children}) => (
    <div className="mb-5">
        <h3 className="text-lg font-semibold text-blue-800 border-b border-gray-300 pb-2 mb-3">{title}</h3>
        <div className="space-y-2">{children}</div>
    </div>
  );

  const InfoPair: React.FC<{label: string, value: string | undefined, valueClass?: string}> = ({label, value, valueClass = 'text-gray-800 font-medium'}) => (
    <div>
        <p className="text-sm text-gray-600">{label}</p>
        <p className={`text-sm ${valueClass}`}>{value || '-'}</p>
    </div>
  );

  return (
    <div className="font-sans bg-white p-6 max-w-md mx-auto border-t-8 border-blue-800">
        <div className="text-center mb-6">
            <h2 className="text-3xl font-bold text-blue-800 tracking-wider">CAIXA</h2>
            <p className="text-sm text-gray-500 mt-2">{formatarDataHora(data.dataHora)}</p>
            <p className="mt-4 text-lg font-semibold text-green-600">Pix realizado com sucesso!</p>
        </div>

        <Section title="Dados do recebedor">
            <InfoPair label="Nome" value={data.nomeDestino} />
            <InfoPair label="CPF/CNPJ" value={formatarCPFCNPJ(data.cpfCnpjDestino)} />
            <InfoPair label="Instituição" value={data.instituicaoDestino} />
        </Section>
        
        <Section title="Dados do pagador">
            <InfoPair label="Nome" value={data.nomeOrigem} />
            <InfoPair label="CPF/CNPJ" value={formatarCPFCNPJ(data.cpfCnpjOrigem)} />
            <InfoPair label="Instituição" value={data.instituicaoOrigem} />
        </Section>
        
        <Section title="Dados da transação">
            <InfoPair label="Situação" value="Efetivado" valueClass="text-green-600 font-bold" />
            <InfoPair label="Valor" value={formatarValor(data.valor)} valueClass="text-gray-900 font-bold text-base" />
            <InfoPair label="Chave Pix" value={data.chavePixDestino} />
            <InfoPair label="ID transação" value={data.idTransacao} />
        </Section>
    </div>
  );
};

export default CaixaReceipt;
