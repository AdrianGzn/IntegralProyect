import Header from "../../components/organisms/Header";
import NewReport from "../../components/molecules/NewReport";
import ReportCard from "../../components/molecules/ReportCard";

function TeacherReports() {
    return (
        <div className="min-h-screen w-full bg-slate-900 flex flex-col">
            <Header role="teacher" />
            <div className="flex-grow flex justify-center items-start">
                <div className="min-h-[80%] w-4/6 border-2 border-white p-4 rounded-s">
                    <NewReport></NewReport>
                    <div className="flex flex-wrap justify-evenly items-center w-full my-5">
                        <ReportCard  description="Hola" place="Hola mundo"></ReportCard>
                        <ReportCard  description="Hola" place="Hola mundo"></ReportCard>
                        <ReportCard  description="Hola" place="Hola mundo"></ReportCard>
                        <ReportCard  description="Hola" place="Hola mundo"></ReportCard>
                        <ReportCard  description="Hola" place="Hola mundo"></ReportCard>
                        <ReportCard  description="Hola" place="Hola mundo"></ReportCard>
                        <ReportCard  description="Hola" place="Hola mundo"></ReportCard>
                        <ReportCard  description="Hola" place="Hola mundo"></ReportCard>
                        <ReportCard  description="Hola" place="Hola mundo"></ReportCard>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TeacherReports;
