import Text from "../atoms/Text";
import InputSearch from "../atoms/InputSearch";
import Select from "../../components/atoms/Select";
import Button from "../atoms/Button";

function ChangeReport({ idReport, statusReport, options, event }) {
    return (
        <div className="w-full min-h-24">
            <div>
                <Text text="Cambiar estatus por id" className="my-0 mx-1 !text-xl"></Text>
            </div>
            <div className="flex justify-center items-center flex-wrap">
                <Text text="Matricula:" className="text-base my-2"></Text>
                <InputSearch ref={idReport}></InputSearch>
                <Select ref={statusReport} options={options} className="!my-5"></Select>
                <Button text="Guerdar" onClick={event} className="h-7 !w-36 !my-0"></Button>
            </div>
        </div>
    );
}

export default ChangeReport;
