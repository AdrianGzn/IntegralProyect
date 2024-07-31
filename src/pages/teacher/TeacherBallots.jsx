import React, { useState, useEffect } from 'react';
import Header from '../../components/organisms/Header';
import SearchBallot from '../../components/molecules/SearchBallot';
import SectionBallot from '../../components/organisms/SectionBallot';
import Swal from 'sweetalert2';
import '@sweetalert2/theme-bulma';
import '@pdfslick/react/dist/pdf_viewer.css';


function TeacherBallots() {
    const [matricleSearch, setMatricleSearch] = useState('');
    const [pdfUrls, setPdfUrls] = useState([]);
    const [newPDFs, setNewPDFs] = useState([]);

    useEffect(() => {
        fetch(`${import.meta.env.VITE_URL}/ballot`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error('Network response was not ok.');
        })
        .then(data => {
            setPdfUrls(data);
            setNewPDFs(data);
        })
        .catch(error => {
            console.error('Error fetching ballot data:', error);
            Swal.fire({
                title: 'Error!',
                text: 'There was an issue fetching the ballot data.',
                icon: 'error',
                confirmButtonText: 'Okay'
            });
        });
    }, []);

    const filteredPDF = (searchTerm) => {
        setMatricleSearch(searchTerm);

        const filteredItems = pdfUrls.filter(ballot => {
            // Convert alumn_id to string and handle cases where alumn_id is undefined or null
            const alumnId = ballot.alumn_id ? ballot.alumn_id.toString() : '';
            return alumnId.toLowerCase().includes(searchTerm.toLowerCase());
        });

        setNewPDFs(filteredItems);
    };

    return (
        <div className="min-h-screen w-full bg-slate-900 overflow-x-hidden">
            <Header role="teacher" />
            <div className="w-full h-[80vh] flex justify-center items-center">
                <div className="h-4/5 w-4/6 lg:w-4/6 flex flex-col wrap items-center">
                    <SearchBallot val={matricleSearch} fnVal={filteredPDF} />
                    <SectionBallot newPDFs={newPDFs} />
                </div>
            </div>
        </div>
    );
}

export default TeacherBallots;