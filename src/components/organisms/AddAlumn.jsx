import Text from "../atoms/Text";
import Field from "../molecules/Field";
import Button from "../atoms/Button";
import React from "react";

function AddAlumn(props) {
    return (
        <div className="w-4/5 my-5 bg-slate-700 rounded-md flex flex-col flex-wrap items-center">
            <Text text="Dar de alta a alumno" className="!text-2xl mb-0" />
            <Field
                text="Nombre:"
                type="text"
                placeholder="Nombre"
                ref={props.name}
                className="!my-0"
            />
            <Field
                text="Apellido paterno:"
                type="text"
                placeholder="Paterno"
                value={props.fathersLastNameReference}
                className="!my-0"
            />
            <Field
                text="Apellido materno:"
                type="text"
                placeholder="Materno"
                value={props.mothersLastNameReference}
                className="!my-0"
            />
            <Button
                text="Guardar"
                onClick={props.onClick}
                className="!mb-0"
            />
        </div>
    );
}

export default AddAlumn;
