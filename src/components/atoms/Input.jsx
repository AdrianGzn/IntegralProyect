import { useCallback } from "react";

function Input(props) {
    const handlerOnChange = useCallback(
        (event) => {
            props.fnVal(event.target.value);
        },
        [props]
    );

    return (
        <input
            className={`w-full bg-slate-500 rounded-md ${props.className || ''}`}
            type={props.type}
            placeholder={props.placeholder}
            value={props.val}
            onChange={handlerOnChange}
        />
    );
}

export default Input;