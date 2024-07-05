import Button from "../../components/atoms/Button";
import H1 from "../atoms/H1";
import H2 from "../../components/atoms/H2";
import Input from "../../components/atoms/Input";

function NewReport() {
    return (
        <div>
            <H1 text="Crear nuevo reporte" className="underline decoration-lime-500"></H1>
            <div className="grid grid-cols-2 gap-4 w-full">
                <div className="flex flex-col gap-2">
                    <H2 text="Descripción" className="!m-0"></H2>
                    <Input className="h-16 w-full"></Input>
                </div>
                <div className="flex flex-col gap-2 justify-center">
                    <Button text="Crear" className="!my-2"></Button>
                </div>
            </div>
        </div>
    );
}

export default NewReport;