import { Navigate } from "react-router-dom";
import { getRole } from "../../../data/userActual";
import React from "react";

function ProtectedManagement({ children, redirectTo = "/" }) {
    const role = getRole();

    console.log(role);

    if (role === "management") {
        return children;
    } else {
        return <Navigate to={redirectTo} />;
    }
}

export default ProtectedManagement;