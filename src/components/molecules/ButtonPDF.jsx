import Text from "../atoms/Text";
import IconPDF from "../atoms/IconPDF";
import React from "react";
function ButtonPDF(props) {
    return <div>
        <button onClick={props.onClick} className={`h-28 w-20 m-5 rounded-md bg-slate-500 text-white flex justify-center items-center flex-wrap hover:bg-slate-400 ${props.className || ''}`}>
            <IconPDF />
            <Text text={props.matricle} className="!text-xs"></Text>
            <Text text={props.text} className="text-xs"></Text>
        </button>
    </div>
}

export default ButtonPDF;

