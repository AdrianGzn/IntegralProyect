import Header from "../../components/organisms/Header";
import "@sweetalert2/theme-bulma";
import AddAlumn from "../../components/organisms/AddAlumn";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import React from "react";

function EscolarControlAlumns() {
    const [alumns, setAlumns] = useState([]);
    const [name, setName] = useState('');
    const [mothersLast, setMothersLast] = useState('');
    const [fathers, setFathers] = useState('');


    const addAlumn = () => {
        fetch(`${import.meta.env.VITE_URL}/alumn`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                class_id: 1,
                name: name,
                lastName: mothersLast,
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
            setAlumns(prevAlumns => [...prevAlumns, data]);
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
            console.log('Fetched Alumns:', data); // For debugging
        })
        .catch(error => {
            console.log("Ha ocurrido un error: " + error);
        });
    }, []);

    useEffect(() => {
        const postRating = (alumn_id, subject) => {
            fetch(`${import.meta.env.VITE_URL}/rating`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    alumn_id: alumn_id,
                    amount: 6,
                    pertenence: subject,
                    gradePertenence: 1,
                    created_by: "escolarControl",
                    updated_by: "escolarControl",
                    deleted: false
                })
            })
            .then(response => response.json())
            .then(data => {
                console.log(`${subject} Rating Success:`, data);
            })
            .catch((error) => {
                console.error(`${subject} Rating Error:`, error);
                Swal.fire({
                    title: "Error",
                    text: `No se pudo agregar la calificación en ${subject}`,
                    icon: "error"
                });
            });
        };

        if (alumns.length > 0) {
            const newAlumn = alumns.find(alumn => alumn.name == name && alumn.lastName == fathers);
            if (newAlumn) {
                postRating(newAlumn.alumn_id, "Spanish");
                postRating(newAlumn.alumn_id, "Math");
                postRating(newAlumn.alumn_id, "Science");
            } else {
                console.log('New Alumn not found'); // For debugging
            }
        }
    }, [alumns, name, fathers]);

    return (
        <div className="h-full w-full bg-slate-900">
            <Header role="escolarControl" />
            <div className="w-full flex justify-center items-center">
                <div className="min-h-[80vh] w-4/6 flex flex-col items-center">
                    <AddAlumn
                        name={name}
                        fnvalName={setName}
                        mothers={mothersLast}
                        fnvalMothers={setMothersLast}
                        fathers={fathers}
                        fnvalFathers={setFathers}
                        onClick={addAlumn}
                    />
                </div>
            </div>
        </div>
    );
}

export default EscolarControlAlumns;

