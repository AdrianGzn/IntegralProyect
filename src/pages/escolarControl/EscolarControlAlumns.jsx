import Header from "../../components/organisms/Header";
import "@sweetalert2/theme-bulma";
import AddAlumn from "../../components/organisms/AddAlumn";
import { useRef } from "react";
import Swal from "sweetalert2";
import React from "react";

function EscolarControlAlumns() {
    const nameRef = useRef('');
    const lastNameRef = useRef('');

    const validateNames = () => {
        const usernamePattern = /^[a-zA-Z\s]{1,30}$/;
        if (!usernamePattern.test(nameRef.current.value)) {
            Swal.fire({
                title: "Error",
                text: "El nombre debe contener entre 1 y 30 letras sin números.",
                icon: "error"
            });
            return false;
        } else if (!usernamePattern.test(lastNameRef.current.value)) {
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
                name: nameRef.current.value,
                lastName: lastNameRef.current.value,
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

    return (
        <div className="h-full w-full bg-slate-900">
            <Header role="escolarControl" />
            <div className="w-full min-h-[80vh] flex justify-center">
                <div className="w-4/6">
                    <AddAlumn
                        nameReference={nameRef}
                        lastNameReference={lastNameRef}
                        onClick={addAlumn}
                    />
                </div>
            </div>
        </div>
    );
}

export default EscolarControlAlumns;
