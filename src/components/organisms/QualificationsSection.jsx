import Table from "./Table";
import Text from "../atoms/Text";
import { useState, useEffect } from "react";

function QualificationsSection() {
    const [qualifications, setQualifications] = useState([]);
    const [subject1, setSubject1] = useState([]);
    const [subject2, setSubject2] = useState([]);
    const [subject3, setSubject3] = useState([]);
    const [subject4, setSubject4] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const encabezado = [{ 1: "id Calificaciones", 2: "Id Boleta", 3: "Cantidad", 4: "Created at"}];
        setSubject1(encabezado);
        setSubject2(encabezado);
        setSubject3(encabezado);
        setSubject4(encabezado);

        fetch(`${import.meta.env.VITE_URL}/rating`, { //Fetch para calificaciones
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
            const filter = data.map(item => ({
                idCalificaciones: item['rating_id'],
                idBoleta: item['ballot_id'],
                cantidad: item['amount'],
                createdAt: item['created_at']
            }));

            setQualifications(newRatings => [...newRatings, ...filter]);
            console.log(data);
            setLoading(false);
        })
        .catch(error => {
            console.error('Error fetching rating:', error);
        });

        for (let i = 0; i < qualifications.length; i++) {
            switch(qualifications[i].idBoleta){
                case 1:
                    setSubject1(subject1, ...qualifications[i])
                    break;
                case 3:
                    setSubject1(subject2, ...qualifications[i])
                    break;
                case 3:
                    setSubject1(subject3, ...qualifications[i])
                    break;
                case 4:
                    setSubject1(subject4, ...qualifications[i])
                    break;
                default:
                    console.log("Id de asignación no válida");
            }
        }
    }, []);

    return (
        <div className="w-full h-[80vh] flex justify-center items-center">
            <div className="h-4/5 w-4/6 border-2 border-white flex flex-wrap">
                <div className="w-full mb-10 flex justify-center">
                    {loading ? (
                        <Text text="Cargando..."></Text>
                        ) : (
                        <Table data={subject1} title="Materia 1" />
                    )}
                </div>
                <div className="w-full mb-10 flex justify-center">
                    {loading ? (
                        <Text text="Cargando..."></Text>
                        ) : (
                        <Table data={subject2} title="Materia 2" />
                    )}
                </div>
                <div className="w-full mb-10 flex justify-center">
                    {loading ? (
                        <Text text="Cargando..."></Text>
                        ) : (
                        <Table data={subject3} title="Materia 3" />
                    )}
                </div>
                <div className="w-full mb-10 flex justify-center">
                    {loading ? (
                        <Text text="Cargando..."></Text>
                        ) : (
                        <Table data={subject4} title="Materia 4" />
                    )}
                </div>
            </div>
        </div>
    )
}

export default QualificationsSection; 