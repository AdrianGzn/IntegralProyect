import Text from "../atoms/Text";
import Field from "../molecules/Field";
import Button from "../atoms/Button";
import { useRef } from "react";
import React from "react";

function AddTeacher(props) {
    return <div className="w-full p-5 bg-slate-700 rounded-md">
        <Text text="Agregar Profesor" className="!text-2xl"></Text>
        <Field text="Nombre:" type="text" placeholder="Nombre" onBlur={props.onBlur}></Field>
        <Field text="Apellidos:" type="text" placeholder="Apellidos" onBlur={props.onBlur}></Field>
        <Field text="Contraseña:" type="password" placeholder="Contraseña" ></Field>
        <Button text="Guardar" onClick={props.onClick}></Button>
    </div>
}

export default AddTeacher;