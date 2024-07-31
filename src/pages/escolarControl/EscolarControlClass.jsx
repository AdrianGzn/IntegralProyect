import Header from "../../components/organisms/Header";
import NewClass from "../../components/organisms/NewCalss";
import AddAlumnClass from "../../components/organisms/AddAlumnClass"
import { useRef, useState, useEffect } from "react";
import { classNames } from "@react-pdf-viewer/core";
import React from "react";
import Swal from "sweetalert2";
import '@sweetalert2/theme-bulma';

function EscolarControlClass() {
    const [classes, setClasses] = useState([]);
    const [alumns, setAlumns] = useState([]);
    const nameAlumn = useRef("");
    const lastNameAlumn = useRef("");
    const nameTeacher = useRef("");
    const lastNameTeacher = useRef("");
    const gradeClass = useRef(0);
    const groupClass = useRef("");
    let found = false;
    let foundAlumn = false;
    let idFound = 0;
    let idAlumn = 0;


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
        fetch(`${import.meta.env.VITE_URL}/alumn`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.ok ? response.json() : Promise.reject('Failed to fetch qualifications.'))
        .then(data => {
            setAlumns(data);

        })
        .catch(error => {
            console.error('Error fetching alumns:', error);
            setLoading(false);
            Swal.fire({
                title: 'Error!',
                text: 'There was an issue fetching the alumns.',
                icon: 'error',
                confirmButtonText: 'Okay'
            });
        });

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
            setClasses(datas);
        })
        .catch(error => {
            console.error('Error fetching alumns:', error);
            Swal.fire({
                title: 'Error!',
                text: 'There was an issue fetching alumns.',
                icon: 'error',
                confirmButtonText: 'Okay'
            });
        });

        
        for (let i = 0; i < alumns.length; i++) {
            if (alumns[i].name == name && alumns[i].lastName) {
                idAlumn = alumns[i].alumn_id;
                foundAlumn = true;
            }
        }

        for (let i = 0; i < classes.length; i++) {
            if (classes[i].className == groupClass.current.value && classes[i].classGrade == gradeClass.current.value) {
                found = true;
                idFound = classes[i].class_id;
            }
            
        }


        if(found & foundAlumn) {
            fetch(`${import.meta.env.VITE_URL}/alumn/${alumnId}`, {
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
            <AddAlumnClass
                gradeReference={gradeClass}
                groupReference={groupClass}
                nameReference={nameTeacher}
                lastNameReference={lastNameTeacher}
                onClick={addAlumn}
            ></AddAlumnClass>
        </div>
    </div>
</div>
}

export default EscolarControlClass;