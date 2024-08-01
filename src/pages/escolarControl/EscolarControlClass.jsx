import Header from "../../components/organisms/Header";
import { useRef, useState, useEffect } from "react";
import React from "react";
import Swal from "sweetalert2";
import '@sweetalert2/theme-bulma';
import FormAddAlumn from "../../components/organisms/FormAddAlumn";
import FormAssignClass from "../../components/organisms/FormAssignClass";

function EscolarControlClass() {
    const [alumns, setAlumns] = useState([]);
    const [alumnsToPut, setAlumnsToPut] = useState([]);
    const nameAlumn = useRef("");
    const lastNameAlumn = useRef("");
    const nameTeacher = useRef("");
    const lastNameTeacher = useRef("");

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
                return response.json();
            }
            throw new Error('Network response was not ok.');
        })
        .then(data => {
            const filteredAlumns = data.map(alumn => ({
                alumn_id: alumn.alumn_id, 
                name: alumn.name,
                lastName: alumn.lastName
            }));
            setAlumns(filteredAlumns);
        })
        .catch(error => {
            console.error('Error fetching options:', error);
            Swal.fire({
                title: 'Error!',
                text: 'There was an issue fetching options.',
                icon: 'error',
                confirmButtonText: 'Okay'
            });
        });
    }, []);

    const addAlumn = () => {
        const foundIndex = alumns.findIndex(alumn =>
            alumn.name === nameAlumn.current.value && alumn.lastName === lastNameAlumn.current.value
        );

        if (foundIndex === -1) {
            Swal.fire({
                title: 'Error!',
                text: 'Alumno no existente',
                icon: 'error',
                confirmButtonText: 'Okay'
            });
        } else {
            setAlumnsToPut(prevAlumnsToPut => [...prevAlumnsToPut, alumns[foundIndex]]);
            Swal.fire({
                title: "Encontrado",
                text: "Se agregó a la lista",
                icon: "success"
            });
        }
    }

    const assignAlumn = () => {
        fetch(`${import.meta.env.VITE_URL}/personal/${10}`, { 
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "personalData": {
                    updated_by: "escolarControl"
                },
                "alumnos": alumnsToPut
            })
        })
        .then(response => {
            if (response.ok) {
                Swal.fire({
                    title: 'Agregado',
                    text: 'El alumno ha sido agregado correctamente',
                    icon: 'success',
                    confirmButtonText: 'Okay'
                });
            } else {
                throw new Error('Network response was not ok.');
            }
        })
        .catch(error => {
            console.error('Error updating data:', error);
            Swal.fire({
                title: 'Error!',
                text: 'There was an issue updating data.',
                icon: 'error',
                confirmButtonText: 'Okay'
            });
        });
    }

    return (
        <div className="min-h-screen w-full bg-slate-900">
            <Header role="escolarControl" />
            <div className="w-full flex justify-center items-center">
                <div className="min-h-[75vh] w-4/6 flex flex-col">
                    <FormAddAlumn
                        referenceName={nameAlumn}
                        referenceLastName={lastNameAlumn}
                        onClick={addAlumn}
                    />
                    <FormAssignClass
                        referenceName={nameTeacher}
                        referenceLastName={lastNameTeacher}
                        onClick={assignAlumn}
                    />
                </div>
            </div>
        </div>
    );
}

export default EscolarControlClass;
