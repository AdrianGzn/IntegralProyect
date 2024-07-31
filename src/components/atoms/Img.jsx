import React from "react";
function Img(props) {
    return <img src={props.link} className={`w-20 h-20 ${props.className || ''}`}></img>
}

export default Img;