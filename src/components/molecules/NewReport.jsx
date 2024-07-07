import Button from "../../components/atoms/Button";
import H1 from "../atoms/H1";
import H2 from "../../components/atoms/H2";
import Input from "../../components/atoms/Input";
import Swal from "sweetalert2";
import { useState, useEffect } from "react";


function NewReport() {
    const [report, setReport] = useState("")

    useEffect(() => {
        fetch(`${import.meta.env.VITE_URL}/alumn`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Acces-Control-Allow-Origin': '*'
            }
        })
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error('Network response was not ok.');
            })
            .then(data => setReport(data))
            .catch(error => console.error("Error fetching data: ", error));
    }, []);

    const addReport = () => {
        if (!report) {
            Swal.fire({
                title: "Añadir reporte",
                text: "Reporte no añadido",
                icon: "error"
            });
        } else {
            Swal.fire({
                title: "Añadir reporte",
                text: "Se logró añadir reporte",
                icon: "success"
            });
        }
    }
    return (
        <div>
            <H1 text="Crear nuevo reporte" className="underline decoration-lime-500"></H1>
            <div className="grid grid-cols-2 gap-4 w-full">
                <div className="flex flex-col gap-2">
                    <H2 text="Descripción" className="!m-0"></H2>
                    <Input className="h-16 w-full" value={report} fnval={setReport}></Input>
                </div>
                <div className="flex flex-col gap-2 justify-center">
                    <Button onClick={addReport} text="Crear" className="!my-2"></Button>
                </div>
            </div>
        </div>
    );
}


export default NewReport;