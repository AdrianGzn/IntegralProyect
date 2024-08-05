import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import Th from '../atoms/Th';
import { getId } from '../../data/userActual';
import Swal from 'sweetalert2';
import '@sweetalert2/theme-bulma';

function TableList({ data, headers }) {
  const [rows, setRows] = useState(data);
  const [editing, setEditing] = useState({ rowIndex: null, colIndex: null });
  const [pdfFileName, setPdfFileName] = useState(`pase_de_lista_${format(new Date(), 'ddMMyyyy')}.pdf`);
  const [pdfUrl, setPdfUrl] = useState('');
  const [checkedCells, setCheckedCells] = useState(new Map());
  const [updateStatus, setUpdateStatus] = useState(null);

  useEffect(() => {
    setRows(data);
  }, [data]);

  useEffect(() => {
    if (updateStatus === 'success') {
      Swal.fire({
        title: "Generar lista de asistencia",
        text: "Se logró generar pase de lista",
        icon: "success"
      });
      setUpdateStatus(null);
    } else if (updateStatus === 'error') {
      Swal.fire({
        title: "Error",
        text: "Ocurrió un error al actualizar la asistencia",
        icon: "error"
      });
      setUpdateStatus(null);
    }
  }, [updateStatus]);

  const handleCellClick = (rowIndex, colIndex) => {
    setEditing({ rowIndex, colIndex });

    if (colIndex === headers.length - 1) {
      const cellKey = `${rowIndex}-${colIndex}`;
      setCheckedCells(prevChecked => {
        const newChecked = new Map(prevChecked);
        const isChecked = newChecked.get(cellKey) || false;
        newChecked.set(cellKey, !isChecked);
        return newChecked;
      });
    }
  };

  const updateAttendance = async () => {
    try {
      const alumnosData = rows.map(row => ({
        alumn_id: row.col1,
        name: row.col2,
        lastName: row.col3
      }));

      const attendanceData = rows.map((row, rowIndex) => {
        const cellKey = `${rowIndex}-${headers.length - 1}`;
        const isChecked = checkedCells.get(cellKey) || false;

        return {
          alumn_id: row.col1,
          attended: isChecked
        };
      });

      const response = await fetch(`${import.meta.env.VITE_URL}/personal/${getId()}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          personalData: {
            created_by: "teacher",
            updated_by: "teacher",
          },
          alumnos: alumnosData,
          asistencia: attendanceData
        })
      });

      if (response.ok) {
        setUpdateStatus('success');
      } else {
        throw new Error('Error updating attendance.');
      }
    } catch (error) {
      console.error('Error updating attendance:', error);
      setUpdateStatus('error');
    }
  };

  return (
    <div className="flex flex-col">
      <div id="table-container" className="flex-grow">
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
                {headers.map((_, colIndex) => (
                  <td
                    key={colIndex}
                    className={`px-4 py-4 whitespace-nowrap border-r border-gray-300 ${editing.rowIndex === rowIndex && editing.colIndex === colIndex ? 'bg-gray-100' : ''}`}
                    onClick={() => handleCellClick(rowIndex, colIndex)}
                  >
                    {colIndex === headers.length - 1 ? (
                      checkedCells.get(`${rowIndex}-${colIndex}`) ? (
                        <span className="text-green-500">✔</span>
                      ) : (
                        ''
                      )
                    ) : (
                      row[`col${colIndex + 1}`] || ''
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button
        onClick={updateAttendance}
        className="bg-green-600 text-white p-3 rounded mt-4 hover:bg-green-700 transition-colors font-bold shadow-lg"
      >
        Actualizar Asistencia
      </button>
    </div>
  );
}

export default TableList;
