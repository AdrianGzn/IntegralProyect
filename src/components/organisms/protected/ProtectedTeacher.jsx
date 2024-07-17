import { Navigate } from "react-router-dom";
import { getRole } from "../../../data/userActual";

function ProtectedTeacher({ children, redirectTo = "/" }) {
    const role = getRole();

    if (role === "teacher") {
        return children;
    } else {
        return <Navigate to={redirectTo} />;
    }
}

export default ProtectedTeacher;
