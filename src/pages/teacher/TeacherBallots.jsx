import React, { useState, useEffect } from 'react';
import Header from "../../components/organisms/Header";
import ButtonPDFSection from '../../components/organisms/ButtonPDFSection';
import SearchBallotSection from '../../components/organisms/SearchBallotSection';
import Swal from 'sweetalert2';

function TeacherBallots() {
    const [alumns, setAlumns] = useState([]);
    const [matricleSearch, setMatricleSearch] = useState();
    const [i, setI] = useState(-1)


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
    }, []);

    const searchBallot = (id) => {
        const find = alumns.findIndex(index => index.alumn_id === 1) // una busqueda para el index del alumno xD prro
        if (find !== -1) {
            setI(find)
            Swal.fire({
                title: "Buscar",
                text: "se logro encontrar",
                icon: "success"
            })
        } else {
            setI(-1)
            Swal.fire({
                title: "Buscar",
                text: "no se logro encontrar",
                icon: "error"
            })
        }
    }


    return (
        <div className="min-h-screen w-full bg-slate-900 overflow-x-hidden">
            <Header role="teacher" />
            <div className="w-full h-[80vh] flex justify-center items-center">
                <div className="h-4/5 w-4/6 lg:w-4/6 flex flex-col items-center border-2 border-white">
                    <SearchBallotSection val={matricleSearch} fnVal={setMatricleSearch} onClick={() => searchBallot(matricleSearch)}></SearchBallotSection>
                    <div className='h-[60%] w-full overflow-x-hidden flex align-items-center'>
                        {
                            (i !== -1) && (
                                <button key={alumns[i].alumn_id}>{alumns[i].content}hola</button>
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TeacherBallots;
