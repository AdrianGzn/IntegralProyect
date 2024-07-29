import { useRef, useState, useEffect, useContext } from "react";
import UserContext from "../../context/userContext";
import { useNavigate } from "react-router-dom";
import Text from "../atoms/Text";
import Field from "../molecules/Field";
import Button from "../atoms/Button";
import Swal from "sweetalert2";
import '@sweetalert2/theme-bulma';
import { getRole, setUser, printUser } from "../../data/userActual";

function FormLogin() {
    const { user } = useContext(UserContext);
    const [redirect, setRedirect] = useState(false);
    const nameRef = useRef(null);
    const passwordRef = useRef(null);
    const navigate = useNavigate();

    const handleLogin = async (event) => {
        event.preventDefault();

        fetch(`${import.meta.env.VITE_URL}/personal/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            },
            body: JSON.stringify({
                name: nameRef.current.value,
                password: passwordRef.current.value,
            })
        })
        .then(response => {
            if (response.ok) {
                localStorage.setItem('token', response.headers.get('Authorization'))
                return response.json()
            }
        })
        .then(data => {
            console.log(data);

            let role = "";
            if (data.personal.role === 1) {
                role = "teacher";
            } else if (data.personal.role === 2) {
                role = "management";
            } else if (data.personal.role === 3) {
                role = "escolarControl";
            } else {
                role = "";
            }

            localStorage.setItem('token', data.personal.token);
            localStorage.setItem('personal_id', data.personal.personal_id);
            localStorage.setItem('name', data.personal.name);
            localStorage.setItem('role', role);

            setUser();
            setRedirect(true);

            Swal.fire({
                title: "Sesión iniciada con éxito",
                text: "Bienvenido",
                icon: "success"
            });
        })
        .catch(error => {
            Swal.fire({
                title: "Error",
                text: "No se pudo iniciar sesión",
                icon: "error"
            });
            console.log("Error:", error);
        });

    }

    const validateUsername = () => {
        const usernamePattern = /^[a-zA-Z]{1,10}$/;
        if (!usernamePattern.test(nameRef.current.value)) {
            Swal.fire({
                title: "Error",
                text: "El nombre de usuario debe contener entre 1 y 10 letras sin números.",
                icon: "error"
            });
        }
    };

    const validatePassword = () => {
        const passwordPattern = /^[a-zA-Z0-9]{1,10}$/;
        if (!passwordPattern.test(passwordRef.current.value)) {
            Swal.fire({
                title: "Error",
                text: "La contraseña debe contener entre 1 y 10 caracteres alfanuméricos.",
                icon: "error"
            });
        }
    };

    useEffect(() => {
        if (redirect) {
            printUser();
            switch (getRole()) {
                case "management":
                    navigate("/management/home");
                    break;
                case "teacher":
                    navigate("/teacher/home");
                    break;
                case "escolarControl":
                    navigate("/escolarControl/home");
                    break;
                default:
                    navigate("/");
            }
        }
        setRedirect(false);
    }, [redirect]);

    return (
        <div className="rounded bg-slate-900 h-3/5 w-2/5 shadow-md shadow-slate-500/40 flex justify-center">
            <div className="flex h-full w-3/5 min-w-80 flex-col items-center justify-center bg-slate-900">
                <Text text="Login" className="mb-4 my-0 !text-4xl" />
                <Text text="Escuela Chiapa Unida" className="mb-4 !text-xs" />
                <Field
                    type="text"
                    placeholder="Usuario"
                    text="Usuario"
                    className="mb-4"
                    inputRef={nameRef}
                    onBlur={validateUsername}
                />
                <Field
                    type="password"
                    placeholder="****"
                    text="Contraseña"
                    className="mb-4"
                    inputRef={passwordRef}
                    onBlur={validatePassword}
                />
                <Button
                    text="Iniciar sesión"
                    className="mt-4 shadow-slate-500/40 bg-slate-500 text-white"
                    onClick={handleLogin}
                />
            </div>
        </div>
    );
}

export default FormLogin;
