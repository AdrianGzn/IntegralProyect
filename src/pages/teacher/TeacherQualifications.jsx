import React, { useState, useEffect } from 'react';
import Header from '../../components/organisms/Header';
import Table from '../../components/organisms/Table';
import Swal from 'sweetalert2';
import { getId } from '../../data/userActual';

function TeacherQualifications() {
    const [allRatings, setAllRatings] = useState([]);
    const [data, setData] = useState([]);
    const [alumns, setAlumns] = useState([]);
    const [ratings, setRatings] = useState([]);
    const headers = ["Num lista", "Nombre", "Apellidos", "Español", "Matemáticas", "Ciencias", "Calificación final"];
    const [iterations, setIterations] = useState(0);

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
            } else {
                console.log('No se encontró el maestro con el ID dado.');
            }
        })
        .catch(error => console.log("Ha ocurrido un error: " + error));
    }, []);

    useEffect(() => {
        if (iterations > 0) {
            fetch(`${import.meta.env.VITE_URL}/rating`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            .then(response => response.ok ? response.json() : Promise.reject('La respuesta no es ok.'))
            .then(ratings => {
                setAllRatings(ratings);
                const updatedData = data.map(item => {
                    const matchedRatings = ratings.filter(rating => rating.alumn_id == item.col1);

                    let updatedItem = { ...item };

                    matchedRatings.forEach(rating => {
                        if (rating.pertenence == "Spanish") {
                            updatedItem.col4 = rating.amount;
                        } else if (rating.pertenence == "Math") {
                            updatedItem.col5 = rating.amount;
                        } else if (rating.pertenence == "Science") {
                            updatedItem.col6 = rating.amount;
                        }
                    });

                    return updatedItem;
                });

                setData(updatedData);
            })
            .catch(error => console.log("Ha ocurrido un error: " + error));
        }
    }, [iterations, data]);

    // Fetch and set data when alumns and ratings are available
    useEffect(() => {
        if (alumns.length > 0) {
            fetch(`${import.meta.env.VITE_URL}/subject/totalAmount`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            .then(response => response.ok ? response.json() : Promise.reject('La respuesta no es ok.'))
            .then(subjectData => {
                const alumnIds = new Set(alumns.map(item => item.alumn_id));
                const filteredData = subjectData.filter(subject => alumnIds.has(subject.alumn_id));
                
                const newData = filteredData.map(subject => {
                    const alumn = alumns.find(a => a.alumn_id == subject.alumn_id);
                    let subjectF = "";
                    if (subject.subjectName == "Spanish") subjectF = "Spanish";
                    else if (subject.subjectName == "Math") subjectF = "Math";
                    else if (subject.subjectName == "Science") subjectF = "Science";
                    const ratingToUpdate = allRatings.find(rating => rating.alumn_id == subject.alumn_id && rating.pertenence == subjectF);
                    return {
                        col1: alumn.alumn_id,
                        col2: alumn.name,
                        col3: alumn.lastName,
                        col4: ratingToUpdate ? ratingToUpdate.amount : 0,
                        col5: ratingToUpdate ? ratingToUpdate.amount : 0,
                        col6: ratingToUpdate ? ratingToUpdate.amount : 0,
                        col7: subject.averageAmount || 0
                    };
                });

                setData(newData);
            })
            .catch(error => console.log("Ha ocurrido un error: " + error));
        }
    }, [alumns, allRatings]);

    const onBlur = (rowIndex, colIndex, newValue) => {
        setIterations(iterations + 1);

        let subject = "";
        if (colIndex === 3) subject = "Spanish";
        else if (colIndex === 4) subject = "Math";
        else if (colIndex === 5) subject = "Science";

        const newAlumnId = data[rowIndex].col1;
        const ratingToUpdate = allRatings.find(rating => rating.alumn_id == newAlumnId && rating.pertenence === subject);

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
                amount: parseFloat(newValue), // Asegúrate de que el valor sea un número
                updated_by: "Teacher"
            })
        })
        .then(response => response.ok ? response.json() : Promise.reject('Network response was not ok'))
        .then(() => {
            Swal.fire({
                title: "Agregado",
                text: "Se agregó la calificación",
                icon: "success"
            });
            setIterations(iterations + 1); // Increment to trigger useEffect
        })
        .catch(error => {
            console.error('Error:', error);
            Swal.fire({
                title: "No se logró agregar",
                text: "No se pudo agregar la calificación",
                icon: "error"
            });
        });
    }

    // Update data when iterations change

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
