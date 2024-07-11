import Button from "../../components/atoms/Button";
import H1 from "../atoms/H1";
import H2 from "../../components/atoms/H2";
import Input from "../../components/atoms/Input";
import Swal from "sweetalert2";


function NewReport({ onClick }) {

    return (
        <div>
            <H1 text="Crear nuevo reporte" />
            <div className="grid grid-cols-2 w-[5%]">
                <H2 text="Descripción" />
            </div>
            <div>
                <div className="flex gap-2">
                    <Input className="p-5 h-14 w-[20%] h-[5%]" />
                    <Button onClick={onClick} text="Crear" className="!my-2" />
                </div>
            </div>
        </div>
    );
}

export default NewReport;
