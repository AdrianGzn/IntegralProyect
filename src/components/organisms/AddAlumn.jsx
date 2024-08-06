import Text from "../atoms/Text";
import Field from "../molecules/Field";
import Button from "../atoms/Button";
import React from "react";

function AddAlumn(props) {
    const handleNameChange = (event) => {
        props.fnvalName(event.target.value);
    };

    const handleFathersChange = (event) => {
        props.fnvalFathers(event.target.value);
    };

    const handleMothersChange = (event) => {
        props.fnvalMothers(event.target.value);
    };

    return (
        <div className="w-4/5 my-5 bg-slate-700 rounded-md flex flex-col flex-wrap items-center">
            <Text text="Dar de alta a alumno" className="!text-2xl mb-0" />
            <Field
                text="Nombre:"
                type="text"
                placeholder="Nombre"
                value={props.name}
                fnval={handleNameChange}  
                className="!my-0"
            />
            <Field
                text="Apellido paterno:"
                type="text"
                placeholder="Paterno"
                value={props.fathers}
                fnval={handleFathersChange}  // Utiliza handleFathersChange para actualizar el estado
                className="!my-0"
            />
            <Field
                text="Apellido materno:"
                type="text"
                placeholder="Materno"
                value={props.mothers}
                fnval={handleMothersChange}  // Utiliza handleMothersChange para actualizar el estado
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
