import React, { useState, useEffect } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { format } from 'date-fns';
import Th from '../atoms/Th';

function TableSelect({ data, size, headers, onBlur, className }) {
    const [rows, setRows] = useState(data);
    const [editing, setEditing] = useState({ rowIndex: null, colIndex: null });
    const [selectedCells, setSelectedCells] = useState({}); // Para manejar la selección de celdas

    useEffect(() => {
        setRows(data);
    }, [data]);

    const handleCellClick = (rowIndex, colIndex) => {
        if (colIndex === 2) { // Solo para la tercera columna (índice basado en 0)
            const key = `${rowIndex}-${colIndex}`;
            setSelectedCells(prevState => ({
                ...prevState,
                [key]: !prevState[key] // Alternar selección
            }));
        } else {
            setEditing({ rowIndex, colIndex });
        }
    };

    const handleCellChange = (e, rowIndex, colIndex) => {
        const newRows = [...rows];
        newRows[rowIndex][`col${colIndex + 1}`] = e.target.value;
        setRows(newRows);
    };

    const handleCellBlur = (rowIndex, colIndex) => {
        const newValue = rows[rowIndex][`col${colIndex + 1}`];
        setEditing({ rowIndex: null, colIndex: null });
        onBlur(rowIndex, colIndex, newValue);
    };

    const generatePDF = () => {
        const input = document.getElementById('table-container');
        const currentDate = new Date();
        const formattedDate = format(currentDate, 'dd/MM/yyyy HH:mm:ss');

        html2canvas(input)
            .then((canvas) => {
                const imgData = canvas.toDataURL('image/png');
                const pdf = new jsPDF();
                const imgWidth = 210;
                const pageHeight = 295; // Altura de la página en mm
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
                pdf.save('table.pdf'); // Guarda el PDF
            })
            .catch((error) => {
                console.error('Error generando el PDF:', error);
            });
    };

    return (
        <div>
            <div id="table-container">
                <div className="mb-4 text-lg font-semibold">{className}</div>
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
                                        className={`px-4 py-4 whitespace-nowrap border-r border-gray-300 ${
                                            editing.rowIndex === rowIndex && editing.colIndex === colIndex ? 'bg-gray-100' : ''
                                        }`}
                                        onClick={() => handleCellClick(rowIndex, colIndex)}
                                    >
                                        {colIndex === 0 ? (
                                            row.col1
                                        ) : (
                                            colIndex === 2 ? (
                                                selectedCells[`${rowIndex}-${colIndex}`] ? 'X' : row[`col${colIndex + 1}`] || ''
                                            ) : (
                                                editing.rowIndex === rowIndex && editing.colIndex === colIndex ? (
                                                    <input
                                                        type="text"
                                                        value={row[`col${colIndex + 1}`] || ''}
                                                        onChange={(e) => handleCellChange(e, rowIndex, colIndex)}
                                                        onBlur={() => handleCellBlur(rowIndex, colIndex)}
                                                        autoFocus
                                                        className="w-full border border-gray-300 rounded px-2 py-1"
                                                    />
                                                ) : (
                                                    row[`col${colIndex + 1}`] || ''
                                                )
                                            )
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
                className="mt-4 bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition-colors font-bold shadow-lg"
            >
                Descargar alumnos generales
            </button>
        </div>
    );
}

export default TableSelect;
