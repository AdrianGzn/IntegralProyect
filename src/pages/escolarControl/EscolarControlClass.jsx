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
    const grades = [1, 2, 3, 4, 5, 6];
    const [selectedGrade, setSelectedGrade] = useState('');
    const [change, setChange] = useState(0);

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
                        checked={checkedAlumns[alumn.alumn_id] || false}
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
        setCheckedAlumns(prevState => ({
            ...prevState,
            [alumn_id]: !prevState[alumn_id]
        }));
        setAlumnsShow(prevData =>
            prevData.map(row => {
                if (row.col1 === alumns.find(a => a.alumn_id === alumn_id)?.name) {
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

    useEffect(() => {
        if (selectedGrade && teacherRef.current) {
            fetch(`${import.meta.env.VITE_URL}/class`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                },
            })
            .then(response => response.json())
            .then(data => {
                const selectedClass = data.find(c => c.class_grade === parseInt(selectedGrade));
                if (selectedClass) {
                    fetch(`${import.meta.env.VITE_URL}/personal/${teacherRef.current.value}`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            personalData: {
                                class_id: selectedClass.class_id,
                                updated_by: 'escolarControl',
                            },
                            alumns: Object.keys(checkedAlumns).filter(key => checkedAlumns[key]).map(key => ({
                                alumn_id: parseInt(key),
                            })),
                        }),
                    })
                    .then(() => {
                        Swal.fire("Guardado", "La selección se ha guardado correctamente", "success");
                    })
                    .catch(error => {
                        console.error("Error guardando la selección:", error);
                        Swal.fire("Error", "Ocurrió un error al guardar", "error");
                    });
                }
            })
            .catch(error => {
                console.error("Ha ocurrido un error: " + error);
            });
        }
    }, [change, selectedGrade]);

    const save = () => {
        const selectedTeacherFullName = teacherRef.current.value;
        const [selectedTeacherName, selectedTeacherLastName] = selectedTeacherFullName.split(' ');

        const teacher = teachers.find(teacher => teacher.name === selectedTeacherName && teacher.lastName === selectedTeacherLastName);
        if (teacher) {
            const selectedAlumnsDetails = Object.keys(checkedAlumns)
                .filter(key => checkedAlumns[key])
                .map(key => {
                    const alumn = alumns.find(a => a.alumn_id === parseInt(key));
                    return {
                        alumn_id: alumn.alumn_id,
                        name: alumn.name,
                        lastName: alumn.lastName
                    };
                });

            fetch(`${import.meta.env.VITE_URL}/class`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    className: "",
                    classGrade: selectedGrade,
                    created_by: "escolarControl",
                    updated_by: "escolarControl",
                    deleted: false,
                }),
            })
            .then(response => response.json())
            .then(data => {
                console.log("Class creation success:", data);
                setChange(change + 1);
            })
            .catch((error) => {
                console.error("Class creation error:", error);
                Swal.fire({
                    title: "Error",
                    text: "No se pudo crear la clase",
                    icon: "error",
                });
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
                        grades={grades}
                        onGradeChange={setSelectedGrade}
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
