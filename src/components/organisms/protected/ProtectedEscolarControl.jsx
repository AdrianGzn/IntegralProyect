import { Navigate } from "react-router-dom";
import { getRole } from "../../../data/userActual";
import React from "react";

function ProtectedEscolarControl({ children, redirectTo = "/" }) {
    const role = getRole();

    console.log(role);

    if (role === "escolarControl") {
        return children;
    } else {
        return <Navigate to={redirectTo} />;
    }
}

export default ProtectedEscolarControl;