import Header from "../../components/organisms/Header";
import NewClass from "../../components/organisms/NewCalss";
import AddAlumnClass from "../../components/organisms/AddAlumnClass"
import { useRef, useState, useEffect } from "react";
import { classNames } from "@react-pdf-viewer/core";
import React from "react";
function EscolarControlClass() {
    const [classes, setClasses] = useState([]);
    const nameAlumn = useRef("");
    const lastNameAlumn = useRef("");
    const nameTeacher = useRef("");
    const lastNameTeacher = useRef("");
    const gradeClass = useRef("");
    const groupClass = useRef("");
    let found = false;
    let idFound = 0;


    const newClass = () => {
        fetch(`${import.meta.env.VITE_URL}/class`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                className: groupClass.current.value,
                classGrade: gradeClass.current.value,
                created_by: "escolarControl",
                updated_by: "escolarControl",
                deleted: false,
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
                text: "Se agregó la clase correctamente",
                icon: "success"
            });
        })
        .catch((error) => {
            console.error('Error:', error);
            Swal.fire({
                title: "No se logró agregar",
                text: "No se pudo agregar la clase",
                icon: "error"
            });
        });


    }

    const addAlumn = () => {
        fetch(`${import.meta.env.VITE_URL}/class`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.ok ? response.json() : Promise.reject('Failed to fetch qualifications.'))
        .then(data => {
            setClasses(data);

        })
        .catch(error => {
            console.error('Error fetching qualifications:', error);
            setLoading(false);
            Swal.fire({
                title: 'Error!',
                text: 'There was an issue fetching the qualifications.',
                icon: 'error',
                confirmButtonText: 'Okay'
            });
        });

        for (let i = 0; i < classes.length; i++) {
            if (classes[i].className == groupClass.current.value && classes[i].classGrade == gradeClass.current.value) {
                found = true;
                idFound = classes[i].class_id;
            }
            
        }

        if(found) {
            fetch(`${import.meta.env.VITE_URL}/alumn`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    class_id: idFound,
                    name: nameAlumn.current.value,
                    lastName: lastNameAlumn.current.value,
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

        }else {
            Swal.fire({
                title: "No se logró agregar",
                text: "No se pudo encontrar la clase",
                icon: "error"
            });
        }
    }

    return <div className="min-h-screen w-full bg-slate-900">
        <Header role="escolarControl" />
        <div className="w-full flex justify-center items-center">
        <div className="min-h-[75vh] w-4/6 flex flex-col">
            <NewClass
                groupReference={groupClass}
                gradeReference={gradeClass}
                nameReference={nameTeacher}
                lastNameReference={lastNameTeacher}
                onClick={newClass}
            ></NewClass>
        </div>
    </div>
</div>
}

export default EscolarControlClass;