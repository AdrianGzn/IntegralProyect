import Header from "../../components/organisms/Header";
import Input from "../../components/atoms/InputNavigate"
import ButtonDownload from "../../components/atoms/ButtonDownload";
import Button from "../../components/atoms/Button";
function TeacherAsistance() {
    return (
        <div className="h-full w-full bg-slate-900">
            <Header role="teacher" />
            <div className="w-full h-[80vh] flex flex-wrap justify-center items-center">
                <div className="min-h-[5%] w-4/6 "><Input></Input></div>
                <div className="h-4/5 w-4/6 border-2 border-white" />
                <div className="min-h-[5%] w-4/6 border-2 border-white"><ButtonDownload text="Descargar" ></ButtonDownload></div>
            </div>
        </div>
    );
}

export default TeacherAsistance;
