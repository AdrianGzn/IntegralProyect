import Button from "../../components/atoms/Button";
import H2 from "../../components/atoms/H2";
import Input from "../../components/atoms/Input";

function NewReport() {
    return (
        <div className="grid grid-cols-3 gap-4 w-full">
            <div className="flex flex-col gap-2">
                <H2 text="Descripción" className="!m-0"></H2>
                <Input className="h-16 w-full"></Input>
            </div>
            <div className="flex flex-col gap-2">
                <H2 text="Lugar" className="!m-0"></H2>
                <Input></Input>
            </div>
            <div className="flex flex-col gap-2 justify-center">
                <Button text="Crear" className="!my-2"></Button>
            </div>
        </div>
    );
}

export default NewReport;