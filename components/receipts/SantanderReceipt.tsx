import React from 'react';
import { TransactionData } from '../../types';
import { formatarCPFCNPJ, formatarValor } from '../../utils';

interface ReceiptProps {
  data: TransactionData;
}

const SantanderLogo = () => (
    <div className="flex flex-col items-center justify-center mb-2">
        <img src="https://i.postimg.cc/674Q7gtL/SANTANDER2.png" alt="Santander Logo" className="w-32" />
    </div>
);


const SantanderReceipt: React.FC<ReceiptProps> = ({ data }) => {
    const formatarDataHora = (dataHora: string): string => {
        if (!dataHora) return '';
        try {
            const date = new Date(dataHora);
            const dia = String(date.getDate()).padStart(2, '0');
            const mes = String(date.getMonth() + 1).padStart(2, '0');
            const ano = date.getFullYear();
            const horas = String(date.getHours()).padStart(2, '0');
            const minutos = String(date.getMinutes()).padStart(2, '0');
            return `${dia}/${mes}/${ano} - ${horas}:${minutos}`;
        } catch (error) { return 'Data inválida'; }
    };
    
  const Section: React.FC<{title: string, children: React.ReactNode}> = ({title, children}) => (
    <div className="mb-5">
        <h3 className="text-sm font-semibold text-gray-500 pb-2 mb-2">{title}</h3>
        <div className="space-y-4">{children}</div>
    </div>
  );

  const InfoPair: React.FC<{label: string, value: string | undefined}> = ({label, value}) => (
    <div>
        <p className="text-gray-900 font-semibold">{label}</p>
        <p className="text-gray-800 font-bold">{value || '-'}</p>
    </div>
  );

  return (
    <div className="font-sans bg-white p-6 max-w-md mx-auto text-sm">
        
        <div className="text-center mb-6">
            <SantanderLogo />
            <h1 className="text-xl font-bold text-gray-800 mt-2">Comprovante do Pix</h1>
            <p className="text-gray-500 mt-1">{formatarDataHora(data.dataHora)}</p>
        </div>
        
        <hr className="my-6 border-gray-200"/>

        <div className="mb-6">
            <p className="text-gray-900 font-semibold">Valor pago</p>
            <p className="text-2xl font-bold text-gray-900">{formatarValor(data.valor)}</p>
        </div>

        <Section title="Dados do recebedor">
            <InfoPair label="Para" value={data.nomeDestino} />
            <InfoPair label="CNPJ" value={formatarCPFCNPJ(data.cpfCnpjDestino)} />
            {data.chavePixDestino && <InfoPair label="Chave" value={data.chavePixDestino} />}
            <InfoPair label="Instituição" value={data.instituicaoDestino} />
        </Section>
        
        <Section title="Dados do pagador">
            <InfoPair label="De" value={data.nomeOrigem} />
            <InfoPair label="CPF" value={formatarCPFCNPJ(data.cpfCnpjOrigem)} />
            <InfoPair label="Instituição" value={data.instituicaoOrigem} />
        </Section>

        <div className="mt-8 border-t border-gray-200 pt-4">
             <InfoPair label="ID/Transação" value={data.idTransacao} />
        </div>

        <div className="text-right text-xs text-gray-400 mt-8">
            <p>Comprovante do Pix</p>
            <p>1/2</p>
        </div>
    </div>
  );
};

export default SantanderReceipt;