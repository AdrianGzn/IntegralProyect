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
        const fetchReports = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_URL}/alumn`, {
                    method: 'GET',
                    credentials: 'include',
                });
                if (response.ok) {
                    const data = await response.json();
                    setReports(data);
                } else {
                    throw new Error('Network response was not ok.');
                }
            } catch (error) {
                console.error("Error fetching data: ", error);
            }
        };

        fetchReports();

        return () => {
            console.log('Cleaning up the useEffect');
        };
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
            setReport(""); 
        }
    };

    return (
        <div>
            <H1 text="Crear nuevo reporte" />
            <div className="grid grid-cols-2 w-[5%]">
                <H2 text="Descripción" />
            </div>
            <div>
                <div className="flex gap-2">
                    <Input className="p-5 h-14 w-[20%] h-[5%]" value={report} onChange={(e) => setReport(e.target.value)} />
                    <Button onClick={addReport} text="Crear" className="!my-2" />
                </div>
            </div>
        </div>
    );
}

export default NewReport;
