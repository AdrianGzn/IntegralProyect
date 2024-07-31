import React from "react";
function Button(props) {
    return (
        <button 
            onClick={props.onClick} 
            className={`h-12 w-3/5 m-5 rounded-md bg-slate-500 text-white flex items-center justify-center max-w-52 ${props.className || ''}`}
        >
            {props.text}
        </button>
    );
}

export default Button;
