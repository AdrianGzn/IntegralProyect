import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import H1 from "../atoms/H1";
import H3 from "../atoms/H3";
import Field from "../molecules/Field";
import Button from "../atoms/Button";
import Swal from "sweetalert2";
import '@sweetalert2/theme-bulma'


function FormLogin() {
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
                    //ruta management xD
                    return response.json()
                } else {
                    Swal.fire({
                        title: "login",
                        text: "error de login",
                        icon: "error"
                    })
                }
            })
            .then(data => {
                navigate('management/home');
                console.log(data.token);

            })
            .catch(error => {
                console.log("Error: ", error);
            });
    };

    return (
        <div className="rounded bg-slate-900 h-3/5 w-2/5 shadow-md shadow-slate-500/40 flex justify-center">
            <div className="flex h-full w-3/5 min-w-80 flex-col items-center justify-center bg-slate-900">
                <H1 text="Login" className="mb-4 my-0" />
                <H3 text="Escuela Chiapa Unida" className="mb-4" />
                <Field type="text" placeholder="Usuario" text="Usuario" className="mb-4" inputRef={nameRef} />
                <Field type="password" placeholder="****" text="Contraseña" className="mb-4" inputRef={passwordRef} />
                <Button text="Iniciar sesión" className="mt-4 shadow-slate-500/40 bg-slate-500 text-white" onClick={handleLogin} />
            </div>
        </div>
    );
}

export default FormLogin;
