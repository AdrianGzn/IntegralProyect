import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getRole } from "../../data/userActual";

function AnchorHome(props) {
    const [direction, setDirection] = useState("");

    useEffect (() => {
        const role = getRole();

        switch (role) {
            case "escolarControl":
                setDirection("/escolarControl/home");
                break;
            case "teacher":
                setDirection("/teacher/home");
                break;
            case "management": 
                setDirection("/management/home");
                break;
            default:
                setDirection("/");
        }
    }, []);

    return <Link to={direction}>
            <p className={`text-2xl text-lime-500 mx-5 ${props.className || ''}`}>Home</p>
        </Link>
}

export default AnchorHome;