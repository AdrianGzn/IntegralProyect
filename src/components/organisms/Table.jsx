import React, { useState } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

function Table({ data }) {
  const [rows, setRows] = useState(data);
  const [editing, setEditing] = useState({ rowIndex: null, colIndex: null });

  const handleCellClick = (rowIndex, colIndex) => {
    setEditing({ rowIndex, colIndex });
  };

  const handleCellChange = (e, rowIndex, colIndex) => {
    const newRows = [...rows];
    newRows[rowIndex][`column${colIndex + 1}`] = e.target.value;
    setRows(newRows);
  };

  const handleCellBlur = () => {
    setEditing({ rowIndex: null, colIndex: null });
  };

  const generatePDF = () => {
    const input = document.getElementById('table-container');
    
    html2canvas(input)
      .then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF();
        const imgWidth = 210; 
        const pageHeight = 500;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        let heightLeft = imgHeight;
        let position = 0;

        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;

        while (heightLeft >= 0) {
          position = heightLeft - imgHeight;
          pdf.addPage();
          pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
          heightLeft -= pageHeight;
        }
        const pdfOutput = pdf.output('blob');
        const url = URL.createObjectURL(pdfOutput);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'table.pdf';
        link.click();
        const urlNew =  URL.revokeObjectURL(url);
      })
      .catch(error => {
        console.error('Error generando la boleta:', error);
      });
  };

  return (
    <div>
      <button
        onClick={generatePDF}
        className="bg-blue-600 text-white p-3 rounded mb-4 hover:bg-blue-700 transition-colors font-bold shadow-lg"
      >
        Generar PDF
      </button>
      <div id="table-container">
        <table className="min-w-full divide-y divide-gray-300 bg-white shadow-md rounded-md border border-gray-300">
          <thead className="bg-gray-600 text-white">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider border-r border-gray-300">Column 1</th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider border-r border-gray-300">Column 2</th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider border-r border-gray-300">Column 3</th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider border-r border-gray-300">Column 4</th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider border-r border-gray-300">Column 5</th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider border-r border-gray-300">Column 6</th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider">Column 7</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-300">
            {rows.map((row, rowIndex) => (
              <tr key={rowIndex} className="hover:bg-gray-100 transition-colors">
                {[...Array(7).keys()].map((_, colIndex) => (
                  <td
                    key={colIndex}
                    className={`px-4 py-4 whitespace-nowrap border-r border-gray-300 ${editing.rowIndex === rowIndex && editing.colIndex === colIndex ? 'bg-gray-100' : ''}`}
                    onClick={() => handleCellClick(rowIndex, colIndex)}
                  >
                    {editing.rowIndex === rowIndex && editing.colIndex === colIndex ? (
                      <input
                        type="text"
                        value={row[`column${colIndex + 1}`]}
                        onChange={(e) => handleCellChange(e, rowIndex, colIndex)}
                        onBlur={handleCellBlur}
                        autoFocus
                        className="w-[60%] border border-gray-300 rounded px-2 py-1"
                      />
                    ) : (
                      row[`column${colIndex + 1}`]
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Table;
