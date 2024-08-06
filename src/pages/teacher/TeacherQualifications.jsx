import React, { useState, useEffect, useCallback } from 'react';
import Header from '../../components/organisms/Header';
import Table from '../../components/organisms/Table';
import Swal from 'sweetalert2';
import { getId } from '../../data/userActual';

function TeacherQualifications() {
    const [allRatings, setAllRatings] = useState([]);
    const [data, setData] = useState([]);
    const [alumns, setAlumns] = useState([]);
    const [classId, setClass] = useState([])
    const [average, setAverage] = useState([]);
    const headers = ["Num lista", "Nombre", "Apellidos", "Español", "Matemáticas", "Ciencias", "Calificación final"];

    // Fetch alumnos del maestro
    useEffect(() => {
        fetch(`${import.meta.env.VITE_URL}/personal`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            },
        })
        .then(response => response.ok ? response.json() : Promise.reject('La respuesta no es ok.'))
        .then(data => {
            const teacher = data.find(d => d.personal_id == getId());
            if (teacher) {
                setAlumns(teacher.alumns || []);
                setClass(teacher.class_id)
            } else {
                console.log('No se encontró el maestro con el ID dado.');
            }
        })
        .catch(error => console.log("Ha ocurrido un error: " + error));
    }, []);

    useEffect(() => {
        fetch(`${import.meta.env.VITE_URL}/subject/totalAmount`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then(response => response.ok ? response.json() : Promise.reject('La respuesta no es ok.'))
        .then(data => {
            if (data) {
                setAverage(data);
            } else {
                console.log('No se encontró el promedio.');
            }
        })
        .catch(error => console.log("Ha ocurrido un error: " + error));
    }, []);

    // Function to fetch data and update state
    const fetchData = useCallback(async () => {
        try {
            const responseRatings = await fetch(`${import.meta.env.VITE_URL}/rating`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!responseRatings.ok) throw new Error('La respuesta no es ok.');
            const ratings = await responseRatings.json();
            setAllRatings(ratings);

            const alumnIds = new Set(alumns.map(item => item.alumn_id));
            const filteredRatings = ratings.filter(rating => alumnIds.has(rating.alumn_id));

            const updatedData = alumns.map(alumn => {
                const matchedRatings = filteredRatings.filter(rating => rating.alumn_id === alumn.alumn_id);
                let ava = 0;
                let classId = 0;
                average.forEach(avarege => {
                    if (avarege.alumn_id === alumn.alumn_id) {
                        ava = avarege.averageAmount;
                        classId = avarege.class_id; 
                    }
                });
            
                // Redondear 'ava' a 1 decimal
                ava = parseFloat(ava.toFixed(1));
                let spanish = 0, math = 0, science = 0;
                matchedRatings.forEach(rating => {
                    console.log(classId);
                    
                    if (rating.pertenence === "Spanish") spanish = rating.amount;
                    if (rating.pertenence === "Math") math = rating.amount;
                    if (rating.pertenence === "Science") science = rating.amount;
                });
            
                return {
                    col1: alumn.alumn_id,
                    col2: alumn.name,
                    col3: alumn.lastName,
                    col4: spanish,
                    col5: math,
                    col6: science,
                    col7: ava
                };
            });

            setData(updatedData);
        } catch (error) {
            console.log("Ha ocurrido un error: " + error);
        }
    }, [alumns, average]);

    // Fetch ratings and update data
    useEffect(() => {
        if (alumns.length > 0 && average.length > 0) {
            fetchData();
        }
    }, [alumns, average, fetchData]);

    const onBlur = (rowIndex, colIndex, newValue) => {
        const columnMapping = ["Spanish", "Math", "Science"];
        const subject = columnMapping[colIndex - 3]; // col4, col5, col6 correspond to index 3, 4, 5

        if (!subject) return;

        const alumnId = data[rowIndex].col1;
        const ratingToUpdate = allRatings.find(rating => rating.alumn_id === alumnId && rating.pertenence === subject);

        if (!ratingToUpdate) {
            console.error("No se encontró calificación para actualizar.");
            return;
        }

        fetch(`${import.meta.env.VITE_URL}/rating/${ratingToUpdate.rating_id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                amount: parseFloat(newValue),
                updated_by: "Teacher"
            })
        })
        .then(response => response.ok ? response.json() : Promise.reject('La respuesta no es ok.'))
        .then(() => {
            Swal.fire({
                title: "Actualizado",
                text: "Se actualizó la calificación",
                icon: "success"
            });
            fetchData();
        })
        .catch(error => {
            console.error('Error:', error);
            Swal.fire({
                title: "Error",
                text: "No se pudo actualizar la calificación",
                icon: "error"
            });
        });
    }

    return (
        <div className="min-h-screen w-full bg-slate-900">
            <Header role="teacher" />
            <div className="w-full flex justify-center items-center">
                <div><p>{classId}</p></div>
                <div className="h-[75vh] w-4/6 flex flex-col p-4">
                    <Table
                        className={classId}
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
