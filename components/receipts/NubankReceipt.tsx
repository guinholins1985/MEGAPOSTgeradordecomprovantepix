import React from 'react';
import { TransactionData } from '../../types';
import { formatarCPFCNPJ, formatarValor } from '../../utils';

interface ReceiptProps {
  data: TransactionData;
}

const NubankLogo = () => (
    <svg width="40" height="25" viewBox="0 0 63 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="mb-6">
        <path d="M26.43 39.528C11.252 39.528 0 32.416 0 20.132 0 7.448 10.988 0 25.702 0h2.196v3.294c-1.318.066-2.504.13-3.756.13-11.714 0-19.134 4.882-19.134 16.708 0 11.252 8.444 15.972 18.706 15.972 1.84 0 3.548-.132 5.08-.328V.458h2.196C42.85 0 52.862 7.846 52.862 20.066c0 12.536-9.946 19.462-26.432 19.462zm29.856-19.33c0-12.276-9.88-19.66-24.918-19.66h-2.13v39.07h2.13c15.102 0 24.918-7.514 24.918-19.41z" fill="#8A05BE"></path>
    </svg>
)

const NubankReceipt: React.FC<ReceiptProps> = ({ data }) => {
    const formatarDataHora = (dataHora: string): string => {
        if (!dataHora) return '';
        try {
            const dataObj = new Date(dataHora);
            const dia = String(dataObj.getDate()).padStart(2, '0');
            const meses = ['FEV', 'FEV', 'MAR', 'ABR', 'MAI', 'JUN', 'JUL', 'AGO', 'SET', 'OUT', 'NOV', 'DEZ'];
            const mes = meses[dataObj.getMonth()];
            const ano = dataObj.getFullYear();
            const horas = String(dataObj.getHours()).padStart(2, '0');
            const minutos = String(dataObj.getMinutes()).padStart(2, '0');
            return `${dia} ${mes} ${ano} - ${horas}:${minutos}`;
        } catch (error) { return 'Data inválida'; }
    };
  
  const DetailRow: React.FC<{ label: string; value: string | undefined; isBold?: boolean }> = ({ label, value, isBold }) => (
    <div className="flex justify-between items-start py-3">
      <span className="text-gray-600">{label}</span>
      <span className={`text-gray-900 text-right ${isBold ? 'font-bold' : 'font-normal'}`}>{value || '-'}</span>
    </div>
  );

  return (
    <div className="font-sans bg-white p-6 max-w-md mx-auto text-[15px] leading-relaxed">
      <NubankLogo />
      
      <h1 className="text-2xl font-bold text-gray-900 mb-1">Comprovante de transferência</h1>
      <p className="text-gray-500 mb-6">{formatarDataHora(data.dataHora)}</p>
      
      <div className="border-t border-b border-gray-200 divide-y divide-gray-200">
        <DetailRow label="Valor" value={formatarValor(data.valor)} isBold />
        <DetailRow label="Tipo de transferência" value="Pix" />
      </div>

      <div className="mt-6">
        <h3 className="font-semibold text-gray-500 mb-2">Destino</h3>
        <div className="border-t border-gray-200 divide-y divide-gray-200">
          <DetailRow label="Nome" value={data.nomeDestino} isBold />
          <DetailRow label="CPF" value={formatarCPFCNPJ(data.cpfCnpjDestino)} isBold />
          <DetailRow label="Instituição" value={data.instituicaoDestino} isBold />
          <DetailRow label="Agência" value={data.agenciaDestino} />
          <DetailRow label="Conta" value={data.contaDestino} />
          {data.chavePixDestino && <DetailRow label="Chave Pix" value={data.chavePixDestino} />}
        </div>
      </div>
      
      <div className="mt-6">
        <h3 className="font-semibold text-gray-500 mb-2">Origem</h3>
        <div className="border-t border-gray-200 divide-y divide-gray-200">
          <DetailRow label="Nome" value={data.nomeOrigem} isBold />
          <DetailRow label="CNPJ" value={formatarCPFCNPJ(data.cpfCnpjOrigem)} isBold />
          <DetailRow label="Instituição" value={data.instituicaoOrigem} isBold />
          <DetailRow label="Agência" value={data.agenciaOrigem} />
          <DetailRow label="Conta" value={data.contaOrigem} />
        </div>
      </div>
      
      <div className="mt-8 pt-6 border-t border-gray-200 bg-gray-50 -mx-6 px-6 py-6">
        <p className="font-medium"><strong>Nu Pagamentos S.A. - Instituição de Pagamento</strong></p>
        <p className="font-medium">CNPJ 18.236.120/0001-58</p>
        <p className="font-bold mt-4 break-words">ID da transação:<br/>{data.idTransacao}</p>
        <p className="mt-4 text-gray-600">Estamos aqui para ajudar se você tiver alguma dúvida.</p>
        <a href="#" className="text-purple-700 font-bold mt-2 inline-flex items-center">
          Me ajuda <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
        </a>
      </div>

      <div className="text-center text-xs text-gray-500 mt-6">
        <p>Ouvidoria: 0800 887 0463 | ouvidoria@nubank.com.br</p>
        <p>(Atendimento das 8h às 18h em dias úteis).</p>
      </div>
    </div>
  );
};

export default NubankReceipt;
