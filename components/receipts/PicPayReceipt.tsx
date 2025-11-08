
import React from 'react';
import { TransactionData } from '../../types';
import { formatarDataHora, formatarCPFCNPJ, formatarValor } from '../../utils';

interface ReceiptProps {
  data: TransactionData;
}

const PicPayReceipt: React.FC<ReceiptProps> = ({ data }) => {
  const InfoBlock: React.FC<{title: string, name: string, doc: string, institution: string}> = ({title, name, doc, institution}) => (
    <div className="mb-4">
        <p className="text-sm font-bold text-gray-700">{title}</p>
        <p className="text-gray-800">{name}</p>
        <p className="text-sm text-gray-600">{formatarCPFCNPJ(doc)}</p>
        <p className="text-sm text-gray-600">{institution}</p>
    </div>
  );
    
  return (
    <div className="font-sans bg-white p-6 max-w-md mx-auto border-t-8 border-green-500">
        <div className="text-center mb-6">
            <h2 className="text-3xl font-bold text-green-500">PicPay</h2>
            <h3 className="text-lg font-semibold text-gray-700 mt-1">Comprovante de Pix</h3>
            <p className="text-sm text-gray-500 mt-2">{formatarDataHora(data.dataHora)}</p>
        </div>
        
        <div className="text-center bg-gray-50 rounded-lg p-4 mb-6">
            <span className="text-gray-600 text-sm">Valor pago</span>
            <p className="text-3xl font-bold text-gray-900">{formatarValor(data.valor)}</p>
        </div>

        <InfoBlock title="Para" name={data.nomeDestino} doc={data.cpfCnpjDestino} institution={data.instituicaoDestino} />
        <InfoBlock title="De" name={data.nomeOrigem} doc={data.cpfCnpjOrigem} institution={data.instituicaoOrigem} />
       
        <div className="border-t border-gray-200 pt-4 mt-4">
            <p className="text-sm font-bold text-gray-700">Dados bancários do recebedor</p>
            <p className="text-sm text-gray-600">AG {data.agenciaDestino} | CC {data.contaDestino}</p>
        </div>

        <div className="border-t border-gray-200 pt-4 mt-4">
            <p className="text-sm font-bold text-gray-700">ID da transação</p>
            <p className="text-xs text-gray-600 break-words">{data.idTransacao}</p>
        </div>
        
        <div className="text-center mt-6 text-xs text-gray-400">
            <p>PicPay Instituição de Pagamento S.A</p>
            <p>CNPJ 22.896.431/0001-10</p>
        </div>
    </div>
  );
};

export default PicPayReceipt;
