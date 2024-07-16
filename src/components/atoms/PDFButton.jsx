import React from 'react';

function PDFButton(props) {
  return (
    <button className="flex items-center px-4 py-2 bg-slate-700 text-white font-semibold rounded-lg hover:bg-slate-500">
      <img src="../../public/icon_pdf.png" alt="Icon" className="w-5 h-5 mr-2" />
      {props.title}
    </button>
  );
}

export default PDFButton;
