import Header from "../../components/organisms/Header";
import { useRef, useState, useEffect, useCallback } from "react";
import Swal from "sweetalert2";
import '@sweetalert2/theme-bulma';
import FormAddAlumn from "../../components/organisms/FormAddAlumn";
import FormAssignClass from "../../components/organisms/FormAssignClass";
import React from "react";

function EscolarControlClass() {
    const [teachers, setTeachers] = useState([]);
    const [alumns, setAlumns] = useState([]);
    const [alumnsToPut, setAlumnsToPut] = useState([]);
    const nameAlumn = useRef(null);
    const lastNameAlumn = useRef(null);
    const nameTeacher = useRef(null);
    const lastNameTeacher = useRef(null);

    useEffect(() => {
        fetch(`${import.meta.env.VITE_URL}/personal`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            },
        })
            .then(response => response.json())
            .then(data => {
                setTeachers(data);
                console.log(data);
            })
            .catch(error => {
                console.log("Ha ocurrido un error: " + error);
            });
    }, []);

    useEffect(() => {
        const fetchAlumns = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_URL}/alumn`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*',
                    },
                });

                if (!response.ok) throw new Error('Network response was not ok.');

                const data = await response.json();
                const filteredAlumns = data.map(alumn => ({
                    alumn_id: alumn.alumn_id,
                    name: alumn.name,
                    lastName: alumn.lastName
                }));
                setAlumns(filteredAlumns);
            } catch (error) {
                console.error('Error fetching options:', error);
                Swal.fire({
                    title: 'Error!',
                    text: 'There was an issue fetching options.',
                    icon: 'error',
                    confirmButtonText: 'Okay'
                });
            }
        };

        fetchAlumns();
    }, []);

    const addAlumn = useCallback(() => {
        const foundIndex = alumns.findIndex(alumn =>
            alumn.name == nameAlumn.current.value && alumn.lastName == lastNameAlumn.current.value
        );

        if (foundIndex === -1) {
            Swal.fire({
                title: 'Error!',
                text: 'Alumno no existente',
                icon: 'error',
                confirmButtonText: 'Okay'
            });
        } else {
            const alumnToAdd = alumns[foundIndex];
            setAlumnsToPut(prevAlumnsToPut => [...prevAlumnsToPut, alumnToAdd]);
            Swal.fire({
                title: "Encontrado",
                text: "Se agregó a la lista",
                icon: "success"
            });
        }
    }, [alumns]);

    const checkIfEmpty = useCallback(() => {
        if (alumnsToPut.length === 0) {
            Swal.fire({
                title: 'Error!',
                text: 'No hay alumnos en la lista para asignar.',
                icon: 'error',
                confirmButtonText: 'Okay'
            });
            return true;
        }
        return false;
    }, [alumnsToPut]);

    const assignAlumn = useCallback(async () => {
        if (checkIfEmpty()) return;

        const teacher = teachers.find(t => t.name == nameTeacher.current.value);
        if (!teacher) {
            Swal.fire({
                title: 'Error!',
                text: 'Maestro no encontrado',
                icon: 'error',
                confirmButtonText: 'Okay'
            });
            return;
        }

        try {
            const response = await fetch(`${import.meta.env.VITE_URL}/personal/${teacher.personal_id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    personalData: {
                        class_id: 1,
                        role_id: 1,
                        name: teacher.name,
                        lastName: teacher.lastName,
                        created_by: "admin",
                        updated_by: "admin",
                        deleted: false
                    },
                    alumnos: alumnsToPut
                })
            });

            if (!response.ok) throw new Error('Network response was not ok.');

            Swal.fire({
                title: 'Agregado',
                text: 'El alumno ha sido agregado correctamente',
                icon: 'success',
                confirmButtonText: 'Okay'
            });
        } catch (error) {
            console.error('Error updating data:', error);
            Swal.fire({
                title: 'Error!',
                text: 'There was an issue updating data.',
                icon: 'error',
                confirmButtonText: 'Okay'
            });
        }
    }, [alumnsToPut, checkIfEmpty, teachers]);

    return (
        <div className="min-h-screen w-full bg-slate-900">
            <Header role="escolarControl" />
            <div className="w-full flex justify-center items-center">
                <div className="min-h-[75vh] w-4/6 flex flex-col items-center">
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
