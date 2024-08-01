import Text from "../atoms/Text";
import Field from "../molecules/Field";
import Button from "../atoms/Button";
import React from "react";

function AddAlumn(props) {
    const { nameReference, lastNameReference, classReference, onBlur, onClick } = props;

    return (
        <div className="w-full p-5 bg-slate-700 rounded-md">
            <Text text="Agregar Alumno" className="!text-2xl" />
            <Field
                text="Nombre:"
                type="text"
                placeholder="Nombre"
                ref={nameReference}
                onBlur={onBlur}
            />
            <Field
                text="Apellidos:"
                type="text"
                placeholder="Apellidos"
                ref={lastNameReference}
                onBlur={onBlur}
            />
            <Field
                text="Clase:"
                type="text"
                placeholder="Clase"
                ref={classReference}
                onBlur={onBlur}
            />
            <Button
                text="Guardar"
                onClick={onClick}
            />
        </div>
    );
}

export default AddAlumn;
