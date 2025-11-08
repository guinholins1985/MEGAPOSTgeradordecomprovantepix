import React, { forwardRef } from 'react';
import { Bank, TransactionData } from '../types';
import NubankReceipt from './receipts/NubankReceipt';
import PicPayReceipt from './receipts/PicPayReceipt';
import SantanderReceipt from './receipts/SantanderReceipt';
import CaixaReceipt from './receipts/CaixaReceipt';

interface ReceiptContainerProps {
  formData: TransactionData;
}

const ReceiptContainer = forwardRef<HTMLDivElement, ReceiptContainerProps>(({ formData }, ref) => {
  const renderReceipt = () => {
    switch (formData.banco) {
      case Bank.Nubank:
        return <NubankReceipt data={formData} />;
      case Bank.PicPay:
        return <PicPayReceipt data={formData} />;
      case Bank.Santander:
        return <SantanderReceipt data={formData} />;
      case Bank.Caixa:
        return <CaixaReceipt data={formData} />;
      default:
        return <div className="text-center p-8 bg-white rounded-lg shadow">Selecione um banco para ver o comprovante.</div>;
    }
  };

  return (
    <div ref={ref} className="bg-white rounded-xl shadow-lg">
      {renderReceipt()}
    </div>
  );
});

ReceiptContainer.displayName = 'ReceiptContainer';
export default ReceiptContainer;
