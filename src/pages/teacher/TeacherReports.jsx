import Header from "../../components/organisms/Header";
import NewReport from "../../components/molecules/NewReport";
import ReportCard from "../../components/molecules/ReportCard";
import H1 from "../../components/atoms/H1";
import { useEffect, useState } from "react";

function TeacherReports() {
    const [report, setReport] = useState([])

    return (
        <div className="min-h-screen w-full bg-slate-900 flex flex-col">
            <Header role="teacher" />
            <div className="flex-grow flex justify-center items-start">
                <div className="min-h-[80%] w-4/6 p-4 rounded-s">
                    <NewReport></NewReport>
                    <div>
                        <H1 text="Reportes anteriores" className="underline decoration-lime-500"></H1>
                        <div className="flex flex-wrap justify-evenly items-center w-full my-5">
                            <ReportCard id="01" status="pendiente" description="Hola"></ReportCard>
                            <ReportCard id="02" status="pendiente" description="Hola"></ReportCard>
                            <ReportCard id="03" status="pendiente" description="Hola"></ReportCard>
                            <ReportCard id="04" status="pendiente" description="Hola"></ReportCard>
                            <ReportCard id="05" status="pendiente" description="Hola"></ReportCard>
                            <ReportCard id="06" status="pendiente" description="Hola"></ReportCard>
                            <ReportCard id="07" status="pendiente" description="Hola"></ReportCard>
                            <ReportCard id="08" status="pendiente" description="Hola"></ReportCard>
                            <ReportCard id="09" status="pendiente" description="Hola"></ReportCard>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TeacherReports;
