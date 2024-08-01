import Text from "../atoms/Text";
import Field from "../molecules/Field";
import Button from "../atoms/Button";
import React from "react";

function AddAlumn(props) {
    return <div className="w-full p-5 bg-slate-700 rounded-md">
        <Text text="Agregar alumno" className="!text-2xl"></Text>
        <Field text="Nombre:" type="text" placeholder="Nombre" onBlur={props.onBlur}></Field>
        <Field text="Apellidos:" type="text" placeholder="Apellidos" onBlur={props.onBlur}></Field>
        <Field text="Clase:" type="text" placeholder="Clase" onBlur={props.onBlur}></Field>
        <Button text="Guardar" onClick={props.onClick}></Button>
    </div>
}

export default AddAlumn;