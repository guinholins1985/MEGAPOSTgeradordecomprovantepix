import React, { useState, useRef } from 'react';
import { GoogleGenAI, Type } from "@google/genai";
import { Bank, TransactionData } from './types';
import PixForm from './components/PixForm';
import ReceiptContainer from './components/ReceiptContainer';
import DownloadControls from './components/DownloadControls';

function App() {
  const receiptRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState<TransactionData>({
    banco: Bank.Nubank,
    dataHora: new Date().toISOString(),
    valor: '100.00',
    nomeDestino: 'Maria da Silva',
    cpfCnpjDestino: '12345678900',
    instituicaoDestino: 'Banco do Brasil S.A.',
    agenciaDestino: '0001',
    contaDestino: '12345-6',
    chavePixDestino: 'maria.silva@email.com',
    nomeOrigem: 'João de Souza',
    cpfCnpjOrigem: '98765432100',
    instituicaoOrigem: 'Nu Pagamentos S.A.',
    agenciaOrigem: '0001',
    contaOrigem: '98765-4',
    idTransacao: 'E18236120202308011234ABCD1234EFG',
    codigoOperacao: '44958909764',
    chaveSeguranca: 'G3UV8481ROKEYGC8',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGeminiGenerate = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const ai = new GoogleGenAI({apiKey: process.env.API_KEY!});

      const prompt = `Gere dados para um comprovante de PIX. Use o valor aproximado de ${formData.valor} para a transação e o banco ${formData.banco}. Se o banco for Caixa, gere também um código de operação e chave de segurança.`;
      
      const responseSchema = {
          type: Type.OBJECT,
          properties: {
              valor: { type: Type.STRING, description: 'Valor da transação, ex: "123.45"' },
              nomeDestino: { type: Type.STRING, description: 'Nome completo do destinatário' },
              cpfCnpjDestino: { type: Type.STRING, description: 'CPF ou CNPJ do destinatário, apenas números' },
              instituicaoDestino: { type: Type.STRING, description: 'Instituição bancária do destinatário' },
              agenciaDestino: { type: Type.STRING, description: 'Agência do destinatário' },
              contaDestino: { type: Type.STRING, description: 'Conta do destinatário' },
              chavePixDestino: { type: Type.STRING, description: 'Chave Pix do destinatário (email, telefone, etc)' },
              nomeOrigem: { type: Type.STRING, description: 'Nome completo do remetente' },
              cpfCnpjOrigem: { type: Type.STRING, description: 'CPF ou CNPJ do remetente, apenas números' },
              instituicaoOrigem: { type: Type.STRING, description: 'Instituição bancária do remetente' },
              agenciaOrigem: { type: Type.STRING, description: 'Agência do remetente' },
              contaOrigem: { type: Type.STRING, description: 'Conta do remetente' },
              idTransacao: { type: Type.STRING, description: 'ID da transação no formato E... ou D...' },
              codigoOperacao: { type: Type.STRING, description: 'Código da operação (relevante para Caixa)' },
              chaveSeguranca: { type: Type.STRING, description: 'Chave de segurança (relevante para Caixa)' },
          },
          required: [
            "valor", "nomeDestino", "cpfCnpjDestino", "instituicaoDestino", "agenciaDestino", "contaDestino",
            "nomeOrigem", "cpfCnpjOrigem", "instituicaoOrigem", "agenciaOrigem", "contaOrigem", "idTransacao"
          ]
      };

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: responseSchema,
        },
      });

      const text = response.text;
      
      const generatedData = JSON.parse(text);

      setFormData(prev => ({
        ...prev,
        ...generatedData,
        dataHora: new Date().toISOString(),
      }));

    } catch (e) {
      console.error(e);
      setError('Falha ao gerar dados com a IA. Verifique sua chave de API e tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <div className="bg-gray-100 min-h-screen font-sans p-4 sm:p-8">
      <main className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 sm:p-8 rounded-xl shadow-lg">
          <header className="mb-8">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-center bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 pb-2">
              Gerador de Comprovante PIX
            </h1>
            <p className="text-gray-500 mt-2 text-center">
              Preencha os campos manualmente ou use a IA para gerar dados aleatórios e visualizar um modelo de comprovante.
            </p>
          </header>
          <PixForm 
            formData={formData} 
            setFormData={setFormData}
            onGeminiGenerate={handleGeminiGenerate}
            isLoading={isLoading}
          />
          {error && <p className="text-red-500 mt-4 text-sm">{error}</p>}
        </div>
        <div className="flex flex-col space-y-6">
          <ReceiptContainer formData={formData} ref={receiptRef} />
          <DownloadControls receiptRef={receiptRef} fileName={`comprovante-pix-${formData.nomeDestino.replace(/\s/g, '_')}`} />
        </div>
      </main>
      <footer className="text-center mt-12 text-gray-500 text-sm">
        <p>Este é um projeto de estudo e não deve ser utilizado para fins ilícitos.</p>
        <p>Os comprovantes gerados são modelos fictícios.</p>
      </footer>
    </div>
  );
}

export default App;