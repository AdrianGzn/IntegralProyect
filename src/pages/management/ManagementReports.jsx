import Header from "../../components/organisms/Header";
import { useRef } from "react";
import ChangeReport from "../../components/organisms/ChangeReport";
import Swal from "sweetalert2";
import FormiUpdatenBallot from "../../components/organisms/ForminUpdateBallot";
import { getId } from "../../data/userActual";

function ManagementReports() {
    const options = ["Aceptar", "Denegar"];
    const idRef = useRef(null);
    const statusRef = useRef(""); 

    const changeData = (idReport, statusReport) => {
        fetch(`${import.meta.env.VITE_URL}/report/${idReport}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                personal_id: getId(),
                created_by: "teacher",
                updated_by: "teacher",
                report_status: statusReport
            })
        })
        .then(response => {
            if (response.ok) {
                Swal.fire({
                    title: "Cambiar reporte",
                    text: "Se logró cambiar el reporte",
                    icon: "success"
                });
                return response.json();
            } else {
                Swal.fire({
                    title: "Cambiar reporte",
                    text: "No se logró cambiar el reporte",
                    icon: "error"
                });
                throw new Error('Failed to update report');
            }
        })
        .catch(error => {
            console.error('Error updating report:', error);
            Swal.fire({
                title: "Error",
                text: "Ocurrió un error al cambiar el reporte",
                icon: "error"
            });
        });
    };

    return (
        <div className="h-full w-full bg-slate-900">
            <Header role="management" />
            <div className="w-full min-h-[80vh] flex justify-center items-center">
                <div className="h-4/5 min-h-[75%] w-4/6">
                    <ChangeReport idReport={idRef} statusReport={statusRef} options={options} event={changeData} />
                    <FormiUpdatenBallot></FormiUpdatenBallot>
                </div>
            </div>
        </div>
    );
}

export default ManagementReports;
