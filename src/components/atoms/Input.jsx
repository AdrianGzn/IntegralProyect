import { useCallback } from "react";


function Input(props) {

    const handlerOnChange = useCallback((event) => {
        props.fnval(event.target.value);
    }, [props.fnval]);

    return (
        <input
            className={`w-full bg-slate-500 rounded-md ${props.className || ''}`}
            type={props.type}
            placeholder={props.placeholder}
            value={props.value}
            onChange={handlerOnChange}
        />
    );
}


export default Input;
