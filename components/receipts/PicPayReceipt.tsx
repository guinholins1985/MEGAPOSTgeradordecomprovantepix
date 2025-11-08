import React from 'react';
import { TransactionData } from '../../types';
import { formatarCPFCNPJ, formatarValor } from '../../utils';

interface ReceiptProps {
  data: TransactionData;
}

const PicPayLogo = () => (
    <img src="https://i.postimg.cc/xkBctYtR/PICPAY2.png" alt="PicPay Logo" className="w-24 mb-4" />
)

const PicPayReceipt: React.FC<ReceiptProps> = ({ data }) => {
    const formatarDataHora = (dataHora: string): string => {
        if (!dataHora) return '';
        try {
            const dataObj = new Date(dataHora);
            const dia = String(dataObj.getDate()).padStart(2, '0');
            const mes = String(dataObj.getMonth() + 1).padStart(2, '0');
            const ano = dataObj.getFullYear();
            const horas = String(dataObj.getHours()).padStart(2, '0');
            const minutos = String(dataObj.getMinutes()).padStart(2, '0');
            return `${dia}/${mes}/${ano} - ${horas}:${minutos}`;
        } catch (error) { return 'Data inválida'; }
    };
    
    return (
        <div className="font-sans bg-white p-6 max-w-md mx-auto text-sm text-gray-800">
            <PicPayLogo />
            
            <h1 className="text-xl font-bold text-gray-900">Comprovante de pagamento</h1>
            <p className="text-gray-500 mt-1 mb-6">{formatarDataHora(data.dataHora)}</p>

            <div className="bg-[#E5F9F0] text-[#1D7F4D] p-3 rounded-lg flex items-center mb-6 font-medium">
                <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
                <span>Seu pagamento foi enviado com sucesso!</span>
            </div>
            
            <div className="border-t border-gray-200 pt-6">
                <div className="grid grid-cols-2 gap-x-4">
                    <div>
                        <p className="text-gray-500 text-xs">Valor</p>
                        <p className="text-2xl font-bold text-gray-900">{formatarValor(data.valor)}</p>
                    </div>
                     <div className="text-right space-y-3">
                        <div>
                            <p className="font-medium text-gray-800">Banco liquidante</p>
                            <p className="text-gray-500">{data.instituicaoDestino}</p>
                        </div>
                        <div>
                            <p className="font-medium text-gray-800">Código de autenticação</p>
                            <p className="text-gray-500 text-xs">O código estará disponível após a liquidação</p>
                        </div>
                    </div>
                </div>

                <div className="space-y-4 mt-6">
                    <div>
                        <p className="font-bold text-gray-900">Para</p>
                        <p className="text-gray-700">{data.nomeDestino}</p>
                        <p className="text-gray-500">{formatarCPFCNPJ(data.cpfCnpjDestino)}</p>
                    </div>
                    <div>
                        <p className="font-bold text-gray-900">De</p>
                        <p className="text-gray-700">{data.nomeOrigem}</p>
                        <p className="text-gray-500">{formatarCPFCNPJ(data.cpfCnpjOrigem)}</p>
                    </div>
                    <div>
                        <p className="font-bold text-gray-900">ID da transação</p>
                        <p className="text-gray-500 break-words">{data.idTransacao}</p>
                    </div>
                </div>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-200 text-xs text-gray-500">
                <div className="flex justify-between items-start">
                    <div className="flex items-start">
                        <svg className="w-5 h-5 mr-2 mt-0.5 text-gray-400" viewBox="0 0 24 24" fill="currentColor"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"></path></svg>
                        <div>
                            <p><strong>PicPay Instituição de Pagamento S.A</strong></p>
                            <p>CNPJ nº 22.896.431/0001-10.</p>
                        </div>
                    </div>
                     <div className="text-right">
                        <p className="font-semibold">Ouvidoria:</p>
                        <p>0800 025 2000 (dias úteis das 9h às 18h)</p>
                        <p>SAC: 0800 025 8000</p>
                     </div>
                </div>
            </div>
        </div>
    );
};

export default PicPayReceipt;