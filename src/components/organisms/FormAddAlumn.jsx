import Field from "../molecules/Field";
import Text from "../atoms/Text";
import Button from "../atoms/Button";
import React from "react";

function FormAddAlumn(props) {
    return (
        <div className="w-full my-5 bg-slate-700 rounded-md">
            <Text text="Añadir alumno"></Text>
            <Field
                text="Nombre"
                placeholder="Nombre"
                ref={props.referenceName} 
            />
            <Field
                text="Apellidos"
                placeholder="Apellidos"
                ref={props.referenceLastName}
            />
            <Button
                text="Guardar"
                onClick={props.onClick}
            />
        </div>
    );
}

export default FormAddAlumn;
