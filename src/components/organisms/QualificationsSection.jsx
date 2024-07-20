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
        const encabezado = ["id Calificaciones", "Id Boleta", "Cantidad", "Created at"];
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

            setQualifications(filter); // Actualizamos qualifications con los datos filtrados
            setLoading(false);
        })
        .catch(error => {
            console.error('Error fetching rating:', error);
            setLoading(false);
        });
    }, []);

    useEffect(() => {
        if (!loading) {
            const encabezado = { 1: "id Calificaciones", 2: "Id Boleta", 3: "Cantidad", 4: "Created at"};
            const subject1Data = [encabezado];
            const subject2Data = [encabezado];
            const subject3Data = [encabezado];
            const subject4Data = [encabezado];

            qualifications.forEach(qualification => {
                switch (qualification.idBoleta) {
                    case 1:
                        subject1Data.push(qualification);
                        break;
                    case 2:
                        subject2Data.push(qualification);
                        break;
                    case 3:
                        subject3Data.push(qualification);
                        break;
                    case 4:
                        subject4Data.push(qualification);
                        break;
                    default:
                        console.log("Id de asignación no válida");
                }
            });

            setSubject1(subject1Data);
            setSubject2(subject2Data);
            setSubject3(subject3Data);
            setSubject4(subject4Data);
        }
    }, [loading, qualifications]);

    return (
        <div className="w-full min-h-[80vh] flex justify-center items-center">
            <div className="h-4/5 w-4/6 border-2 mb-10 border-white flex flex-wrap">
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
    );
}

export default QualificationsSection;
