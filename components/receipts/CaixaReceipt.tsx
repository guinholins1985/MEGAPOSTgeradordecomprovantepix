import React from 'react';
import { TransactionData } from '../../types';
import { formatarValor, formatarCPFCNPJ, formatarNumero } from '../../utils';

interface ReceiptProps {
  data: TransactionData;
}

const CaixaLogo = () => (
    <img src="https://i.postimg.cc/WDYfyYZz/CAIXA.png" alt="CAIXA Logo" className="w-32 filter brightness-0 invert" />
)

const CaixaReceipt: React.FC<ReceiptProps> = ({ data }) => {
    const formatarData = (dataHora: string) => {
        if (!dataHora) return { date: '', time: '', full: '' };
        try {
            const dateObj = new Date(dataHora);
            const date = dateObj.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' });
            const time = dateObj.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
            return { date, time, full: `${date} - ${time}` };
        } catch (error) { return { date: 'Data inválida', time: '', full: 'Data inválida' }; }
    };
    const { date, time, full } = formatarData(data.dataHora);

    const Section: React.FC<{title: string, children: React.ReactNode}> = ({ title, children }) => (
        <div className="mt-6">
            <h3 className="text-sm font-bold text-blue-800 pb-2 border-b-2 border-blue-800 mb-3">{title}</h3>
            <div className="space-y-2 text-sm">{children}</div>
        </div>
    );
    
    const InfoRow: React.FC<{label: string, value: string | undefined}> = ({label, value}) => (
        <div className="flex justify-between">
            <span className="text-gray-600">{label}</span>
            <span className="font-semibold text-gray-800">{value}</span>
        </div>
    );

  return (
    <div className="font-sans bg-gray-100 max-w-md mx-auto">
        <div className="bg-[#005598] pt-4 pb-12 px-4 text-white">
            <CaixaLogo />
            <h1 className="font-semibold text-lg mt-2">Comprovante de Pix enviado</h1>
        </div>
        
        <div className="bg-white rounded-md shadow-md p-4 -mt-10 mx-4 border">
            <div className="flex justify-between items-center text-center">
                <div className="w-1/2">
                    <p className="text-xs text-gray-500">Valor</p>
                    <p className="text-xl font-bold text-gray-900">{formatarValor(data.valor)}</p>
                </div>
                <div className="border-l h-10 border-gray-200"></div>
                <div className="w-1/2">
                    <p className="text-xs text-gray-500">Data</p>
                    <p className="text-base font-bold text-blue-800">{date}</p>
                    <p className="text-xs text-gray-500">{time}</p>
                </div>
            </div>
        </div>
        
        <div className="bg-gray-100 py-3 px-4">
             <div className="flex items-center text-green-700 font-semibold text-sm">
                <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
                <span>Pix realizado com sucesso!</span>
            </div>
        </div>

        <div className="bg-white p-4">
            <Section title="Dados do recebedor">
                <InfoRow label="Nome" value={data.nomeDestino} />
                <InfoRow label="CPF" value={formatarCPFCNPJ(data.cpfCnpjDestino)} />
                <InfoRow label="Instituição" value={data.instituicaoDestino} />
            </Section>

            <Section title="Dados do pagador">
                <InfoRow label="Nome" value={data.nomeOrigem} />
                <InfoRow label="CPF" value={formatarCPFCNPJ(data.cpfCnpjOrigem)} />
                <InfoRow label="Instituição" value={data.instituicaoOrigem} />
            </Section>

             <Section title="Dados da transação">
                <InfoRow label="Situação" value="Efetivado" />
                <InfoRow label="Valor" value={formatarNumero(data.valor)} />
                <InfoRow label="Data / Hora" value={full} />
                <InfoRow label="ID transação" value={data.idTransacao} />
                {data.codigoOperacao && <InfoRow label="Código da operação" value={data.codigoOperacao} />}
                {data.chaveSeguranca && <InfoRow label="Chave de segurança" value={data.chaveSeguranca} />}
                {data.chavePixDestino && <InfoRow label="Chave Pix" value={data.chavePixDestino} />}
            </Section>
            
            <div className="text-center mt-6 p-4 bg-gray-100 rounded text-sm text-gray-600">
                <p>Você poderá consultar futuramente essa e outras transações no item "Minhas Transações", opção "Consultas - Comprovantes".</p>
            </div>

            <div className="mt-6 pt-4 border-t border-gray-200 text-xs text-gray-500 space-y-2">
                <p>Caso tenha dúvidas ou não reconheça esta transação, entre em contato com o Alô CAIXA e informe o ID da Transação presente neste comprovante.</p>
                <p><strong>Alô CAIXA:</strong> 4004 0104 (Capitais e Regiões Metropolitanas)</p>
                <p><strong>Alô CAIXA:</strong> 0800 104 0 104 (Demais regiões)</p>
                <p><strong>SAC CAIXA:</strong> 0800 726 0101</p>
                <p><strong>Ouvidoria:</strong> 0800 725 7474</p>
            </div>
        </div>
    </div>
  );
};

export default CaixaReceipt;