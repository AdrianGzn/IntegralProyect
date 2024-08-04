import Text from "../atoms/Text";
import Field from "../molecules/Field";
import Button from "../atoms/Button";
import React from "react";

function AddTeacher(props) {
    const { nameReference, lastNameReference, passReference, onBlur, onClick } = props;

    return (
        <div className="w-4/5 p-5 bg-slate-700 rounded-md flex flex-col flex-wrap items-center">
            <Text text="Dar de alta a profesor" className="!text-2xl !my-0" />
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
                text="Contraseña:"
                type="password"
                placeholder="Contraseña"
                ref={passReference}
            />
            <Button
                text="Guardar"
                onClick={onClick}
            />
        </div>
    );
}

export default AddTeacher;
