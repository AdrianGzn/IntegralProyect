import Header from "../../components/organisms/Header";
import ButtonPDF from "../../components/molecules/ButtonPDF";

function TeacherBallots() {

    const handleDownload = async (event) => {
        try {
            const pdfBytes = await createpdf();
            const blob = new Blob([pdfBytes], { type: 'application/pdf' });
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'alumn.pdf');
            document.body.appendChild(link);
            link.click();
            link.remove();
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error("Error al descargar", error);
        }
    }

    return (
        <div className="h-full w-full bg-slate-900">
            <Header role="escolarControl" />
            <div className="w-full h-[80vh] flex justify-center items-center">
                <div className="h-4/5 w-4/6 flex flex-col items-center border-2 border-white">
                    <ButtonPDF text="Hola mundo" onClick={handleDownload}></ButtonPDF>
                </div>
            </div>
        </div>
    );
}

export default TeacherBallots;