import Button from "../../components/atoms/Button";
import Input from "../../components/atoms/Input";
import Text from "../atoms/Text";

function NewReport({ onClick }) {

    return (
        <div className="w-[85%] bg-gray-800 p-6 rounded-lg">
            <Text text="Crear nuevo reporte" className="!text-2xl !text-white mb-4" />
            <div className="mb-4">
                <Text text="Descripción" className="!text-base !text-gray-250" />
                <Input
                    placeholder="Iforme"
                    className="ml-4 mt-2 p-3 w-[60%] h-[50%] rounded-md border border-gray-600 bg-slate-700 text-white  focus:border-blue-500"
                />
            </div>
            <Button onClick={onClick} text="Crear" className="bg-green-500 text-white py-2 px-4 rounded" />
        </div>
    );
}

export default NewReport;
