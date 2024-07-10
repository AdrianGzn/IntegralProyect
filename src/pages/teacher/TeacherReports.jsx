import Header from "../../components/organisms/Header";
import NewReport from "../../components/molecules/NewReport";
import ReportCard from "../../components/molecules/ReportCard";
import H1 from "../../components/atoms/H1";


function TeacherReports() {
<<<<<<< HEAD
    const [report, setReport] = useState([]);

=======
>>>>>>> 192f2df42e3643fbcf5a25ea2b2e7204033bf15e
    return (
        <div className="min-h-screen w-full bg-slate-900 flex flex-col">
            <Header role="teacher" />
            <div className="flex-grow flex justify-center items-start">
                <div className="min-h-[80%] w-4/6 p-4 rounded-s">
                    <NewReport></NewReport>
                    <div>
                        <H1 text="Reportes anteriores" className=""></H1>
                        <div className="flex flex-wrap justify-evenly items-center w-full my-5">
                            <ReportCard id="01" status="pendiente" description="Hola"></ReportCard>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TeacherReports;
