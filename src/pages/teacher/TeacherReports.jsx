import { useState, useEffect, useRef } from "react";
import Header from "../../components/organisms/Header";
import NewReport from "../../components/molecules/NewReport";
import ReportCard from "../../components/molecules/ReportCard";
import H1 from "../../components/atoms/H1";
import Swal from "sweetalert2";
import '@sweetalert2/theme-bulma'

function TeacherReports() {
    const [reports, setReports] = useState([]);
    const created = "teacher";
    const updated = "teacher";
    const deletes = false;
    const topic = useRef('');

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
        fetch(`${import.meta.env.VITE_URL}/report`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "topic": topic.current.value,
                "created_by": created,
                "updated_by": updated,
                "delete": deletes
            })
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error('Failed to add report');
        })
        .then(data => {
            setReports(prevReports => [...prevReports, data]);
            Swal.fire('Success', 'Report added successfully', 'success');
        })
        .catch(err => {
            console.error('Error adding report:', err);
            Swal.fire('Error', 'Failed to add report', 'error');
        });
    }

    return (
        <div className="min-h-screen w-full bg-slate-900 flex flex-col">
            <Header role="teacher" />
            <div className="flex-grow flex justify-center items-start">
                <div className="min-h-[80%] w-4/6 p-4 rounded-s">
                    <NewReport onClick={addReport} />
                    <div>
                        <H1 text="Reportes anteriores" className="" />
                        <div className="flex flex-wrap justify-evenly items-center w-full my-5">
                            {reports.map((report, key) => (
                                <ReportCard
                                    key={key}
                                    id={report.id_report}
                                    status={report.delete}
                                    description={report.topic}
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
