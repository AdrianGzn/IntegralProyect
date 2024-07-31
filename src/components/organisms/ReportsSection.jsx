import ReportCard from "../../components/molecules/ReportCard";
import Text from "../../components/atoms/Text";
import React from "react";
function ReportsSection({ reports }) {
    return (
        <div className="flex justify-center flex-wrap my-10 bg-gray-800 rounded-lg">
            <Text text="Reportes Pendientes" className="!text-2xl !mb-0 underline decoration-lime-500" />
            <div className="flex flex-wrap justify-evenly items-center w-full my-5">
                {
                    reports.filter((item) => item.report_status == "Pendiente").map((item, key) => (
                        <ReportCard
                            key={key}
                            status={item.report_status}
                            id={item.report_id}
                            description={item.topic}
                        ></ReportCard>                       
                    ))
                }
            </div>
            <Text text="Reportes Aceptado" className="!text-2xl !mb-0 underline decoration-lime-500" />
            <div className="flex flex-wrap justify-evenly items-center w-full my-5">
                {
                    reports.filter((item) => item.report_status == "Aceptar").map((item, key) => (
                        <ReportCard
                            key={key}
                            status={item.report_status}
                            id={item.report_id}
                            description={item.topic}
                        ></ReportCard>                       
                    ))
                }
            </div>
            <Text text="Reportes Denegados" className="!text-2xl !mb-0 underline decoration-lime-500" />
            <div className="flex flex-wrap justify-evenly items-center w-full my-5">
                {
                    reports.filter((item) => item.report_status == "Denegar").map((item, key) => (
                        <ReportCard
                            key={key}
                            status={item.report_status}
                            id={item.report_id}
                            description={item.topic}
                        ></ReportCard>                       
                    ))
                }
            </div>
        </div>
    )

}

export default ReportsSection; 