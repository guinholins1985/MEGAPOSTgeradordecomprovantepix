import React, { useState } from 'react';
import html2canvas from 'html2canvas';

interface DownloadControlsProps {
  receiptRef: React.RefObject<HTMLDivElement>;
  fileName: string;
}

const DownloadControls: React.FC<DownloadControlsProps> = ({ receiptRef, fileName }) => {
  const [isDownloading, setIsDownloading] = useState<null | 'jpg' | 'png'>(null);

  const handleDownload = async (format: 'jpg' | 'png') => {
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

  const Button: React.FC<{ format: 'jpg' | 'png' }> = ({ format }) => {
    const isThisOneDownloading = isDownloading === format;
    return (
      <button
        onClick={() => handleDownload(format)}
        disabled={!!isDownloading}
        className={`w-full font-bold py-3 px-6 rounded-lg shadow-md transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-opacity-50 ${
            format === 'jpg' 
            ? 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500' 
            : 'bg-green-600 text-white hover:bg-green-700 focus:ring-green-500'
        } disabled:bg-gray-400 disabled:cursor-not-allowed`}
      >
        {isThisOneDownloading ? `Baixando ${format.toUpperCase()}...` : `Baixar como ${format.toUpperCase()}`}
      </button>
    );
  };


  return (
    <div className="bg-white p-6 rounded-xl shadow-lg flex flex-col sm:flex-row gap-4">
        <Button format="jpg" />
        <Button format="png" />
    </div>
  );
};

export default DownloadControls;
