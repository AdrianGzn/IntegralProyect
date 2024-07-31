import Text from "../atoms/Text";
import Field from "../molecules/Field";
import Button from "../atoms/Button";
import React from "react";
function NewClass(props) {
    return <div className="w-full my-5 bg-slate-700 rounded-md">
        <Text text="Agregar nueva clase" className="!text-2xl"></Text>
        <div className="flex flex-wrap">
            <Field text="Grupo:" type="text" placeholder="" inputRef={props.groupReference}></Field>
            <Field text="Grado:" type="text" placeholder="" inputRef={props.gradeReference}></Field>
        </div>
        <Field text="Nombre del maestro" type="text" placeholder="" inputRef={props.nameReference}></Field>
        <Field text="Apellidos del maestro" type="text" placeholder="" inputRef={props.lastNameReference}></Field>
        <Button text="Guardar" onClick={props.onClick}></Button>
    </div>
}

export default NewClass