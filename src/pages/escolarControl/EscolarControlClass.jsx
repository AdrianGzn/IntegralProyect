import React, { useState, useEffect, useRef } from 'react';
import Header from '../../components/organisms/Header';
import Table from '../../components/organisms/Table';
import Swal from 'sweetalert2';
import SelectTeacher from '../../components/organisms/SelectTeacher';

function EscolarControlClass() {
    const header = ["Nombre", "Apellidos", "Seleccionado"];
    const [teachers, setTeachers] = useState([]);
    const [alumns, setAlumns] = useState([]);
    const [alumnsToPut, setAlumnsToPut] = useState([]);
    const [alumnsShow, setAlumnsShow] = useState([]);
    const [teachersName, setTeachersName] = useState([]);
    const [checkedAlumns, setCheckedAlumns] = useState({});
    const teacherRef = useRef(null);
    const [roles, setRoles] = useState([]);

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
            console.log(data)
            // Filtra los profesores que tengan role_id igual a 1
            const filteredTeachers = data.filter(teacher => teacher.role_id == 1);
            setTeachers(filteredTeachers);
            const teacherNames = filteredTeachers.map(teacher => teacher.name);
            setTeachersName(teacherNames);
        })
        .catch(error => {
            console.log("Ha ocurrido un error: " + error);
        });
    }, []);

    useEffect(() => {
        fetch(`${import.meta.env.VITE_URL}/role`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            },
        })
        .then(response => response.json())
        .then(data => {
            setRoles(data);
            console.log(data);
            
        })
        .catch(error => {
            console.log("Ha ocurrido un error: " + error);
        });
    }, []);

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
            const alumnsProcessed = data.map(alumn => ({
                name: alumn.name,
                lastName: alumn.lastName,
                alumn_id: alumn.alumn_id
            }));

            const updatedData = alumnsProcessed.map((alumn, index) => ({
                col1: alumn.name,
                col2: alumn.lastName,
                col3: (
                    <input
                        type="text"
                        value={checkedAlumns[alumn.alumn_id] || ""}
                        onChange={(e) => handleInputChange(alumn.alumn_id, e.target.value)}
                    />
                )
            }));

            setAlumnsShow(updatedData);
        })
        .catch(error => {
            console.log("Ha ocurrido un error: " + error);
        });
    }, []);

    const handleInputChange = (alumn_id, value) => {
        setCheckedAlumns(prevState => ({
            ...prevState,
            [alumn_id]: value
        }));
    };

    const save = () => {
        const selectedTeacher = teacherRef.current.value;
        const teacher = teachers.find(teacher => teacher.name === selectedTeacher);
        if (teacher) {
            const selectedAlumnIds = Object.keys(checkedAlumns).filter(key => checkedAlumns[key] !== "").map(key => {
                const alumn = alumns.find(a => a.alumn_id === parseInt(key));
                return alumn ? alumn.alumn_id : null;
            }).filter(id => id !== null);

            setAlumnsToPut(selectedAlumnIds);
            console.log("Teacher ID:", teacher.personal_id);
            console.log("Selected Alumn IDs:", selectedAlumnIds);
            Swal.fire("Guardado", "La selección se ha guardado correctamente", "success");
        } else {
            Swal.fire("Error", "No se ha encontrado el profesor seleccionado", "error");
        }
    };

    return (
        <div className="min-h-screen w-full bg-slate-900">
            <Header role="escolarControl" />
        
            <div className="w-full flex justify-center items-center">
                <div className="min-h-[75vh] w-4/6 flex flex-col items-center">
                    <SelectTeacher
                        onClick={save}
                        options={teachersName}
                        reference={teacherRef}
                    />
                    <Table
                        title="Alumnos a elegir"
                        headers={header}
                        data={alumnsShow}
                        size={3}
                    />
                </div>
            </div>
        </div>
    );
}

export default EscolarControlClass;