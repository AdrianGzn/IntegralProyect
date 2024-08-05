import React, { useState, useEffect } from 'react';
import Header from '../../components/organisms/Header';
import Table from '../../components/organisms/Table';
import Swal from 'sweetalert2';
import { getId } from '../../data/userActual';

function TeacherQualifications() {
    const [auxData, setAuxData] = useState([]);
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
            const personalData = data.find(item => item.personal_id == getId());
            if (personalData) {
                setAlumns(personalData.alumns || []);
            }
        })
        .catch(error => console.log("Ha ocurrido un error: " + error));
    }, []);

    // Fetch ratings
    useEffect(() => {
        fetch(`${import.meta.env.VITE_URL}/rating`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            },
        })
        .then(response => response.ok ? response.json() : Promise.reject('La respuesta no es ok.'))
        .then(data => setRatings(data))
        .catch(error => console.log("Ha ocurrido un error: " + error));
    }, []);

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
                console.log(filteredData);
                
                const newData = filteredData.map(subject => {
                    const alumn = alumns.find(a => a.alumn_id == subject.alumn_id);
                    const ratingSpanish = ratings.find(d => d.alumn_id == subject.alumn_id && d.pertenence == "Spanish");
                    const ratingMath = ratings.find(d => d.alumn_id == subject.alumn_id && d.pertenence == "Math");
                    const ratingScience = ratings.find(d => d.alumn_id == subject.alumn_id && d.pertenence == "Science");
                    return {
                        col1: alumn.alumn_id,
                        col2: alumn.name,
                        col3: alumn.lastName,
                        col4: ratingSpanish ? ratingSpanish.amount : 0,
                        col5: ratingMath ? ratingMath.amount : 0,
                        col6: ratingScience ? ratingScience.amount : 0,
                        col7: subject.averageAmount || 0
                    };
                });

                setData(newData);
                setAuxData(newData);
            })
            .catch(error => console.log("Ha ocurrido un error: " + error));
        }
    }, [alumns, ratings]);

    const onBlur = (rowIndex, colIndex, newValue) => {
        let subject = "";
        if (colIndex === 4) {
            subject = "Spanish";
        } else if (colIndex === 5) {
            subject = "Math";
        } else if (colIndex === 6) {
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
        .then(response => response.ok ? response.json() : Promise.reject('Network response was not ok'))
        .then(data => {
            console.log('Success:', data);
            Swal.fire({
                title: "Agregado",
                text: "Se agregó la calificación",
                icon: "success"
            });
            // Optionally, you can refetch the ratings to ensure the latest data is shown
            setIterations(iterations + 1);
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
                const updatedData = data.map(item => {
                    const matchedRatings = ratings.filter(rating => rating.alumn_id == item.col1);

                    let updatedItem = { ...item };

                    matchedRatings.forEach(rating => {
                        if (rating.pertenence == "Spanish") {
                            updatedItem.col4 = rating.amount;
                        } else if (rating.pertenence === "Math") {
                            updatedItem.col5 = rating.amount;
                        } else if (rating.pertenence === "Science") {
                            updatedItem.col6 = rating.amount;
                        }
                    });

                    return updatedItem;
                });

                setData(updatedData);
            })
            .catch(error => console.log("Ha ocurrido un error: " + error));
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
