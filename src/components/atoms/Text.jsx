import React from "react";

function Text(props) {
    return <h1 className={`text-base text-white m-5 ${props.className || ''}`}>
            {props.text}
        </h1>
}

export default Text;