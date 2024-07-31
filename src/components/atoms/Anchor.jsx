import { Link } from "react-router-dom";
import React from "react";
function Anchor(props) {
    return <div>
        <Link to={props.to}>
            <p className={`text-2xl text-white mx-5 hover:underline decoration-lime-500 ${props.className || ''}`}>{props.text}</p>
        </Link>
    </div>
}

export default Anchor;