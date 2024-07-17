import React, { useState, useEffect } from 'react';
import Header from '../../components/organisms/Header';
import SearchBallotSection from '../../components/organisms/SearchBallotSection';
import Swal from 'sweetalert2';
import '@sweetalert2/theme-bulma';

function TeacherBallots() {
    const [alumns, setAlumns] = useState([]);
    const [matricleSearch, setMatricleSearch] = useState('');
    const [i, setI] = useState(-1);

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
                const base64Data = data.content;
                const byteCharacters = atob(base64Data);
                const byteNumbers = new Array(byteCharacters.length);
                for (let i = 0; i < byteCharacters.length; i++) {
                    byteNumbers[i] = byteCharacters.charCodeAt(i);
                }
                const byteArray = new Uint8Array(byteNumbers);
                const blob = new Blob([byteArray], { type: 'application/pdf' });
                const url = URL.createObjectURL(blob);
            })
            .catch(error => {
                console.error('Error fetching alumn:', error);
            });
    }, []);

    const handleDownload = (item) => {
        const a = document.createElement('a');
        a.href = url;
        a.download = `ballot_${item.alumn_id}.pdf`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    };

    const searchBallot = (matricleSearch) => {
        console.log(matricleSearch);
        const find = alumns.findIndex(index => index.alumn_id === id);
        try {
            if (find !== -1) {
                setI(find);
                Swal.fire({
                    title: "Buscar",
                    text: "Se logró encontrar",
                    icon: "success"
                });
            } else {
                setI(-1);
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
                <div className="h-4/5 w-4/6 lg:w-4/6 flex flex-col items-center border-2 border-white">
                    <SearchBallotSection val={matricleSearch} fnVal={setMatricleSearch} onClick={() => searchBallot(matricleSearch)} />
                    <div className='h-[60%] w-full overflow-x-hidden flex align-items-center'>
                        {alumns.map((item, key) => (
                            <button key={key} onClick={() => handleDownload(item)}>Descargar PDF {key + 1}</button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TeacherBallots;
