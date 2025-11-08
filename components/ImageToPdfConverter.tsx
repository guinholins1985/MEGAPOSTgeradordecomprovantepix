import React from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

interface ImageToPdfConverterProps {
  receiptRef: React.RefObject<HTMLDivElement>;
  fileName: string;
}

const ImageToPdfConverter: React.FC<ImageToPdfConverterProps> = ({ receiptRef, fileName }) => {
  const handleDownload = async () => {
    const element = receiptRef.current;
    if (!element) return;

    try {
      const canvas = await html2canvas(element, {
        scale: 2, // Increases resolution for better quality
        useCORS: true,
        backgroundColor: null // Uses the element's background
      });
      
      const imgData = canvas.toDataURL('image/png');
      
      // A4 page is 210mm x 297mm
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      
      const ratio = imgWidth / imgHeight;
      let newImgWidth = pdfWidth - 20; // with margin
      let newImgHeight = newImgWidth / ratio;
      
      // If image height is greater than PDF height, recalculate based on height
      if (newImgHeight > pdfHeight - 20) { // with margin
        newImgHeight = pdfHeight - 20;
        newImgWidth = newImgHeight * ratio;
      }
      
      // Center the image
      const x = (pdfWidth - newImgWidth) / 2;
      const y = (pdfHeight - newImgHeight) / 2;
      
      pdf.addImage(imgData, 'PNG', x, y, newImgWidth, newImgHeight);
      pdf.save(fileName);

    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('An error occurred while generating the PDF. Please try again.');
    }
  };

  return (
    <div className="text-center">
      <button
        onClick={handleDownload}
        className="w-full bg-green-600 text-white font-bold py-3 px-6 rounded-lg shadow-md hover:bg-green-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
      >
        Download Receipt (PDF)
      </button>
    </div>
  );
};

export default ImageToPdfConverter;
