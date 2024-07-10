import Button from "../../components/atoms/Button";
import H1 from "../atoms/H1";
import H2 from "../../components/atoms/H2";
import Input from "../../components/atoms/Input";
import Swal from "sweetalert2";
import { useState, useEffect } from "react";

function NewReport() {
    const [report, setReport] = useState("");
    const [reports, setReports] = useState([]);

    useEffect(() => {
        fetch(`${import.meta.env.VITE_URL}/alumn`, { //set report
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'credentials': 'include'
            }
        })
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error('Network response was not ok.');
            })
            .then(data => setReports(data))
            .catch(error => console.error("Error fetching data: ", error))

        return () => { `cleanning the useEffect` }

    }, [setReport]);

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
            <H1 text="Crear nuevo reporte">
            </H1>
            <div className=" grid grid-cols-2  w-[5%]">
                <H2 text="Descripción"></H2>
            </div>
            <div>
                <div className="flex gap-2">
                    <Input className="p-5 h-14 w-[20%] h-[5%]" value={report} fnval={setReport}></Input>
                    <Button onClick={addReport} text="Crear" className="!my-2"></Button>
                </div>
            </div>
        </div>
    );
}

export default NewReport;
