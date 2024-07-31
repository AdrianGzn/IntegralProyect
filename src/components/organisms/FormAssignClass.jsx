import Text from "../atoms/Text";
import Field from "../molecules/Field";
import Button from "../atoms/Button";
import React from "react";

function FormAssignClass(props) {
    return (
        <div className="w-full my-5 bg-slate-700 rounded-md">
            <Text text="Asignar a una clase"></Text>
            <Field
                text="Nombre del profesor a cargo de la clase:"
                ref={props.referenceName}
            />
            <Field
                text="Nombre del profesor a cargo de la clase:"
                ref={props.referenceLastName}
            />
            <Button
                text="Agregar"
                onClick={props.onClick}
            />
            <Button
               text="Generar Lista"
               onClick={props.onClick}
            ></Button>
        </div>
    );
}

export default FormAssignClass;
