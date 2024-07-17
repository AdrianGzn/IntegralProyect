import { Navigate } from "react-router-dom";
import { getRole } from "../../../data/userActual";

function ProtectedManagement({ children, redirectTo = "/" }) {
    const role = getRole();

    if (role === "management") {
        return children;
    } else {
        return <Navigate to={redirectTo} />;
    }
}

export default ProtectedManagement;
