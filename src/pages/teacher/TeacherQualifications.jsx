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
            const newNumberList = alumns.map(item => item.alumn_id);
            const newNames = alumns.map(item => item.name);
            const newLastNames = alumns.map(item => item.lastName);
            
            setNumberList(newNumberList);
            setNames(newNames);
            setLastNames(newLastNames);
            
            const newData = alumns.map((item, index) => ({col1: newNumberList[index], col2: newNames[index], col3: newLastNames[index], col4: '', col5: '', col6: '', col7: ''}));
            setData(newData);
        }
    }, [alumns]);
    
    useEffect(() => {
        console.log(numberList);
        console.log(names);
        console.log(lastNames);
    }, [numberList, names, lastNames]);
    

    return (
        <div className="min-h-screen w-full bg-slate-900">
            <Header role="teacher" />
            <div className="w-full flex justify-center items-center">
                <div className="h-[75vh] w-4/6 flex flex-col p-4">
                    <Table 
                        title="Teacher Qualifications" 
                        data={data} 
                        numbers={numberList}
                        names={names}
                        lastNames={lastNames}
                    />
                </div>
            </div>
        </div>
    );
}

export default TeacherQualifications;