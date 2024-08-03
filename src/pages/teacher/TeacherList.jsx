import React, { useState, useEffect } from 'react';
import Header from '../../components/organisms/Header';
import { getId } from '../../data/userActual';
import Swal from 'sweetalert2';
import '@sweetalert2/theme-bulma';
import '@pdfslick/react/dist/pdf_viewer.css';
import Table from '../../components/organisms/Table';

function TeacherList() {
    const [data, setData] = useState([]);
    const [alumns, setAlumns] = useState([]);
    const [numberList, setNumberList] = useState([]);
    const [names, setNames] = useState([]);
    const [lastNames, setLastNames] = useState([]);
    const headers = ["Num lista", "Nombre", "Apellidos", "Asistencia"]
    
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

    return (
        <div className="min-h-screen w-full bg-slate-900 overflow-x-hidden">
            <Header role="teacher" />
            <div className="w-full h-[80vh] flex justify-center items-center">
                <div className="h-4/5 w-4/6 lg:w-4/6 flex flex-col wrap items-center">
                    {/*<SectionBallot newPDFs={newPDFs} pdfUrlForRole={pdfUrlForRole} />*/}
                    <Table
                        title="Lista de asistencia"
                        data={data}
                        headers={headers}
                        size = {4}
                    ></Table>
                </div>
            </div>
        </div>
    );
}

export default TeacherList;
