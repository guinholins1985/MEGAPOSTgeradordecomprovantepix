import React, { useState } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

interface DownloadControlsProps {
  receiptRef: React.RefObject<HTMLDivElement>;
  fileName: string;
}

const DownloadControls: React.FC<DownloadControlsProps> = ({ receiptRef, fileName }) => {
  const [isDownloading, setIsDownloading] = useState<null | 'jpg' | 'png' | 'pdf'>(null);

  const handleDownloadImage = async (format: 'jpg' | 'png') => {
    const element = receiptRef.current;
    if (!element) return;

    setIsDownloading(format);

    try {
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#ffffff', // Set a solid background for JPG compatibility
      });
      
      const mimeType = format === 'jpg' ? 'image/jpeg' : 'image/png';
      const image = canvas.toDataURL(mimeType, 0.95); // 0.95 quality for jpeg
      
      const link = document.createElement('a');
      link.href = image;
      link.download = `${fileName}.${format}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

    } catch (error) {
      console.error(`Error generating ${format}:`, error);
      alert(`An error occurred while generating the ${format.toUpperCase()}. Please try again.`);
    } finally {
        setIsDownloading(null);
    }
  };

  const handleDownloadPdf = async () => {
    const element = receiptRef.current;
    if (!element) return;

    setIsDownloading('pdf');

    try {
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#ffffff',
      });
      
      const imgData = canvas.toDataURL('image/png');
      
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      
      const ratio = imgWidth / imgHeight;
      let newImgWidth = pdfWidth - 20; // with 10mm margin on each side
      let newImgHeight = newImgWidth / ratio;
      
      if (newImgHeight > pdfHeight - 20) {
        newImgHeight = pdfHeight - 20;
        newImgWidth = newImgHeight * ratio;
      }
      
      const x = (pdfWidth - newImgWidth) / 2;
      const y = (pdfHeight - newImgHeight) / 2;
      
      pdf.addImage(imgData, 'PNG', x, y, newImgWidth, newImgHeight);
      pdf.save(`${fileName}.pdf`);

    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('An error occurred while generating the PDF. Please try again.');
    } finally {
      setIsDownloading(null);
    }
  };

  const Button: React.FC<{ format: 'jpg' | 'png' | 'pdf' }> = ({ format }) => {
    const isThisOneDownloading = isDownloading === format;
    
    const getStyle = () => {
        switch(format) {
            case 'jpg': return 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500';
            case 'png': return 'bg-green-600 text-white hover:bg-green-700 focus:ring-green-500';
            case 'pdf': return 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500';
        }
    }

    const handleClick = () => {
        if(format === 'pdf') {
            handleDownloadPdf();
        } else {
            handleDownloadImage(format);
        }
    }

    return (
      <button
        onClick={handleClick}
        disabled={!!isDownloading}
        className={`w-full font-bold py-3 px-6 rounded-lg shadow-md transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-opacity-50 ${getStyle()} disabled:bg-gray-400 disabled:cursor-not-allowed`}
      >
        {isThisOneDownloading ? `Baixando ${format.toUpperCase()}...` : `Baixar como ${format.toUpperCase()}`}
      </button>
    );
  };


  return (
    <div className="bg-white p-6 rounded-xl shadow-lg flex flex-col sm:flex-row gap-4">
        <Button format="jpg" />
        <Button format="png" />
        <Button format="pdf" />
    </div>
  );
};

export default DownloadControls;
