import Anchor from "../atoms/Anchor";
import AnchorHome from "../atoms/AnchorHome";
import Button from "../atoms/Button";
import { getOptions } from "../../data/menuOptions";
import { clearUser, getRole } from "../../data/userActual";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import '@sweetalert2/theme-bulma';
import React from "react";

function Header({ role, onClick }) {
    const options = getOptions()[role] || [];
    const navigate = useNavigate();

    const logOut = () => {
        try {
            console.log(getRole()); // Log current role before clearing user
            clearUser(); // Clear user data
            console.log(getRole()); // Log role again to confirm user data is cleared
            navigate("/"); // Redirect to home page

            Swal.fire({
                title: "Cierre de sesión exitoso",
                text: "Gracias por tu visita",
                icon: "success"
            });
        } catch (error) {
            Swal.fire({
                title: "Error",
                text: "No se pudo cerrar sesión",
                icon: "error"
            });
            console.error("Error:", error); // Use console.error for errors
        }
    }

    return (
        <header className="bg-slate-900 w-full min-h-[20vh] mb-5 flex justify-between items-center">
            <div className="flex items-center flex-wrap">
                <AnchorHome />

                {options.map(item => (
                    <Anchor key={item.text + item.link} text={item.text} to={item.link} />
                ))}
            </div>

            <div className="inline-block right-0">
                <Button text="Cerrar sesión" onClick={logOut} />
            </div>
        </header>
    );
}

export default Header;
