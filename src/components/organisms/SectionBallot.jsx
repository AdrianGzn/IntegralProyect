import React from "react";
import pdfIcon from "../../../public/icon_pdf.png";

function SectionBallot({ newPDFs }) {
  return (
    <div className="min-h-[60%] w-full overflow-x-hidden flex flex-wrap items-center gap-6 p-10">
      {newPDFs.length === 0 ? (
        <p className="text-white text-lg">No PDFs available</p>
      ) : (
        newPDFs.map((pdfUrl, index) => {
          if (!pdfUrl || !pdfUrl.url) {
            return null; 
          }
          const fileName = pdfUrl.url.split('/').pop();

          return (
            <div key={index} className="flex flex-col items-center gap-4 bg-white p-4 rounded-lg shadow-lg border border-gray-200">
              <a
                href={pdfUrl.url}
                download={fileName} 
                title="Download PDF"
                className="flex items-center gap-2 hover:bg-gray-100 p-2 rounded transition-colors"
              >
                <img 
                  src={pdfIcon} 
                  alt="PDF Icon" 
                  className="w-10 h-10" 
                />
                <span className="text-base text-blue-600 font-medium">{fileName}</span>
              </a>
              <p className="text-sm text-gray-700">Matrícula: {pdfUrl.alumn_id}</p>
            </div>
          );
        })
      )}
    </div>
  );
}

export default SectionBallot;
