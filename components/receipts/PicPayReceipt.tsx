import React from 'react';
import { TransactionData } from '../../types';
import { formatarCPFCNPJ, formatarValor } from '../../utils';

interface ReceiptProps {
  data: TransactionData;
}

const PicPayLogo = () => (
    <svg width="100" height="38" viewBox="0 0 100 38" fill="none" xmlns="http://www.w3.org/2000/svg" className="mb-4">
        <path d="M16.64 21.84c0-2.32 1.92-4.24 4.24-4.24s4.24 1.92 4.24 4.24c0 2.24-1.92 4.16-4.24 4.16-2.32 0-4.24-1.92-4.24-4.16zm6.48 0c0-1.2-.96-2.16-2.24-2.16-1.2 0-2.16.96-2.16 2.16 0 1.28.96 2.24 2.16 2.24 1.28 0 2.24-.96 2.24-2.24zM26.4 25.44a4.811 4.811 0 01-1.2.16c-2.32 0-4.24-1.92-4.24-4.24 0-2.32 1.92-4.24 4.24-4.24a4.23 4.23 0 013.6 2.08l1.76-1.12a6.309 6.309 0 00-5.36-2.88c-3.6 0-6.48 2.88-6.48 6.16s2.88 6.24 6.48 6.24c2.08 0 3.92-1.04 5.12-2.64l-1.68-1.04a3.374 3.374 0 01-2.64.96zM46.8 17.6h-2.16v8.4h2.16v-8.4zM40.4 21.84c0-2.32 1.92-4.24 4.24-4.24s4.24 1.92 4.24 4.24c0 2.24-1.92 4.16-4.24 4.16-2.32 0-4.24-1.92-4.24-4.16zm6.48 0c0-1.2-.96-2.16-2.24-2.16-1.2 0-2.16.96-2.16 2.16 0 1.28.96 2.24 2.16 2.24 1.28 0 2.24-.96 2.24-2.24z" fill="#11C76F"></path>
        <path d="M66.41 19.33l-3.36 8.8h-2.24l-3.36-8.8h2.32l2.16 5.92 2.16-5.92h2.32zM75.29 28.13c-3.6 0-6.48-2.88-6.48-6.16s2.88-6.24 6.48-6.24c3.6 0 6.48 2.88 6.48 6.24s-2.88 6.16-6.48 6.16zm0-10.32c-2.32 0-4.24 1.92-4.24 4.16s1.92 4.24 4.24 4.24 4.24-1.92 4.24-4.24-1.92-4.16-4.24-4.16zM83.29 28.13V17.81h2.16v1.92h.08a4.57 4.57 0 014-2.24c2.8 0 4.8 2.16 4.8 5.44v5.44h-2.16v-5.2c0-2.08-1.2-3.36-3.2-3.36s-3.28 1.28-3.28 3.52v5.04h-2.4z" fill="#212121"></path>
        <path d="M35.61 24.37v-9.12h-2.16v9.12h2.16zM50.49 24.37v-9.12h2.16v9.12h-2.16zM9.69 19.33v-1.68h-2V12.8h-2.16v4.85h-2.96v1.68h2.96v6.56c0 1.84 1.2 2.88 3.04 2.88.56 0 1.12-.16 1.6-.4l-.48-1.6a1.31 1.31 0 00-.8.24c-.56 0-.8-.4-.8-.96v-6.72h2.72zM0 12.05h1.92l4.16 11.2h2.16l4.16-11.2h1.92L8.25 28.13H6.01L0 12.05z" fill="#212121"></path>
    </svg>
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
