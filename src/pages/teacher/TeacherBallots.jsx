import React, { useState, useEffect } from 'react';
import Header from '../../components/organisms/Header';
import SearchBallotSection from '../../components/organisms/SearchBallotSection';
import Swal from 'sweetalert2';
import '@sweetalert2/theme-bulma';
import PDFButton from '../../components/atoms/PDFButton';
import { pdf } from '@react-pdf/renderer';
var AWS = require('aws-sdk')

function TeacherBallots() {
    const [alumns, setAlumns] = useState([]);
    const [matricleSearch, setMatricleSearch] = useState('');
    const [pdfUrls, setPdfUrls] = useState([]);
    const [newPDFs, setNewPDFS] = useState([]);

    useEffect(() => {
        fetch(`${import.meta.env.VITE_URL}/ballot`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            },
        })
        .then(response => {
            if (response.ok) {
                console.log("Response Correct Alumns");
                return response.json();
            }
            throw new Error('Failed to fetch alumns');
        })
        .then(data => {
            // Aquí data debería ser un array de objetos, cada uno con un campo 'content' en Base64
            console.log(data);
            setAlumns(data);
        
            // Convertir cada 'content' en un URL de PDF
            const urls = data.map(item => {
                try {
                    const arrayBuffer = base64ToArrayBuffer(item.content);
                    const blob = new Blob([arrayBuffer], { type: 'application/pdf' });
                    return URL.createObjectURL(blob);
                } catch (error) {
                    console.error('Error decoding base64:', error);
                    return null; // Manejar caso de error, por ejemplo devolver null
                }
            });
        
            // Guardar los URLs válidos en el estado pdfUrls
            setPdfUrls(urls.filter(url => url !== null));
        })
        .catch(error => {
            console.error('Error fetching alumn:', error);
        });
    }, []);

    function base64ToArrayBuffer(base64) {
        const binaryString = window.atob(base64);
        const len = binaryString.length;
        const bytes = new Uint8Array(len);
        for (let i = 0; i < len; ++i) {
            bytes[i] = binaryString.charCodeAt(i);
        }
        return bytes;
    }
    
    const filtredPDF = (e) => {
        console.log("thisawe");
        console.log(pdfUrls);
        const searchTerm = e.target.value; // Obtener el valor del input de búsqueda
        setMatricleSearch(searchTerm);

        const filtredItems = pdfUrls.filter((ballot)=> {
            return ballot.toLowerCase().includes(searchTerm.toLowerCase()); // Filtrar por término de búsqueda
        });

        setNewPDFS(filtredItems); // Actualizar el estado con los nuevos PDFs filtrados
    }

    return (
        <div className="min-h-screen w-full bg-slate-900 overflow-x-hidden">
            <Header role="teacher" />
            <div className="w-full h-[80vh] flex justify-center items-center">
                <div className="h-4/5 w-4/6 lg:w-4/6 flex flex-col wrap items-center border-2 border-white">
                    <SearchBallotSection val={matricleSearch} fnVal={setMatricleSearch} onChange={filtredPDF} />
                    <div className='h-[60%] w-full overflow-x-hidden flex align-items-center gap-10 p-10'>
                        {
                            newPDFs.length === 0 ? 
                              (
                                <p>No se encontraron boletas</p>
                              ) : (
                                newPDFs.map((pdfUrl, index) => (
                                    <div key={index}>
                                        <a href={pdfUrl} download={`boleta-${index + 1}.pdf`}><img src="../../public/icon_pdf.png" alt="Icon" className="w-5 h-5 mr-2" /></a>
                                        <h6>Boleta {index + 1}</h6>
                                    </div>
                                ))
                              )
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TeacherBallots;
