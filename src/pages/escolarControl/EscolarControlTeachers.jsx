import Header from "../../components/organisms/Header";
import "@sweetalert2/theme-bulma";
import AddTeacher from "../../components/organisms/AddTeacher";
import { useRef, useState, useEffect } from "react";
import Swal from "sweetalert2";
import React from "react";
function EscolarControlTeachers() {
    const nameRef = useRef("");
    const lastNameRef = useRef("");
    const passRef = useRef("");
    const [classes, setClasses] = useState([]);

    useEffect(() => {
        const fetchClasses = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_URL}/class`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                if (!response.ok) throw new Error('Network response was not ok.');

                const data = await response.json();
                setClasses(data.classes); // Ajusta según la estructura de la respuesta
            } catch (error) {
                console.error('Error fetching classes:', error);
                Swal.fire({
                    title: 'Error!',
                    text: 'There was an issue fetching classes.',
                    icon: 'error',
                    confirmButtonText: 'Okay'
                });
            }
        };

        fetchClasses();
    }, []);

    const addTeacher = async () => {
        if (!validateNames()) {
            Swal.fire({
                title: "Error",
                text: "El nombre de usuario debe contener entre 1 y 30 letras sin números.",
                icon: "error"
            });
            return;
        }

        try {
            const response = await fetch(`${import.meta.env.VITE_URL}/personal`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    class_id: 1, 
                    role_id: 1,  
                    name: nameRef.current.value,
                    lastName: lastNameRef.current.value,
                    password: passRef.current.value,
                    url: "",
                    created_by: 'escolarControl',
                    updated_by: 'escolarControl',
                    deleted: false
                })
            });

            if (!response.ok) throw new Error('Network response was not ok.');

            const data = await response.json();
            console.log('Success:', data);
            Swal.fire({
                title: "Agregado",
                text: "Se agregó el profesor",
                icon: "success"
            });
        } catch (error) {
            console.error('Error:', error);
            Swal.fire({
                title: "No se logró agregar",
                text: "No se pudo agregar el profesor",
                icon: "error"
            });
        }
    }

    const validateNames = () => {
        const usernamePattern = /^[a-zA-Z\s]{1,30}$/;
        return usernamePattern.test(nameRef.current.value);
    };

    return (
        <div className="h-full w-full bg-slate-900">
            <Header role="escolarControl" />
            <div className="w-full min-h-[80vh] flex justify-center">
                <div className="w-4/6">
                    <AddTeacher 
                        nameReference={nameRef}
                        lastNameReference={lastNameRef}
                        passReference={passRef}
                        onBlur={validateNames}
                        onClick={addTeacher}
                    />
                </div>
            </div>
        </div>
    );
}

export default EscolarControlTeachers;
