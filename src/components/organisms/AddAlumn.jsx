import Text from "../atoms/Text";
import Field from "../molecules/Field";
import Button from "../atoms/Button";
import React from "react";
import FieldAdd from "../molecules/FieldAdd";

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
            <FieldAdd
                text="Nombre:"
                type="text"
                placeholder="Nombre"
                value={props.name}
                onChange={handleNameChange}
                className="!my-0"
                classNameInput="bg-gray-800"
            />
            <FieldAdd
                text="Apellido paterno:"
                type="text"
                placeholder="Paterno"
                value={props.fathers}
                onChange={handleFathersChange}
                className="!my-0"
                classNameInput="bg-gray-800"
            />
            <FieldAdd
                text="Apellido materno:"
                type="text"
                placeholder="Materno"
                value={props.mothers}
                onChange={handleMothersChange}
                className="!my-0"
                classNameInput="bg-gray-800"
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
