import React, { useState, useEffect } from 'react';
import Header from "../../components/organisms/Header";
import ButtonPDFSection from '../../components/organisms/ButtonPDFSection';
import SearchBallotSection from '../../components/organisms/SearchBallotSection';

function TeacherBallots() {
    const [pdfBytes, setPdfBytes] = useState(null);
    const [setAlumns, setBallots] = useState([]);
    const [matricleSearch, setMatricleSearch] = useState();
    const [filteredAlumn, setFilteredAlumn] = useState(null);
    const [fetchPDF, setFetchPDF] = useState(false);
    const [error, setError] = useState(null);


    useEffect(() => {
        fetch(`${import.meta.env.VITE_URL}/alumn`, {
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
            setAlumns(data);
        })
        .catch(error => {
            console.error('Error fetching alumn:', error);
        });
    }, [setAlumns]);

    useEffect(() => {
        fetch(``)
    }, [])

    const handleDownload = async (event) => {
        try {
            fetch(`${import.meta.env.VITE_URL}/ballot`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                },
            })
            .then(response => {
                if (response.ok) {
                    console.log("Response Correct Ballot");
                    return response.json();
                }
                throw new Error('Failed to fetch ballot');
            })
            .then(data => {
                setFetchPDF(data);
            })
            .catch(error => {
                console.error('Error fetching alumn:', error);
            });

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
                    <div className='h-[60%] w-full overflow-x-hidden'>
                        // Mapeo
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TeacherBallots;
