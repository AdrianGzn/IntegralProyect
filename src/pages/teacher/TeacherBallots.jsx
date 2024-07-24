import React, { useState, useEffect } from 'react';
import Header from '../../components/organisms/Header';
import SearchBallotSection from '../../components/organisms/SearchBallotSection';
import Swal from 'sweetalert2';
import '@sweetalert2/theme-bulma';
import PDFViewerComponent from '../../components/atoms/PDFViewerComponent';
import "@pdfslick/react/dist/pdf_viewer.css";
import { data } from 'autoprefixer';



function TeacherBallots() {
    const [matricleSearch, setMatricleSearch] = useState('');
    const [pdfUrls, setPdfUrls] = useState([]);
    const [newPDFs, setNewPDFS] = useState([]);

    useEffect(() => {
        fetch(`${import.meta.env.VITE_URL}/ballot`)
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error('Network response was not ok.');
            })
            .then((data) => {
                setPdfUrls(data);
            })
            .catch((error) => {
                console.error('Error fetching ballot data:', error);
            });
    }, []);

    const filteredPDF = (e) => {
        const searchTerm = e.target.value.toLowerCase();
        setMatricleSearch(searchTerm);

        const filteredItems = pdfUrls.filter(ballot => ballot.toLowerCase().includes(searchTerm));
        setNewPDFS(filteredItems);
    };

    return (
        <div className="min-h-screen w-full bg-slate-900 overflow-x-hidden">
            <Header role="teacher" />
            <div className="w-full h-[80vh] flex justify-center items-center">
                <div className="h-4/5 w-4/6 lg:w-4/6 flex flex-col wrap items-center border-2 border-white">
                    <SearchBallotSection val={matricleSearch} fnVal={setMatricleSearch} onChange={filteredPDF} />
                    <div className='h-[60%] w-full overflow-x-hidden flex align-items-center gap-10 p-10'>
                        {newPDFs.map((pdfUrl, index) => (
                            <>
                                <p>{pdfUrl.name}</p>
                            </>
                        )
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TeacherBallots;
