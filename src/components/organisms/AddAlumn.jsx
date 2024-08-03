import Text from "../atoms/Text";
import Field from "../molecules/Field";
import Button from "../atoms/Button";
import React from "react";

function AddAlumn(props) {
    return (
        <div className="w-full p-5 bg-slate-700 rounded-md flex flex-col flex-wrap justify-center">
            <Text text="Dar de alta a alumno" className="!text-2xl" />
            <Field
                text="Nombre:"
                type="text"
                placeholder="Nombre"
                ref={props.nameReference}
            />
            <Field
                text="Apellido paterno:"
                type="text"
                placeholder="Paterno"
                ref={props.fathersLastNameReference}
            />
            <Field
                text="Apellido materno:"
                type="text"
                placeholder="Materno"
                ref={props.mothersLastNameReference}
            />
            <Button
                text="Guardar"
                onClick={props.onClick}
            />
        </div>
    );
}

export default AddAlumn;
