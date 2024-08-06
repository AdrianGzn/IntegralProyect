import React, { useState, useEffect } from 'react';
import Header from "../../components/organisms/Header";
import "@sweetalert2/theme-bulma";
import DeleteAlumn from "../../components/organisms/DeleteAlumn";
import Swal from "sweetalert2";

function EscolarControlDelete() {
    const [isDeleting, setIsDeleting] = useState(false);
    const [alumns, setAlumns] = useState([]);
    const [alumnName, setAlumnName] = useState(""); 

    useEffect(() => {
        fetch(`${import.meta.env.VITE_URL}/alumn`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then(response => response.ok ? response.json() : Promise.reject('La respuesta no es ok.'))
        .then(data => {
            console.log(data);
            setAlumns(data);
        })
        .catch(error => console.log("Ha ocurrido un error: " + error));
    }, []);

    const getAlumnIdByName = (name) => {
        console.log(alumns);
        
        const alumn = alumns.find(al => al.name.toLowerCase() === name.toLowerCase());
        return alumn ? alumn.alumn_id : null;
    };

    const deleteAlumn = async () => {
        if (!alumnName) {
            Swal.fire({
                icon: 'warning',
                title: 'No name provided',
                text: 'Please provide a name to delete an alumnus.',
            });
            return;
        }

        const alumnId = getAlumnIdByName(alumnName);

        if (!alumnId) {
            Swal.fire({
                icon: 'warning',
                title: 'Alumnus not found',
                text: 'No alumnus found with the provided name.',
            });
            return;
        }

        setIsDeleting(true);

        try {
            const response = await fetch(`${import.meta.env.VITE_URL}/alumn/${alumnId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Failed to delete alumnus');
            }
            const deletedAlumn = await response.json(); 

            Swal.fire({
                icon: 'success',
                title: 'Deleted!',
                text: `The alumnus ${deletedAlumn.name} has been deleted successfully.`,
            });
            setAlumns(alumns.filter(al => al.id !== alumnId));
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: error.message,
            });
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <div className="h-full w-full bg-slate-900">
            <Header role="escolarControl" />
            <div className="w-full flex justify-center items-center">
                <div className="min-h-[80vh] w-4/6 flex flex-col items-center">
                    <DeleteAlumn
                        onDelete={deleteAlumn}
                        onIdChange={setAlumnName}
                        isDeleting={isDeleting}
                    />
                </div>
            </div>
        </div>
    );
}

export default EscolarControlDelete;
