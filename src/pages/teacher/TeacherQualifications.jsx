import React, { useState, useEffect } from 'react';
import Header from '../../components/organisms/Header';
import Table from '../../components/organisms/Table';
import { getId } from '../../data/userActual';

function TeacherQualifications() {
    const [data, setData] = useState([]);
    const [alumns, setAlumns] = useState([]);
    const [numberList, setNumberList] = useState([]);
    const [names, setNames] = useState([]);
    const [lastNames, setLastNames] = useState([]);
    const headers = ["Num lista", "Nombre", "Apellidos", "Español", "Matemáticas", "Ciencias", "Calificación final"];
    const [iteartions, setIteartions] = useState(0);

    useEffect(() => {//Alumnos del maestro
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
            console.log(data);
            
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

    useEffect(() => { //Calificación final
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
                console.log(subjectData);
                
                const alumnIds = new Set(alumns.map(item => item.alumn_id));
                setNumberList(alumnIds);
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
                setIteartions(iteartions + 1);
            })
            .catch(error => {
                console.log("Ha ocurrido un error: " + error);
            });
        }
    }, [alumns]);

    useEffect(() => { //Este es el useEffect que me encontraba trabajando
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
            const newData = data;
            console.log(ratings);
            console.log(newData);
            
            
            for (let i = 0; i < newData.length; i++) {
                for (let j = 0; j < ratings.length; j++) {
                    if(newData[i].col1 == ratings[j].alumn_id){
                        if (ratings.pertenence == "Spanish") {
                            newData[i] = {
                                col1: newData[i].col1,
                                col2: newData[i].col2,
                                col3: newData[i].col3,
                                col4: ratings[j].amount,
                                col5: newData[i].col5,
                                col6: newData[i].col6,
                                col7: newData[i].col7
                            };
                        }else if (ratings.pertenence == "Math") {
                            newData[i] = {
                                col1: newData[i].col1,
                                col2: newData[i].col2,
                                col3: newData[i].col3,
                                col4: newData[i].col4,
                                col5: ratings[j].amount,
                                col6: newData[i].col6,
                                col7: newData[i].col7
                            };
                        }else if (ratings.pertenence == "Science") {
                            newData[i] = {
                                col1: newData[i].col1,
                                col2: newData[i].col2,
                                col3: newData[i].col3,
                                col4: newData[i].col4,
                                col5: newData[i].col5,
                                col6: ratings[j].amount,
                                col7: newData[i].col7
                            };
                        }
                    }
                }
            }
            console.log(newData);
            
            setData(newData);
        })
        .catch(error => {
            console.log("Ha ocurrido un error: " + error);
        });
    }, [iteartions])

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
                    />
                </div>
            </div>
        </div>
    );
}

export default TeacherQualifications;