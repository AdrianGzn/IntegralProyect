import Text from "../atoms/Text";
import Field from "../molecules/Field";
import Button from "../atoms/Button";
import React from "react";

function FormAssignClass(props) {
    return (
        <div className="w-full my-5 bg-slate-700 rounded-md flex flex-col flex-wrap justify-center">
            <div className="w-full flex justify-center"><Text text="Asignar alumnos a la clase de un maestro" className="!mb-0"></Text></div>
            <Field
                text="Nombre del profesor a cargo de la clase:"
                ref={props.referenceName}
            />
            <Field
                text="Apellido del profesor a cargo de la clase:"
                ref={props.referenceLastName}
            />
            <Button
                text="Agregar"
                onClick={props.onClick}
            />
        </div>
    );
}

export default FormAssignClass;
