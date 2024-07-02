import Header from "../../components/organisms/Header";

function TeacherReports() {
    return (
        <div className="h-full w-full bg-slate-900">
            <Header role="teacher" />
            <div className="w-full h-[80vh] flex justify-center items-center">
                <div className="min-h-[80%] w-4/6 border-2 border-white" />
            </div>
        </div>
    );
}

export default TeacherReports;
