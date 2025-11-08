import React from 'react';
import { Bank, TransactionData } from '../types';

interface PixFormProps {
  formData: TransactionData;
  setFormData: React.Dispatch<React.SetStateAction<TransactionData>>;
  onGeminiGenerate: () => void;
  isLoading: boolean;
}

const PixForm: React.FC<PixFormProps> = ({ formData, setFormData, onGeminiGenerate, isLoading }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const Input: React.FC<{name: keyof TransactionData, label: string}> = ({ name, label }) => (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <input
        type="text"
        id={name}
        name={name}
        value={formData[name] as string || ''}
        onChange={handleChange}
        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
      />
    </div>
  );

  const Section: React.FC<{title: string, children: React.ReactNode}> = ({ title, children }) => (
    <div className="mt-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">{title}</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">{children}</div>
    </div>
  );

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="banco" className="block text-sm font-medium text-gray-700 mb-1">Banco</label>
          <select
            id="banco"
            name="banco"
            value={formData.banco}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            {Object.values(Bank).map(bank => (
              <option key={bank} value={bank}>{bank}</option>
            ))}
          </select>
        </div>
        <Input name="valor" label="Valor (ex: 123.45)" />
      </div>

      <Section title="Destino">
        <Input name="nomeDestino" label="Nome" />
        <Input name="cpfCnpjDestino" label="CPF/CNPJ (apenas números)" />
        <Input name="instituicaoDestino" label="Instituição" />
        <Input name="agenciaDestino" label="Agência" />
        <Input name="contaDestino" label="Conta" />
        <Input name="chavePixDestino" label="Chave Pix" />
      </Section>
      
      <Section title="Origem">
        <Input name="nomeOrigem" label="Nome" />
        <Input name="cpfCnpjOrigem" label="CPF/CNPJ (apenas números)" />
        <Input name="instituicaoOrigem" label="Instituição" />
        <Input name="agenciaOrigem" label="Agência" />
        <Input name="contaOrigem" label="Conta" />
      </Section>

      <div className="mt-6">
        <Input name="idTransacao" label="ID da Transação" />
      </div>

      {formData.banco === Bank.Caixa && (
        <Section title="Dados Adicionais (Caixa)">
          <Input name="codigoOperacao" label="Código da Operação" />
          <Input name="chaveSeguranca" label="Chave de Segurança" />
        </Section>
      )}
      
      <div className="mt-8">
        <button
          type="button"
          onClick={onGeminiGenerate}
          disabled={isLoading}
          className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-gray-400"
        >
          {isLoading ? 'Gerando...' : 'Preencher com IA ✨'}
        </button>
      </div>
    </form>
  );
};

export default PixForm;
