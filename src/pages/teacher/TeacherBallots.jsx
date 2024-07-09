import React, { useState, useEffect } from 'react';
import Header from "../../components/organisms/Header";
import ButtonPDFSection from '../../components/organisms/ButtonPDFSection';
import SearchBallotSection from '../../components/organisms/SearchBallotSection';

function TeacherBallots() {
    const [pdfBytes, setPdfBytes] = useState(null);
    const [matricleSearch, setMatricleSearch] = useState();
    const [alumns, setAlumns] = useState([]);
    const [filteredAlumn, setFilteredAlumn] = useState(null);
    const [statusPDF, setStatus] = useState(false)
    const [error, setError] = useState(null);

    const fetchAlumns = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_URL}/alumns`); //aquí va el endpoint de alumnos
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setAlumns(data);

        } catch (error) {
            setError(error.message);
            console.error('Error fetching alumns:', error);
        }
    };

    useEffect(() => { //Obtiene alumnos
        fetchAlumns();
        return () => { }
    }, []);

    useEffect(() => { //Filtra alumno buscado
        if (matricleSearch) {
            const alumn = alumns.find(alumn => alumn.matricle === parseInt(matricleSearch, 10));
            setFilteredAlumn(alumn);
            setStatus(true)//cambiando el status
            console.log(statusPDF);
        } else {
            setFilteredAlumn(null);
        }
    }, [matricleSearch, alumns]);

    const handleDownload = async (event) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_URL}/pdfs`, {  //también aquí va enpoint de alumnos
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            setPdfBytes(data);

            // Descargar el PDF creado desde la API
            const blob = new Blob([pdfBytes], { type: 'application/pdf' });
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'alumn.pdf');
            document.body.appendChild(link);
            link.click();
            link.remove();
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error("Error al descargar el PDF:", error);
        }
    };

    return (
        <div className="min-h-screen w-full bg-slate-900 overflow-x-hidden">
            <Header role="teacher" />
            <div className="w-full h-[80vh] flex justify-center items-center">
                <div className="h-4/5 w-4/6 lg:w-4/6 flex flex-col items-center border-2 border-white">
                    <SearchBallotSection val={matricleSearch} fnVal={setMatricleSearch}></SearchBallotSection>
                    <div className='h-[80%] w-full overflow-x-hidden'>
                        {statusPDF ? ( //acortador para el PDF
                            <ButtonPDFSection text={filteredAlumn.name}></ButtonPDFSection>
                        ) : (
                            alumns.map((alumn) => (
                                <ButtonPDFSection key={alumn.id} text={alumn.name}></ButtonPDFSection>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TeacherBallots;
