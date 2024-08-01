import React from 'react';
import pdfIcon from '../../../public/icon_pdf.png';

function SectionBallot({ newPDFs, pdfUrlForRole }) {
  return (
    <div className="min-h-[60%] w-full overflow-x-hidden flex flex-wrap items-center gap-6 p-10 bg-slate-800">
      {pdfUrlForRole && (
        <div className="mb-8 p-6 bg-white rounded-lg shadow-xl w-full max-w-4xl mx-auto border border-gray-300">
          <p className="text-lg font-semibold mb-3 text-gray-800">Lista de asistencia:</p>
          <a
            href={pdfUrlForRole}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline hover:text-blue-800 transition-colors"
          >
            View PDF
          </a>
        </div>
      )}
      {newPDFs.length === 0 && !pdfUrlForRole ? (
        <p className="text-white text-lg font-medium">No se ha asignado ninguna lista de asistencia</p>
      ) : (
        newPDFs.map((pdf, index) => {
          if (!pdf || !pdf.url) {
            return null;
          }
          const fileName = pdf.url.split('/').pop();
          const alumnId = pdf.alumn_id ? pdf.alumn_id.toString() : '';

          return (
            <div 
              key={pdf.alumn_id || index} 
              className="flex flex-col items-center gap-4 bg-white p-6 rounded-lg shadow-lg border border-gray-200 transition-transform transform hover:scale-105"
            >
              <a
                href={pdf.url}
                download={fileName} 
                title={`Download ${fileName}`}
                className="flex items-center gap-3 hover:bg-gray-100 p-3 rounded-lg transition-colors"
              >
                <img 
                  src={pdfIcon} 
                  alt="PDF Icon" 
                  className="w-12 h-12" 
                />
                <span className="text-base text-blue-700 font-semibold">{fileName}</span>
              </a>
            </div>
          );
        })
      )}
    </div>
  );
}

export default SectionBallot;
