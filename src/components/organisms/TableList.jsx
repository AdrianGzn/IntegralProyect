import React, { useState, useEffect } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { format } from 'date-fns';
import Th from '../atoms/Th';

function TableList({ data, size, headers }) {
  const [rows, setRows] = useState(data);
  const [editing, setEditing] = useState({ rowIndex: null, colIndex: null });
  const [checkedCells, setCheckedCells] = useState(new Set());
  const [pdfFileName, setPdfFileName] = useState(`pase_de_lista_${format(new Date(), 'ddMMyyyy')}.pdf`);
  const [pdfUrl, setPdfUrl] = useState('');

  useEffect(() => {
    setRows(data);
  }, [data]);

  const handleCellClick = (rowIndex, colIndex) => {
    setEditing({ rowIndex, colIndex });
    if (colIndex === size - 1) {
      const cellKey = `${rowIndex}-${colIndex}`;
      setCheckedCells((prevChecked) => {
        const newChecked = new Set(prevChecked);
        if (newChecked.has(cellKey)) {
          newChecked.delete(cellKey);
        } else {
          newChecked.add(cellKey);
        }
        return newChecked;
      });
    }
  };

  const handleCellChange = (e, rowIndex, colIndex) => {
    const newRows = [...rows];
    if (newRows[rowIndex][`col${colIndex + 1}`] === '') {
      newRows[rowIndex][`col${colIndex + 1}`] = e.target.value;
    }
    setRows(newRows);
  };

  const handleCellBlur = () => {
    setEditing({ rowIndex: null, colIndex: null });
  };

  const generatePDF = async () => {
    const input = document.getElementById('table-container');
    const currentDate = new Date();
    const formattedDate = format(currentDate, 'dd/MM/yyyy HH:mm:ss');

    try {
      const canvas = await html2canvas(input);
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      const imgWidth = 210;
      const pageHeight = 500;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;

      pdf.text(`Fecha: ${formattedDate}`, 10, 10);
      position = 20; // Deja un poco de espacio para la fecha
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      // Convertir el PDF a una cadena Base64
      const pdfOutput = pdf.output('arraybuffer');
      const base64String = btoa(
        new Uint8Array(pdfOutput).reduce((data, byte) => data + String.fromCharCode(byte), '')
      );

      const jsonData = {
        personalData: {
          updated_by: "teacher",
          url: base64String,
        }
      };

      // Enviar la solicitud PUT con el JSON
      const updateResponse = await fetch(`${import.meta.env.VITE_URL}/personal/${10}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(jsonData),
      });

      if (!updateResponse.ok) {
        throw new Error('Error updating personal data');
      }

      const updateData = await updateResponse.json();
      setPdfUrl(updateData.fileUrl); 
      const link = document.createElement('a');
      link.href = updateData.fileUrl; // Suponiendo que esta es la URL del archivo
      link.download = pdfFileName;
      link.click();

    } catch (error) {
      console.error('Error generando el PDF:', error);
    }
  };

  const readFileAsBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(btoa(reader.result));
      reader.onerror = (error) => reject(error);
    });
  };

  return (
    <div>
      <div id="table-container">
        <table className="min-w-full divide-y divide-gray-300 bg-white shadow-md rounded-md border border-gray-300">
          <thead className="bg-gray-600 text-white">
            <tr>
              {headers.map((header, index) => (
                <Th key={index} text={header} />
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-300">
            {rows.map((row, rowIndex) => (
              <tr key={rowIndex} className="hover:bg-gray-100 transition-colors">
                {[...Array(size).keys()].map((_, colIndex) => (
                  <td
                    key={colIndex}
                    className={`px-4 py-4 whitespace-nowrap border-r border-gray-300 ${editing.rowIndex === rowIndex && editing.colIndex === colIndex ? 'bg-gray-100' : ''}`}
                    onClick={() => handleCellClick(rowIndex, colIndex)}
                  >
                    {colIndex === size - 1 && checkedCells.has(`${rowIndex}-${colIndex}`) ? (
                      <span className="text-green-500">✔</span>
                    ) : (
                      row[`col${colIndex + 1}`]
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button
        onClick={generatePDF}
        className="bg-blue-600 text-white p-3 rounded mb-4 hover:bg-blue-700 transition-colors font-bold shadow-lg"
      >
        Generar PDF y Actualizar Datos
      </button>
      {pdfUrl && (
        <div>
          <h2>Visualizar PDF:</h2>
          <iframe
            src={pdfUrl}
            style={{ width: '100%', height: '600px' }}
            frameBorder="0"
          />
          <a href={pdfUrl} download={pdfFileName} className="mt-4 block text-blue-600 hover:underline">
            Descargar PDF
          </a>
        </div>
      )}
    </div>
  );
}

export default TableList;
