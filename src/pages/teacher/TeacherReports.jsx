import { useState, useEffect, useRef } from "react";
import Header from "../../components/organisms/Header";
import NewReport from "../../components/molecules/NewReport";
import ReportCard from "../../components/molecules/ReportCard";
import Text from "../../components/atoms/Text";
import { Navigate } from "react-router-dom";
import { isnertOption, getOptions } from "../../data/menuOptions"
import Swal from "sweetalert2";
import '@sweetalert2/theme-bulma';

function TeacherReports() {
    const [reports, setReports] = useState([]);
    const topic = useRef(null);

    useEffect(() => {
        fetch(`${import.meta.env.VITE_URL}/report`)
            .then(response => {
                if (response.ok) {
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
    }, []);

    const addReport = () => {
        if (!topic) {
            Swal.fire({
                title: 'Agregar reporte',
                text: 'No se logro agregar, ingrese el id correcto',
                icon: 'error'
            });
        } else {
            Swal.fire({
                title: "Agregar reporte",
                text: "el reporte se agrego",
                icon: "success"
            })

            fetch(`${import.meta.env.VITE_URL}/report`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    personal_id: 1,
                    topic: topic.current.value,
                    created_by: "teacher",
                    updated_by: "teacher",
                    deleted: false
                })
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Failed to add report');
                    }
                    return response.json();
                })
                .then(data => {
                    setReports(prevReports => [...prevReports, data]);
                })
                .catch(error => {
                    console.error('Error adding report:', error);
                    Swal.fire('Error', 'Failed to add report', 'error');
                });
        }

    };

    const search = (option) => {
        Navigate(isnertOption(option))
    }


    return (
        <div className="min-h-screen w-full bg-slate-900 flex flex-col">
            <Header role="teacher" />
            <div className="flex-grow flex justify-center items-start">
                <div className="min-h-[80%] w-4/6 p-4 rounded-s">
                    <NewReport topicRef={topic} onClick={addReport} />
                    <div className="flex gap-2 flex-col">
                        <Text text="Reportes activos" className="text-4xl" />
                        <div className="flex flex-wrap justify-evenly items-center w-full my-5">
                            {reports.map((report, key) => (
                                !report.deleted && (
                                    <ReportCard
                                        key={key}
                                        id={report.report_id}
                                        status={report.deleted}
                                        description={report.topic}
                                    />
                                )
                            ))}
                        </div>
                        <Text text="Reportes anteriores" className="text-4x1" />
                        <div className="flex flex-wrap justify-evenly items-center w-full my-5">
                            {
                                //otra forma aparte del filter
                                reports.map((report, key) => {
                                    if(report.deleted != true) {
                                        <ReportCard 
                                          key={key}
                                          id={report.report_id}
                                          status={report.deleted}
                                          description={report.topic}/>
                                    }
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TeacherReports;
