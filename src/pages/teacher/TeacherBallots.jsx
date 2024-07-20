import React, { useState, useEffect } from 'react';
import Header from '../../components/organisms/Header';
import SearchBallotSection from '../../components/organisms/SearchBallotSection';
import Swal from 'sweetalert2';
import '@sweetalert2/theme-bulma';
import PDFButton from '../../components/atoms/PDFButton';

function TeacherBallots() {
    const [alumns, setAlumns] = useState([]);
    const [matricleSearch, setMatricleSearch] = useState('');
    const [pdfUrls, setPdfUrls] = useState([]);

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

    const searchBallot = (matricleSearch) => {
        console.log(matricleSearch);
        const find = alumns.findIndex(index => index.alumn_id === matricleSearch);
        try {
            if (find !== -1) {
                Swal.fire({
                    title: "Buscar",
                    text: "Se logró encontrar",
                    icon: "success"
                });
            } else {
                Swal.fire({
                    title: "Buscar",
                    text: "No se logró encontrar",
                    icon: "error"
                });
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="min-h-screen w-full bg-slate-900 overflow-x-hidden">
            <Header role="teacher" />
            <div className="w-full h-[80vh] flex justify-center items-center">
                <div className="h-4/5 w-4/6 lg:w-4/6 flex flex-col wrap items-center border-2 border-white">
                    <SearchBallotSection val={matricleSearch} fnVal={setMatricleSearch} onClick={() => searchBallot(matricleSearch)} />
                    <button onClick={() => base64ToArrayBuffer(pdfUrls)}>gaew</button>
                    <div className='h-[60%] w-full overflow-x-hidden flex align-items-center gap-10 p-10' >
                        {pdfUrls.map((pdfUrl, index) => (
                            <div key={index}>
                               <a href={pdfUrl} download={`boleta-${index +1}.pdf`}><img src="../../public/icon_pdf.png" alt="Icon" className="w-5 h-5 mr-2" /></a>
                                <h6>Boleta{index + 1}</h6>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TeacherBallots;
