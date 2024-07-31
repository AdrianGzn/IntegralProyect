import Text from "../atoms/Text";
import Field from "../molecules/Field";
import Button from "../atoms/Button";
import { useRef } from "react";
import React from "react";

function AddAlumnClass(props) {
    return <div className="w-full my-5 p-5 bg-slate-700 rounded-md">
        <Text text="Agregar alumno a la clase" className="!text-2xl"></Text>
        <Field text="Grado de la clase:" type="text" placeholder="Grado" inputRef={props.gradeReference}></Field>
        <Field text="Grupo de la clase:" type="text" placeholder="Grupo" inputRef={props.groupReference}></Field>
        <Field text="Nombre:" type="text" placeholder="Nombre" inputRef={props.nameReference}></Field>
        <Field text="Apellidos:" type="text" placeholder="Apellidos" inputRef={props.lastNameReference}></Field>
        <Button text="Guardar" onClick={props.onClick}></Button>
    </div>
}

export default AddAlumnClass;