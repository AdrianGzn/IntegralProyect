import Text from "../atoms/Text";
import Field from "../molecules/Field";
import Button from "../atoms/Button";
import React from "react";

function AddAlumn(props) {
    const { nameReference, lastNameReference, classReference, onClick } = props;

    return (
        <div className="w-full p-5 bg-slate-700 rounded-md flex flex-wrap justify-center">
            <Text text="Dar de alta a alumno" className="!text-2xl" />
            <Field
                text="Nombre:"
                type="text"
                placeholder="Nombre"
                ref={nameReference}
            />
            <Field
                text="Apellidos:"
                type="text"
                placeholder="Apellidos"
                ref={lastNameReference}
            />
            <Button
                text="Guardar"
                onClick={onClick}
            />
        </div>
    );
}

export default AddAlumn;
