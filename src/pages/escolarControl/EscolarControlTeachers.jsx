import Header from "../../components/organisms/Header";
import "@sweetalert2/theme-bulma";
import AddTeacher from "../../components/organisms/AddTeacher"
import { useRef, useState, useEffect } from "react";
import React from "react";

function EscolarControlTeachers() {
    const nameRef = useRef("");
    const lastNameRef = useRef("");
    const passRef = useRef("");
    const [setClass, newClasses] = useState([])


    fetch(`${import.meta.env.VITE_URL}/class`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then((response) => {
        if(response.ok) {
            return response.json()
        }
    })
    .then((data) => {
        setClass(data.class_id)
    })

    const addTeacher = () => {
        fetch(`${import.meta.env.VITE_URL}/personal`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                class_id: 0,
                role_id: 1,
                name: nameRef.current.value,
                lastName: lastNameRef.current.value,
                password: passRef,
                url: "",
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
                text: "Se agregó la boleta",
                icon: "success"
            });
        })
        .catch((error) => {
            console.error('Error:', error);
            Swal.fire({
                title: "No se logró agregar",
                text: "No se pudo agregar la boleta",
                icon: "error"
            });
        });
    }

    const validateNames = () => {
        const usernamePattern = /^[a-zA-Z\s]{1,30}$/;
        if (!usernamePattern.test(nameRef.current.value)) {
            Swal.fire({
                title: "Error",
                text: "El nombre de usuario debe contener entre 1 y 30 letras sin números.",
                icon: "error"
            });
        }
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
                    ></AddTeacher>
                </div>
            </div>
            
        </div>
    );
}

export default EscolarControlTeachers;