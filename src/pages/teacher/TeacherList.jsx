import React, { useState, useEffect } from "react";
import Header from "../../components/organisms/Header";
import DownloadList from "../../components/organisms/DownLoadList";
import { getId } from "../../data/userActual";
import Swal from 'sweetalert2';

function EscolarControlList() {
    const [alumns, setAlumns] = useState([]);

    useEffect(() => {
        fetch(`${import.meta.env.VITE_URL}/rating`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            },
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error('Network response was not ok.');
        })
        .then(data => {
            const filteredAlumns = data.map(alumn => ({
                alumn_id: alumn.alumn_id,
                name: alumn.name,
                lastName: alumn.lastName
            }));
            console.log(filteredAlumns);
            setAlumns(filteredAlumns);
        })
        .catch(error => {
            console.error('Error fetching options:', error);
            Swal.fire({
                title: 'Error!',
                text: 'There was an issue fetching options.',
                icon: 'error',
                confirmButtonText: 'Okay'
            });
        });
    }, []);

    const Download = () => {
        fetch(`${import.meta.env.VITE_URL}/personal/${getId()}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                url: alumns
            })
        })
        .then(response => {
            if (response.ok) {
                Swal.fire({
                    title: "Cambiar reporte",
                    text: "Se logró cambiar el reporte",
                    icon: "success"
                });
                return response.json();
            } else {
                Swal.fire({
                    title: "Cambiar reporte",
                    text: "No se logró cambiar el reporte",
                    icon: "error"
                });
                throw new Error('Failed to update report');
            }
        })
        .catch(error => {
            console.error('Error updating report:', error);
            Swal.fire({
                title: "Error",
                text: "Ocurrió un error al cambiar el reporte",
                icon: "error"
            });
        });

    }

    return (
        <div className="h-full w-full bg-slate-900">
            <Header role="escolarControl" />
            <div className="w-full min-h-[80vh] flex justify-center">
                <div className="w-4/6">
                    <DownloadList onClick={Download} />
                </div>
            </div>
        </div>
    );
}

export default EscolarControlList;
