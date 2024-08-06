import React, { useState, useEffect, useRef } from 'react';
import Header from '../../components/organisms/Header';
import Swal from 'sweetalert2';
import SelectTeacher from '../../components/organisms/SelectTeacher';
import TableSelect from '../../components/organisms/TableSelect';

function EscolarControlClass() {
    const header = ["Nombre", "Apellidos", "Seleccionado"];
    const [teachers, setTeachers] = useState([]);
    const [alumns, setAlumns] = useState([]);
    const [alumnsShow, setAlumnsShow] = useState([]);
    const [teachersOptions, setTeachersOptions] = useState([]);
    const [checkedAlumns, setCheckedAlumns] = useState({});
    const teacherRef = useRef(null);

    useEffect(() => {
        const fetchTeachers = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_URL}/personal`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*',
                    },
                });
                const data = await response.json();
                const filteredTeachers = data.filter(teacher => teacher.role_id === 1);
                setTeachers(filteredTeachers);
                setTeachersOptions(filteredTeachers.map(teacher => `${teacher.name} ${teacher.lastName}`));
            } catch (error) {
                console.error("Ha ocurrido un error: " + error);
            }
        };

        fetchTeachers();
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
                const data = await response.json();
                setAlumns(data);
                setAlumnsShow(data.map(alumn => ({
                    col1: alumn.name,
                    col2: alumn.lastName,
                    col3: (
                        <input
                            type="checkbox"
                            checked={!!checkedAlumns[alumn.alumn_id]}
                            onChange={() => handleCheckboxChange(alumn.alumn_id)}
                        />
                    )
                })));
            } catch (error) {
                console.error("Ha ocurrido un error: " + error);
            }
        };

        fetchAlumns();
    }, [checkedAlumns]); // Dependencia en checkedAlumns para actualizar cuando cambia

    const handleCheckboxChange = (alumn_id) => {
        setCheckedAlumns(prevState => {
            const newState = {
                ...prevState,
                [alumn_id]: !prevState[alumn_id]
            };
            console.log("Updated Checked Alumns:", newState); // Depurar aquí
            return newState;
        });
    };

    const save = async () => {
        const selectedTeacherFullName = teacherRef.current.value;
        const [selectedTeacherName, selectedTeacherLastName] = selectedTeacherFullName.split(' ');

        const teacher = teachers.find(t => t.name === selectedTeacherName && t.lastName === selectedTeacherLastName);
        if (!teacher) {
            Swal.fire("Error", "No se ha encontrado el profesor seleccionado", "error");
            return;
        }

        const selectedAlumnsDetails = Object.keys(checkedAlumns)
            .filter(key => checkedAlumns[key])
            .map(key => {
                const alumn = alumns.find(a => a.alumn_id === parseInt(key));
                return alumn ? {
                    alumn_id: alumn.alumn_id,
                    name: alumn.name,
                    lastName: alumn.lastName
                } : null;
            })
            .filter(alumn => alumn !== null);

        console.log("Selected Teacher:", teacher);
        console.log("Selected Alumns Details:", selectedAlumnsDetails);

        try {
            const response = await fetch(`${import.meta.env.VITE_URL}/personal/${teacher.personal_id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    personalData: {
                        updated_by: 'escolarControl',
                    },
                    alumnos: selectedAlumnsDetails
                }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            Swal.fire("Guardado", "La selección se ha guardado correctamente", "success");
        } catch (error) {
            console.error("Error guardando la selección:", error);
            Swal.fire("Error", "Ocurrió un error al guardar", "error");
        }
    };

    return (
        <div className="min-h-screen w-full bg-slate-900">
            <Header role="escolarControl" />
            <div className="w-full flex justify-center items-center">
                <div className="min-h-[75vh] w-4/6 flex flex-col items-center">
                    <SelectTeacher
                        onClick={save}
                        options={teachersOptions}
                        reference={teacherRef}
                    />
                    <TableSelect
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
