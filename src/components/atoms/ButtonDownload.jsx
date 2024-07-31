import React from "react";
function ButtonDownload(props) {

    return(
        <button 
            onClick={props.onClick} 
            className={`h-8 w-3/5 m-5 rounded-md bg-lime-500 text-white flex items-center justify-center max-w-52 ${props.className || ''}`}
        >
            {props.text}
        </button>
    )
}

export default ButtonDownload;