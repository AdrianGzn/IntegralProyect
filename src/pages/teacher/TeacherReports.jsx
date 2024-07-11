import { useState, useEffect } from "react";
import Header from "../../components/organisms/Header";
import NewReport from "../../components/molecules/NewReport";
import ReportCard from "../../components/molecules/ReportCard";
import H1 from "../../components/atoms/H1";
import { useRef } from "react";
import Swal from "sweetalert2";
import '@sweetalert2/theme-bulma'

function TeacherReports() {
    const [reports, setReports] = useState([]);
    const name = useRef()

    useEffect(() => {
        fetch(`${import.meta.env.VITE_URL}/alumn`)
            .then(response => {
                if (response.ok) {
                    console.log("lo");
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
    }, [setReports]);

    return (
        <div className="min-h-screen w-full bg-slate-900 flex flex-col">
            <Header role="teacher" />
            <div className="flex-grow flex justify-center items-start">
                <div className="min-h-[80%] w-4/6 p-4 rounded-s">
                    <NewReport/>
                    <div>
                        <H1 text="Reportes anteriores" className="" />
                        <div className="flex flex-wrap justify-evenly items-center w-full my-5">
                            {reports.map((report, key) => (
                                <ReportCard
                                    key={key}
                                    id={report.name}
                                    status={report.age}
                                    description={report.description}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TeacherReports;
