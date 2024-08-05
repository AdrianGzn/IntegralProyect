import React, { useState, useEffect } from 'react';
import Header from '../../components/organisms/Header';
import Table from '../../components/organisms/Table';
import Swal from 'sweetalert2';
import { getId } from '../../data/userActual';
import { update } from 'lodash';

function TeacherQualifications() {
    const [auxData, setAuxData] = useState([]);
    const [data, setData] = useState([]);
    const [alumns, setAlumns] = useState([]);
    const headers = ["Num lista", "Nombre", "Apellidos", "Español", "Matemáticas", "Ciencias", "Calificación final"];
    const [iterations, setIterations] = useState(0);

    useEffect(() => {// Alumnos del maestro
        fetch(`${import.meta.env.VITE_URL}/personal`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            },
        })
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('La respuesta no es ok.');
                }
            })
            .then(data => {
                for (let i = 0; i < data.length; i++) {
                    if (data[i].personal_id == getId()) {
                        setAlumns(data[i].alumns || []);
                        break;
                    }
                }
            })
            .catch(error => {
                console.log("Ha ocurrido un error: " + error);
            });
    }, []);

    useEffect(() => { // Calificación final
        if (alumns.length > 0) {
            fetch(`${import.meta.env.VITE_URL}/subject/totalAmount`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
                .then(response => {
                    if (response.ok) {
                        return response.json();
                    } else {
                        throw new Error('La respuesta no es ok.');
                    }
                })
                .then(subjectData => {
                    const alumnIds = new Set(alumns.map(item => item.alumn_id));
                    const filteredData = subjectData.filter(subject => alumnIds.has(subject.alumn_id));

                    const newData = filteredData.map(subject => {
                        const alumn = alumns.find(a => a.alumn_id == subject.alumn_id);
                        return {
                            col1: alumn.alumn_id,
                            col2: alumn.name,
                            col3: alumn.lastName,
                            col4: subject.espanol || 0,
                            col5: subject.matematicas || 0,
                            col6: subject.ciencias || 0,
                            col7: subject.averageAmount || 0
                        };
                    });

                    setData(newData);
                    setAuxData(newData);
                    setIterations(iterations + 1);
                })
                .catch(error => {
                    console.log("Ha ocurrido un error: " + error);
                });
        }
    }, [alumns]);

    const onBlur = (rowIndex, colIndex, newValue) => {
        console.log(rowIndex);
        console.log(colIndex + 1);
        console.log(newValue);

        if(colIndex == 4){
            subject = "Spanish";
        }else if(colIndex == 5){
            subject = "Math";
        }else if(colIndex == 6){
            subject = "Science";
        }

        const newAlumnId = alumns[rowIndex].alumn_id;
        
        fetch(`${import.meta.env.VITE_URL}/ratings`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                alumn_id: newAlumnId,
                amount: newValue,
                pertenence: subject,
                gradePertenence: 1,
                created_by: "Teacher",
                updated_by: "Teacher"
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
                    text: "Se agregó la calificación",
                    icon: "success"
                });
            })
            .catch((error) => {
                console.error('Error:', error);
                Swal.fire({
                    title: "No se logró agregar",
                    text: "No se pudo agregar la calificación",
                    icon: "error"
                });
            });
    }

    useEffect(() => {
        if (iterations > 0) {
            fetch(`${import.meta.env.VITE_URL}/rating`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
                .then(response => {
                    if (response.ok) {
                        return response.json();
                    } else {
                        throw new Error('La respuesta no es ok.');
                    }
                })
                .then(ratings => {
                    const updatedData = data.map(item => {
                        const matchedRatings = ratings.filter(rating => rating.alumn_id === item.col1);

                        let updatedItem = { ...item };

                        for (let i = 0; i < matchedRatings.length; i++) {
                            const rating = matchedRatings[i];
                            if (rating.pertenence === "Spanish") {
                                updatedItem.col4 = rating.amount;
                            } else if (rating.pertenence === "Math") {
                                updatedItem.col5 = rating.amount;
                            } else if (rating.pertenence === "Science") {
                                updatedItem.col6 = rating.amount;
                            }
                        }

                        return updatedItem;
                    });

                    setData(updatedData);
                })
                .catch(error => {
                    console.log("Ha ocurrido un error: " + error);
                });
        }
    }, [iterations]);

    return (
        <div className="min-h-screen w-full bg-slate-900">
            <Header role="teacher" />
            <div className="w-full flex justify-center items-center">
                <div className="h-[75vh] w-4/6 flex flex-col p-4">
                    <Table
                        title="Teacher Qualifications"
                        headers={headers}
                        data={data}
                        size={7}
                        onBlur={onBlur}
                    />
                </div>
            </div>
        </div>
    );
}

export default TeacherQualifications;