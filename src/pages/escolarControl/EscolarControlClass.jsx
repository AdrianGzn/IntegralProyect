import React, { useState, useEffect, useRef } from 'react';
import Header from '../../components/organisms/Header';
import Swal from 'sweetalert2';
import SelectTeacher from '../../components/organisms/SelectTeacher';
import TableSelect from '../../components/organisms/TableSelect';

function EscolarControlClass() {
    const header = ["Nombre", "Apellidos", "Seleccionado"];
    const [teachers, setTeachers] = useState([]);
    const [alumns, setAlumns] = useState([]);
    const [alumnsToPut, setAlumnsToPut] = useState([]);
    const [alumnsShow, setAlumnsShow] = useState([]);
    const [teachersOptions, setTeachersOptions] = useState([]);
    const [checkedAlumns, setCheckedAlumns] = useState({});
    const teacherRef = useRef(null);

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
            const filteredTeachers = data.filter(teacher => teacher.role_id === 1);
            setTeachers(filteredTeachers);
            const options = filteredTeachers.map(teacher => `${teacher.name} ${teacher.lastName}`);
            setTeachersOptions(options);
        })
        .catch(error => {
            console.error("Ha ocurrido un error: " + error);
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
                alumn_id: alumn.alumn_id,
                selected: false  
            }));

            const updatedData = alumnsProcessed.map((alumn) => ({
                col1: alumn.name,
                col2: alumn.lastName,
                col3: (
                    <input
                        type="checkbox"
                        checked={alumn.selected}
                        onChange={() => handleCheckboxChange(alumn.alumn_id)}
                    />
                )
            }));

            setAlumnsShow(updatedData);
        })
        .catch(error => {
            console.error("Ha ocurrido un error: " + error);
        });
    }, []);

    const handleCheckboxChange = (alumn_id) => {
        // Actualiza la selección del alumno
        setCheckedAlumns(prevState => ({
            ...prevState,
            [alumn_id]: !prevState[alumn_id]
        }));
        setAlumnsShow(prevData =>
            prevData.map(row => {
                if (row.col1 === alumns.find(a => a.alumn_id == alumn_id)?.name) {
                    return {
                        ...row,
                        col3: (
                            <input
                                type="checkbox"
                                checked={checkedAlumns[alumn_id] || false}
                                onChange={() => handleCheckboxChange(alumn_id)}
                            />
                        )
                    };
                }
                return row;
            })
        );
    };

    const save = () => {
        const selectedTeacherFullName = teacherRef.current.value;
        const [selectedTeacherName, selectedTeacherLastName] = selectedTeacherFullName.split(' ');

        const teacher = teachers.find(teacher => teacher.name == selectedTeacherName && teacher.lastName == selectedTeacherLastName);
        if (teacher) {
            const selectedAlumnsDetails = Object.keys(checkedAlumns)
                .filter(key => checkedAlumns[key])
                .map(key => {
                    const alumn = alumns.find(a => a.alumn_id == parseInt(key));
                    return {
                        alumn_id: alumn.alumn_id,
                        name: alumn.name,
                        lastName: alumn.lastName
                    };
                });
                console.log(selectedAlumnsDetails);
                
            
            fetch(`${import.meta.env.VITE_URL}/personal/${teacher.personal_id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    personalData: {
                        updated_by: 'escolarControl',
                    },
                    alumns: [
                        selectedAlumnsDetails
                    ] // Lista de alumnos seleccionados
                }),
            })
            .then(response => response.json())
            .then(() => {
                Swal.fire("Guardado", "La selección se ha guardado correctamente", "success");
            })
            .catch(error => {
                console.error("Error guardando la selección:", error);
                Swal.fire("Error", "Ocurrió un error al guardar", "error");
            });
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
