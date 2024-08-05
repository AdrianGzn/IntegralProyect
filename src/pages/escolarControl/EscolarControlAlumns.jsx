import Header from "../../components/organisms/Header";
import "@sweetalert2/theme-bulma";
import AddAlumn from "../../components/organisms/AddAlumn";
import { useRef, useEffect, useState } from "react";
import Swal from "sweetalert2";
import React from "react";

function EscolarControlAlumns() {
    const [iterations, setIterations] = useState(0);
    const [alumns, setAlumns] = useState([]);
    const [name, setName] = useState('');
    const [mothersLast, setMothersLast] = useState('');
    const fathersLastNameRef = useRef('');

    const validateNames = () => {
        const usernamePattern = /^[a-zA-Z\s]{1,30}$/;
        if (!usernamePattern.test(nameRef.current.value)) {
            Swal.fire({
                title: "Error",
                text: "El nombre debe contener entre 1 y 30 letras sin números.",
                icon: "error"
            });
            return false;
        } else if (!usernamePattern.test(fathersLastNameRef.current.value)) {
            Swal.fire({
                title: "Error",
                text: "El apellido debe contener entre 1 y 30 letras sin números.",
                icon: "error"
            });
            return false;
        }
        return true;
    };

    const addAlumn = () => {
        if (!validateNames()) {
            return;
        }

        fetch(`${import.meta.env.VITE_URL}/alumn`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                class_id: 1,
                name: name.current.value,
                lastName: setMothersLast.current.value,
                created_by: 'escolarControl',
                updated_by: 'escolarControl',
                deleted: false
            })
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            Swal.fire({
                title: "Agregado",
                text: "Se agregó el alumno",
                icon: "success"
            });
            // Actualizar el estado de `alumns` y agregar calificaciones en `useEffect` después de que el nuevo alumno sea creado.
            setIterations(prev => prev + 1); // Trigger useEffect to add ratings
        })
        .catch((error) => {
            console.error('Error:', error);
            Swal.fire({
                title: "No se logró agregar",
                text: "No se pudo agregar el alumno",
                icon: "error"
            });
        });
    };

    useEffect(() => {
        fetch(`${import.meta.env.VITE_URL}/alumn`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            },
        })
        .then(response => response.json())
        .then(data => {
            setAlumns(data);
            console.log('Fetched Alumns:', data); // Añade esta línea para depuración
        })
        .catch(error => {
            console.log("Ha ocurrido un error: " + error);
        });
    }, [iterations]);

    useEffect(() => {
        if (iterations > 0) {
            const newAlumn = alumns.find(alumn => alumn.name == {name} && alumn.lastName =="Guzman");
            if (newAlumn) {
                // Post Spanish rating
                fetch(`${import.meta.env.VITE_URL}/rating`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        alumn_id: newAlumn.alumn_id,
                        amount: 6,
                        pertenence: "Spanish",
                        gradePertenence: 1,
                        created_by: "escolarControl",
                        updated_by: "escolarControl",
                        deleted: false
                    })
                })
                .then(response => response.json())
                .then(data => {
                    console.log('Spanish Rating Success:', data);
                })
                .catch((error) => {
                    console.error('Spanish Rating Error:', error);
                    Swal.fire({
                        title: "Error",
                        text: "No se pudo agregar la calificación en Español",
                        icon: "error"
                    });
                });

                // Post Math rating
                fetch(`${import.meta.env.VITE_URL}/rating`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        alumn_id: newAlumn.alumn_id,
                        amount: 6,
                        pertenence: "Math",
                        gradePertenence: 1,
                        created_by: "escolarControl",
                        updated_by: "escolarControl",
                        deleted: false
                    })
                })
                .then(response => response.json())
                .then(data => {
                    console.log('Math Rating Success:', data);
                })
                .catch((error) => {
                    console.error('Math Rating Error:', error);
                    Swal.fire({
                        title: "Error",
                        text: "No se pudo agregar la calificación en Matemáticas",
                        icon: "error"
                    });
                });

                // Post Science rating
                fetch(`${import.meta.env.VITE_URL}/rating`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        alumn_id: newAlumn.alumn_id,
                        amount: 6,
                        pertenence: "Science",
                        gradePertenence: 1,
                        created_by: "escolarControl",
                        updated_by: "escolarControl",
                        deleted: false
                    })
                })
                .then(response => response.json())
                .then(data => {
                    console.log('Science Rating Success:', data);
                })
                .catch((error) => {
                    console.error('Science Rating Error:', error);
                    Swal.fire({
                        title: "Error",
                        text: "No se pudo agregar la calificación en Ciencias",
                        icon: "error"
                    });
                });
            } else {
                console.log('New Alumn not found'); // Añade esta línea para depuración
            }
        }
    }, [iterations]);

    return (
        <div className="h-full w-full bg-slate-900">
            <Header role="escolarControl" />
            <div className="w-full flex justify-center items-center">
                <div className="min-h-[80vh] w-4/6 flex flex-col items-center">
                    <AddAlumn
                        nameReference={name}
                        mothersLastNameReference={mothersLast}
                        fathersLastNameReference={fathersLastNameRef}
                        onClick={addAlumn}
                    />
                </div>
            </div>
        </div>
    );
}

export default EscolarControlAlumns;