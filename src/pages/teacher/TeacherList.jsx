import React, { useState, useEffect } from 'react';
import Header from '../../components/organisms/Header';
import SectionBallot from '../../components/organisms/SectionBallot';
import Swal from 'sweetalert2';
import '@sweetalert2/theme-bulma';
import '@pdfslick/react/dist/pdf_viewer.css';

function TeacherList() {
    const [matricleSearch, setMatricleSearch] = useState('');
    const [pdfUrls, setPdfUrls] = useState([]);
    const [newPDFs, setNewPDFs] = useState([]);
    const [role, setRole] = useState('');
    const [pdfUrlForRole, setPdfUrlForRole] = useState('');
    useEffect(() => {
        const storedRole = localStorage.getItem('personal_id');
        if (storedRole) {
            console.log(storedRole);
            setRole(storedRole);
            console.log('Role from localStorage:', storedRole);
        }
    }, []);
    useEffect(() => {
        if (role) {
            fetch(`${import.meta.env.VITE_URL}/personal`, {
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
                console.log(data);
                setPdfUrls(data);

                const urlForRole = data.find(pdf => pdf.personal_id == role)?.url || '';
                console.log(urlForRole);
                setPdfUrlForRole(urlForRole);
                filteredPDF(matricleSearch);
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
        }
    }, [role, matricleSearch]);

    const filteredPDF = (searchTerm) => {
        setMatricleSearch(searchTerm);

        const filteredItems = pdfUrls.filter(ballot => {
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
                    <SectionBallot newPDFs={newPDFs} pdfUrlForRole={pdfUrlForRole} />
                </div>
            </div>
        </div>
    );
}

export default TeacherList;
