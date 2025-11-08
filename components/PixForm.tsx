import React, { useState } from 'react';
import { Bank, TransactionData } from '../types';
import { parseValor } from '../utils';

interface PixFormProps {
  formData: TransactionData;
  setFormData: React.Dispatch<React.SetStateAction<TransactionData>>;
  onGeminiGenerate: () => void;
  isLoading: boolean;
}

// Moved Input and Section outside of PixForm to prevent re-creation on every render,
// which caused focus loss and prevented typing.

interface InputProps {
  name: keyof TransactionData;
  label: string;
  formData: TransactionData;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string | null;
}

const Input: React.FC<InputProps> = ({ name, label, formData, handleChange, error }) => (
  <div>
    <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
    <input
      type="text"
      id={name}
      name={name}
      value={formData[name] as string || ''}
      onChange={handleChange}
      className={`w-full px-3 py-2 border rounded-md shadow-sm sm:text-sm ${error ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-indigo-500 focus:border-indigo-500'}`}
      aria-invalid={!!error}
      aria-describedby={error ? `${name}-error` : undefined}
    />
    {error && <p id={`${name}-error`} className="mt-1 text-sm text-red-600">{error}</p>}
  </div>
);

const Section: React.FC<{title: string, children: React.ReactNode}> = ({ title, children }) => (
  <div className="mt-6">
    <h3 className="text-lg font-semibold text-gray-800 mb-4">{title}</h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">{children}</div>
  </div>
);

const bankInstitutionMap: Record<Bank, string> = {
    [Bank.Nubank]: 'Nu Pagamentos S.A.',
    [Bank.PicPay]: 'PicPay Instituição de Pagamento S.A.',
    [Bank.Santander]: 'Banco Santander (Brasil) S.A.',
    [Bank.Caixa]: 'Caixa Econômica Federal',
};

const brazilianBanks = [
    'Nu Pagamentos S.A.',
    'PicPay Instituição de Pagamento S.A.',
    'Banco Santander (Brasil) S.A.',
    'Caixa Econômica Federal',
    'Banco do Brasil S.A.',
    'Banco Bradesco S.A.',
    'Itaú Unibanco S.A.',
    'Banco Inter S.A.',
    'C6 Bank S.A.',
    'Mercado Pago - Inst. de Pagamento Ltda.',
];


const PixForm: React.FC<PixFormProps> = ({ formData, setFormData, onGeminiGenerate, isLoading }) => {
  const [valorError, setValorError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    if (name === 'valor') {
        const numericValue = parseValor(value);
        if (!isNaN(numericValue) && numericValue > 100000) {
            setValorError('O valor máximo permitido é de R$ 100.000,00.');
        } else {
            setValorError(null);
        }
    }
    
    setFormData(prev => {
        const newState = { ...prev, [name]: value };
        
        // If bank changed, also update destination institution
        if (name === 'banco') {
            newState.instituicaoDestino = bankInstitutionMap[value as Bank];
        }
        
        return newState;
    });
  };

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
        <Input name="valor" label="Valor (ex: 123.45)" error={valorError} formData={formData} handleChange={handleChange as any} />
      </div>

      <Section title="Destino">
        <Input name="nomeDestino" label="Nome" formData={formData} handleChange={handleChange as any} />
        <Input name="cpfCnpjDestino" label="CPF/CNPJ (apenas números)" formData={formData} handleChange={handleChange as any} />
        <Input name="instituicaoDestino" label="Instituição" formData={formData} handleChange={handleChange as any} />
        <Input name="agenciaDestino" label="Agência" formData={formData} handleChange={handleChange as any} />
        <Input name="contaDestino" label="Conta" formData={formData} handleChange={handleChange as any} />
        <Input name="chavePixDestino" label="Chave Pix" formData={formData} handleChange={handleChange as any} />
      </Section>
      
      <Section title="Origem">
        <Input name="nomeOrigem" label="Nome" formData={formData} handleChange={handleChange as any} />
        <Input name="cpfCnpjOrigem" label="CPF/CNPJ (apenas números)" formData={formData} handleChange={handleChange as any} />
        <div>
            <label htmlFor="instituicaoOrigem" className="block text-sm font-medium text-gray-700 mb-1">Instituição</label>
            <select
                id="instituicaoOrigem"
                name="instituicaoOrigem"
                value={formData.instituicaoOrigem}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
                {brazilianBanks.map(bank => (
                    <option key={bank} value={bank}>{bank}</option>
                ))}
            </select>
        </div>
        <Input name="agenciaOrigem" label="Agência" formData={formData} handleChange={handleChange as any} />
        <Input name="contaOrigem" label="Conta" formData={formData} handleChange={handleChange as any} />
      </Section>

      <div className="mt-6">
        <Input name="idTransacao" label="ID da Transação" formData={formData} handleChange={handleChange as any} />
      </div>

      {formData.banco === Bank.Caixa && (
        <Section title="Dados Adicionais (Caixa)">
          <Input name="codigoOperacao" label="Código da Operação" formData={formData} handleChange={handleChange as any} />
          <Input name="chaveSeguranca" label="Chave de Segurança" formData={formData} handleChange={handleChange as any} />
        </Section>
      )}
      
      <div className="mt-8">
        <button
          type="button"
          onClick={onGeminiGenerate}
          disabled={isLoading || !!valorError}
          className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Gerando...' : 'Preencher com IA ✨'}
        </button>
      </div>
    </form>
  );
};

export default PixForm;