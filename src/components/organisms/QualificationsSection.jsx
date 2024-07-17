import Table from "./Table";
import Text from "../atoms/Text";
import { useState, useEffect } from "react";

function QualificationsSection() {
    const [qualifications, setQualifications] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const encabezado = [{ 1: "Id Boleta", 2: "Id Alumno", 3: "Materia", 4: "Calificación"}];
        setQualifications(encabezado);

        fetch(`${import.meta.env.VITE_URL}/rating`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            },
        })
        .then(response => {
            if (response.ok) {
                console.log("Response Correct Rating");
                return response.json(); 
            }
                throw new Error('Failed to fetch rating');
        })
        .then(data => {
            setQualifications(newRatings => [...newRatings, ...data]);
            console.log(data);
            setLoading(false);
        })
        .catch(error => {
            console.error('Error fetching rating:', error);
        });
    }, []);

    return (
        <div className="w-full h-[80vh] flex justify-center items-center">
            <div className="h-4/5 w-4/6 border-2 border-white flex justify-center">
                <div className="w-full">
                    {loading ? (
                        <Text text="Cargando..."></Text>
                        ) : (
                        <Table data={qualifications} title="Calificaciones" />
                    )}
                </div>
            </div>
        </div>
    )
}

export default QualificationsSection; 