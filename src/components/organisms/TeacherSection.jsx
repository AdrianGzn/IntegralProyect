
import ButtonDownload from "../../components/atoms/ButtonDownload";
function TeacherSection() {

    return(
        <>
            <div className="w-full h-[80vh] flex flex-wrap justify-center items-center bg-red-200">

                <div className="h-4/5 w-4/6 border-2 border-white" />
                <div className="min-h-[5%] w-4/6 border-2 border-white"><ButtonDownload text="Descargar" ></ButtonDownload></div>
            </div>
        </>
    )
}

export default TeacherSection;