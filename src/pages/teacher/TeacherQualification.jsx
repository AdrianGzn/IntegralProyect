import React, { useState, useEffect } from 'react';
import Header from '../../components/organisms/Header';
import TableQualification from '../../components/organisms/TableQualification';
import { getId } from '../../data/userActual';

function TeacherQualification() {
    const [data, setData] = useState([]);
    const [alumns, setAlumns] = useState([]);
    const [filalumns, setFilalumns] = useState([])
    const [numberList, setNumberList] = useState([]);
    const [names, setNames] = useState([]);
    const [lastNames, setLastNames] = useState([]);
    const headers = ["Num lista", "Nombre", "Apellidos", "Español", "Matemáticas", "Ciencias", "Calificación final"];

    useEffect(() => {
        // Obtener los alumnos del personal
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


    useEffect(() => {
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
            })
            .catch(error => {
                console.log("Ha ocurrido un error: " + error);
            });
        }
    }, [alumns]);

    return (
        <div className="min-h-screen w-full bg-slate-900">
            <Header role="teacher" />
            <div className="w-full flex justify-center items-center">
                <div className="h-[75vh] w-4/6 flex flex-col p-4">
                    <TableQualification
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

export default TeacherQualification;
