import Header from "../../components/organisms/Header";
import Text from "../../components/atoms/Text";
import ReportCard from "../../components/molecules/ReportCard";
import { useState, useRef, useEffect } from "react";
import ChangeReport from "../../components/organisms/ChangeReport";

function ManagementReports() {
    const options = ["Aceptar", "Denegar"];

    const idReport = useRef(0);      // Datos del reporte
    const statusReport = useRef(""); // para modificar

    const [reports, setReports] = useState([]);

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
    }, [idReport, statusReport]); //Aquí se vuelve a renderizar para ver el reporte que se le cambió de status

    const changeData = () => {
        const id = idReport.current.value;
        const status = statusReport.current.value;

        console.log(id);
        console.log(status);
    };

    return (
        <div className="h-full w-full bg-slate-900">
            <Header role="management" />
            <div className="w-full min-h-[80vh] flex justify-center items-center">
                <div className="h-4/5 min-h-[75%] w-4/6">
                    <ChangeReport idReport={idReport} statusReport={statusReport} options={options} event={changeData}></ChangeReport>
                    <div className="w-full min-h-3/4">
                        <div>
                            <Text text="Reportes generales" className="mt-10 mx-1 !text-xl"></Text>
                        </div>
                        <div className="w-full flex justify-around flex-wrap">
                            {reports.map((report, key) => (
                                <ReportCard
                                    key={key}
                                    id={report.alumn_id}
                                    status={report.deleted}
                                    description={report.lastName}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ManagementReports;
