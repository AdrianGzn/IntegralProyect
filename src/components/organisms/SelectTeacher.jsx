import Select from "../atoms/Select";
import Button from "../atoms/Button";
import React from "react";

function SelectTeacher(props) {
    return (
        <div>
            <Select options={props.options} ref={props.reference} />
            <Button onClick={props.onClick} text="Guardar" />
        </div>
    );
}

export default SelectTeacher;
