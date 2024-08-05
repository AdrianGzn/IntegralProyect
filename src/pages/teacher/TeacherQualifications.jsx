import React, { useState, useEffect } from 'react';
import Header from '../../components/organisms/Header';
import Table from '../../components/organisms/Table';
import Swal from 'sweetalert2';
import { getId } from '../../data/userActual';

function TeacherQualifications() {
    const [allRatings, setAllRatings] = useState([]);
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
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('La respuesta no es ok.');
                }
            })
            .then(data => {
                const teacher = data.find(d => d.personal_id == getId());
                if (teacher) {
                    setAlumns(teacher.alumns || []);
                } else {
                    console.log('No se encontró el maestro con el ID dado.');
                }
            })
            .catch(error => {
                console.log("Ha ocurrido un error: " + error);
            });
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
        setIterations(iterations + 1);

        let subject = "";
        if(colIndex == 3){
            subject = "Spanish";
        }else if(colIndex == 4){
            subject = "Math";
        }else if(colIndex == 5){
            subject = "Science";
        }

        const newAlumnId = data[rowIndex].col1;
        let idRatingToPut = 0;

        for (let i = 0; i < allRatings.length; i++) {
            if (allRatings[i].alumn_id == newAlumnId && allRatings[i].pertenence == subject){
                idRatingToPut = allRatings[i].rating_id;
            }
        }
        
        fetch(`${import.meta.env.VITE_URL}/rating/${idRatingToPut}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                amount: newValue,
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
            // Incrementa iterations aquí para activar el useEffect que depende de iterations
            setIterations(iterations + 1);
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

    // Update data when iterations change
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
                setAllRatings(ratings);
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
