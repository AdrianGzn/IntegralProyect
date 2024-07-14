import { useState, useEffect, useRef } from "react";
import Header from "../../components/organisms/Header";
import NewReport from "../../components/molecules/NewReport";
import ReportCard from "../../components/molecules/ReportCard";
import Text from "../../components/atoms/Text";
import Swal from "sweetalert2";
import '@sweetalert2/theme-bulma';

function TeacherReports() {
    const [reports, setReports] = useState([]);
    const lastName = "gola";
    const created_by = "teacher";
    const updated_by = "teacher";
    const deletes = false;
    const topic = useRef('');

    useEffect(() => {
        fetch(`${import.meta.env.VITE_URL}/alumn`)
            .then(response => {
                if (response.ok) {
                    console.log("Response is ok");
                    return response.json();
                }
                throw new Error('Failed to fetch reports');
            })
            .then(data => {
                setReports(data);
            })
            .catch(error => {
                console.error('Error fetching reports:', error);
            });
    }, []); // Debes dejar el array de dependencias vacío para que se ejecute solo una vez al montar el componente

    const addReport = () => {
        fetch(`${import.meta.env.VITE_URL}/alumn`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "name": "aew",
                "lastName": "reg",
                "created_by": "reg",
                "updated_by": "yo",
                "deleted": false
            })
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setReports(prevReports => [...prevReports, data]);
            })
            .catch(error => {
                console.error('Error adding report:', error);
            });
    };

    return (
        <div className="min-h-screen w-full bg-slate-900 flex flex-col">
            <Header role="teacher" />
            <div className="flex-grow flex justify-center items-start">
                <div className="min-h-[80%] w-4/6 p-4 rounded-s">
                    <NewReport onClick={addReport} />
                    <div className="flex gap-2 flex-col">
                        <Text text="Reportes activos" className="text-4xl" />
                        <div className="flex flex-wrap justify-evenly items-center w-full my-5">
                            {reports.map((report, key) => (
                                <ReportCard
                                    key={key}
                                    id={report.alumn_id}
                                    status={report.deleted}
                                    description={report.lastName}
                                />
                            ))}
                        </div>
                        <Text text="Reportes anteriores" className="text-4xl" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TeacherReports;
