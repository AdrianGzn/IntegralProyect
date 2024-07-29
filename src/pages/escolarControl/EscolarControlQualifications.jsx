import Header from "../../components/organisms/Header";
import Table from "../../components/organisms/Table";
import Text from "../../components/atoms/Text";
import Swal from "sweetalert2";
import { useState, useEffect } from "react";

function EscolarControlQualifications() {
    const [ratings, setRatings] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const encabezado = ["Id Boleta", "Id Calificación", "Id Alumno", "grado", "Calificación"];

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
            console.log(data);
            const combinedData = [encabezado, ...data.map(item => [
                item.rating_id,  
                item.alumn_id,
                item.amount,
                item.gradePertenence,
                item.gradePertenence
            ])];
            setRatings(combinedData);
            setLoading(false);
        })
        .catch(error => {
            console.error('Error fetching options:', error);
            Swal.fire({
                title: 'Error!',
                text: 'There was an issue fetching options.',
                icon: 'error',
                confirmButtonText: 'Okay'
            });
            setLoading(true);
        });
    }, []);

    return (
        <div className="min-h-screen w-full bg-slate-900">
            <Header role="escolarControl" />
            <div className="w-full flex justify-center items-center">
                <div className="min-h-[75vh] w-4/6 flex flex-col">
                    <div className="w-full flex justify-center">
                        {loading ? (
                            <Text text="Cargando..." />
                        ) : (
                            <Table data={ratings} title="Español" />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EscolarControlQualifications;
