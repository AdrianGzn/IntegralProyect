import Text from "../../components/atoms/Text";
import ReportCard from "../../components/molecules/ReportCard";
import React, { useState, useEffect } from "react";

function FormiUpdatenBallot() {
    const [reports, setReports] = useState([]);

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
        Swal.fire('Error', 'Failed to fetch reports', 'error');
        });
    }, []);

    return (
        <div className="w-full min-h-3/4">
            <div>
                <Text text="Reportes generales" className="mt-10 mx-1 !text-xl"></Text>
            </div>
            <div className="w-full flex justify-around flex-wrap">
                {reports.map((report, key) => (
                    <ReportCard key={key}
                       id={report.report_id}
                       status={report.report_status}
                       description={report.topic}
                    ></ReportCard>
                ))}
            </div>
        </div>
    )
}

export default FormiUpdatenBallot; 