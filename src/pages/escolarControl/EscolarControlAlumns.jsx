import Header from "../../components/organisms/Header";
import "@sweetalert2/theme-bulma";
import AddAlumn from "../../components/organisms/AddAlumn";
import { useRef, useEffect, useState } from "react";
import Swal from "sweetalert2";
import React from "react";

function EscolarControlAlumns() {
    const [iterations, setIterations] = useState(0);
    const [alumns, setAlumns] = useState([]);
    const nameRef = useRef('');
    const mothersLastNameRef = useRef('');
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
                name: nameRef.current.value,
                lastName: fathersLastNameRef.current.value,
                created_by: 'escolarControl',
                updated_by: 'escolarControl',
                deleted: false
            })
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Network response was not ok');
            }
        })
        .then(data => {
            console.log('Success:', data);
            Swal.fire({
                title: "Agregado",
                text: "Se agregó el alumno",
                icon: "success"
            });
            setIterations(prev => prev + 1);
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
        if (iterations > 0) {
            const newAlumn = alumns.find(alumn => alumn.name === nameRef.current.value && alumn.lastName === fathersLastNameRef.current.value);
            if (newAlumn) {
                const ratings = [
                    { subject: "Spanish", amount: 6 },
                    { subject: "Math", amount: 6 },
                    { subject: "Science", amount: 6 },
                ];
                ratings.forEach(rating => {
                    fetch(`${import.meta.env.VITE_URL}/rating`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            alumn_id: newAlumn.alumn_id,
                            amount: rating.amount,
                            subject: rating.subject,
                        })
                    })
                    .then(response => {
                        if (response.ok) {
                            return response.json();
                        } else {
                            throw new Error('Network response was not ok');
                        }
                    })
                    .then(data => {
                        console.log('Rating Success:', data);
                    })
                    .catch((error) => {
                        console.error('Rating Error:', error);
                        Swal.fire({
                            title: "Error",
                            text: "No se pudo agregar la calificación",
                            icon: "error"
                        });
                    });
                });
            }
        }
    }, [iterations]);

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
            } else {
                throw new Error('La respuesta no es ok.');
            }
        })
        .then(data => {
            setAlumns(data);
        })
        .catch(error => {
            console.log("Ha ocurrido un error: " + error);
        });
    }, [iterations]);

    return (
        <div className="h-full w-full bg-slate-900">
            <Header role="escolarControl" />
            <div className="w-full flex justify-center items-center">
                <div className="min-h-[80vh] w-4/6 flex flex-col items-center">
                    <AddAlumn
                        nameReference={nameRef}
                        mothersLastNameReference={mothersLastNameRef}
                        fathersLastNameReference={fathersLastNameRef}
                        onClick={addAlumn}
                    />
                </div>
            </div>
        </div>
    );
}

export default EscolarControlAlumns;