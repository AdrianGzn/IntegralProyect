import React, { useState, useEffect } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { format } from 'date-fns';
import Th from '../atoms/Th';
import debounce from 'lodash/debounce'; 
import { getId } from '../../data/userActual';

function TableQualification({ data, size, headers }) {
  const [rows, setRows] = useState(data);
  const [matricula, setMatricula] = useState('');
  const [filalumns, setFilalumns] = useState([]);
  const [foundAlumns, setFoundAlumns] = useState([]);

  useEffect(() => {
    const fetchFoundAlumns = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_URL}/personal`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
        });

        if (!response.ok) {
          throw new Error('La respuesta no es ok.');
        }

        const fetchedData = await response.json();
        console.log('Fetched personal data:', fetchedData);

        let alumns = [];
        for (let i = 0; i < fetchedData.length; i++) {
          if (fetchedData[i].personal_id == getId()) {
            alumns = Array.isArray(fetchedData[i].alumns) ? fetchedData[i].alumns : [];
            break;
          }
        }

        setFoundAlumns(alumns);
        console.log('Found alumns:', alumns);

      } catch (error) {
        console.log("Ha ocurrido un error: " + error);
        setFoundAlumns([]);
      }
    };

    fetchFoundAlumns();
  }, []);

  useEffect(() => {
    console.log('filalumns:', filalumns);
    console.log('foundAlumns:', foundAlumns);

    // Verifica que ambos sean arrays antes de proceder
    const isFilalumnsArray = Array.isArray(filalumns);
    const isFoundAlumnsArray = Array.isArray(foundAlumns);

    if (isFilalumnsArray && isFoundAlumnsArray) {
      const filteredAlumns = filalumns.filter(alumn =>
        foundAlumns.some(foundAlumn => foundAlumn.alumn_id === alumn.alumn_id)
      );

      console.log('Filtered Alumns:', filteredAlumns);

      const mappedData = filteredAlumns.map(alumn => ({
        col1: alumn.alumn_id,
        col2: alumn.name,
        col3: alumn.lastName,
        col4: alumn.espanol || 0,
        col5: alumn.matematicas || 0,
        col6: alumn.ciencias || 0,
        col7: alumn.averageAmount || 0
      }));

      console.log('Mapped Data:', mappedData);
      setRows(mappedData);
    } else {
      console.log("filalumns o foundAlumns no es un array.");
      setRows([]); // Limpia la tabla si los datos no están en el formato esperado
    }

  }, [filalumns, foundAlumns]);

  const searchNumberList = async () => {
    if (!matricula) {
      setFilalumns([]);
      return;
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_URL}/alumn/${matricula}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('La respuesta no es ok.');
      }

      const fetchedData = await response.json();
      console.log('Fetched filalumns data:', fetchedData);
      setFilalumns(Array.isArray(fetchedData) ? fetchedData : []);

    } catch (error) {
      console.log("Ha ocurrido un error: " + error);
      setFilalumns([]);
    }
  };

  const debouncedSearch = debounce(searchNumberList, 500);

  useEffect(() => {
    debouncedSearch();
  }, [matricula]);

  const generatePDF = () => {
    const input = document.getElementById('table-container');
    const currentDate = new Date();
    const formattedDate = format(currentDate, 'dd/MM/yyyy HH:mm:ss');

    html2canvas(input)
      .then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF();
        const imgWidth = 210;
        const pageHeight = 500;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        let heightLeft = imgHeight;
        let position = 0;

        pdf.text(`Fecha: ${formattedDate}`, 10, 10);
        pdf.text(`Matrícula: ${matricula}`, 10, 20); // Añade la matrícula al PDF
        position = 30; // Ajusta la posición para dejar espacio para la matrícula
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
        URL.revokeObjectURL(url);
      })
      .catch(error => {
        console.error('Error generando el PDF:', error);
      });
  };

  return (
    <div>
      <div className="mb-4">
        <label htmlFor="número de lista" className="block text-gray-700 font-bold mb-2">Número de lista</label>
        <input
          id="número de lista"
          type="text"
          value={matricula}
          onChange={(e) => setMatricula(e.target.value)}
          className="border border-gray-300 p-2 rounded w-full"
          placeholder="Ingrese número de lista"
        />
      </div>
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
                    className="px-4 py-4 whitespace-nowrap border-r border-gray-300"
                  >
                    {row[`col${colIndex + 1}`] || ''}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button
        onClick={generatePDF}
        className="bg-green-600 text-white p-3 rounded mt-4 hover:bg-green-700 transition-colors font-bold shadow-lg"
      >
        Descargar
      </button>
    </div>
  );
}

export default TableQualification;
