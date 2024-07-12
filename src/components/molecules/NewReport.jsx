import Button from "../../components/atoms/Button";
import Input from "../../components/atoms/Input";
import Swal from "sweetalert2";
import Text from "../atoms/Text";


function NewReport({ onClick }) {

    return (
        <div>
            <Text text="Crear nuevo reporte" className="!text-4xl" />
            <div className="grid grid-cols-2 w-[5%]">
                <Text text="Descripción" className="!text-base" />
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
