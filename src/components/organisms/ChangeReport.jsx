import React from "react";
import Text from "../atoms/Text";
import InputSearch from "../atoms/InputSearch";
import Select from "../../components/atoms/Select";
import Button from "../atoms/Button";
import Swal from "sweetalert2";
import '@sweetalert2/theme-bulma';

function ChangeReport({ idReport, statusReport, options, event }) {

    const handleCreateReport = () => {
        if (!idReport.current || !idReport.current.value) {
            Swal.fire({
                title: "Agregar",
                text: "Ingrese los datos correctamente",
                icon: "error"
            });
            return;
        }
        const isAccepted = statusReport.current.value === "Aceptar"

        event(idReport.current.value, isAccepted);
    };

    return (
        <div className="w-full min-h-24">
            <div>
                <Text text="Cambiar estatus por ID" className="my-0 mx-1 text-xl"></Text>
            </div>
            <div className="flex justify-center items-center flex-wrap">
                <Text text="Matrícula:" className="text-base my-2"></Text>
                <InputSearch ref={idReport} />
                <Select onChange={handleCreateReport} ref={statusReport} options={options} className="my-5 bg-lime-500" />
                <Button text="Guardar" onClick={handleCreateReport} className="h-7 w-36 my-0" />
            </div>
        </div>
    );
}

export default ChangeReport;
