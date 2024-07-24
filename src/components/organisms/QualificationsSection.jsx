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

        fetch(`${import.meta.env.VITE_URL}/subjectRating `, { //Fetch para calificaciones
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Type-Allow-Origin': '*'
            },
        })
            .then(response => {
                if (response.ok) {
                    console.log("Se logro xD");
                    return response.json();
                }
                throw new Error('Failed to fetch rating');
            })
            .then(data => {
                setQualifications(data); 
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching rating:', error);
                setLoading(false);
            });
    }, []);


    useEffect(() => {
        if (!loading) {
            const encabezado = { 1: "id Calificaciones", 2: "Id Boleta", 3: "Cantidad", 4: "Created at" };
            const subject1Data = [encabezado];
            const subject2Data = [encabezado];
            const subject3Data = [encabezado];
            const subject4Data = [encabezado];

            qualifications.map(qualification => {
                        subject1Data.push(qualification.rating_id);
                        subject2Data.push(qualification.subject_id);
                        subject3Data.push(qualification.rating_id);
                        subject4Data.push(qualification );
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
