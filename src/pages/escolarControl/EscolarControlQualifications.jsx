import Header from "../../components/organisms/Header";
import Table from "../../components/organisms/Table";
import Text from "../../components/atoms/Text";
import { useState, useEffect } from "react";

function EscolarControlQualifications() {
    const [alumns, setAlumns] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const encabezado = [{ 1: "Id Boleta", 2: "Id Calificación", 3: "Id Alumno", 5: "grado", 4: "Calificación"}];
        setAlumns(encabezado);

        fetch(`${import.meta.env.VITE_URL}/subject/espa`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            },
            body: {

            }
        })
        .then(response => {
            if (response.ok) {
                console.log("Response Correct Qualifications");
                return response.json();
            }
            throw new Error('Failed to fetch qualifications');
        }) 
        .then(data => {
            setAlumns(newAlumns => [...newAlumns, ...data]);
            setLoading(false);
        })
        .catch(error => {
            console.error('Error fetching alumn:', error);
            setLoading(false);
        });
    }, []);

    return (
        <div className="min-h-screen w-full bg-slate-900">
            <Header role="escolarControl" />
            <div className="w-full flex justify-center items-center">
                <div className="h-[75vh] w-4/6 flex flex-col">
                    <div className="w-full flex justify-center">
                        {loading ? (
                            <Text text="Cargando..."></Text>
                        ) : (
                            <Table data={alumns} title="Español" />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EscolarControlQualifications;
