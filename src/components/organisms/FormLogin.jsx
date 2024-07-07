import { useState } from "react";
import { useNavigate } from "react-router-dom";
import H1 from "../atoms/H1";
import H3 from "../atoms/H3";
import Field from "../molecules/Field";
import Button from "../atoms/Button";
import { useRef } from "react";

function FormLogin() {
    const name = useRef(null);
    const password = useRef(null);
    const navigate = useNavigate();

    const handleLogin = async (event) => {
        event.preventDefault();
        
        try {
            const response = await fetch(`${import.meta.env.VITE_URL}/personal/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                },
                body: JSON.stringify({
                    "name": name.current.value,
                    "password": password.current.value,
                })
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem('token', data.token);
                navigate('/management/home'); // Ruta d mientras
            } else {
                console.error('Error:', data.message);
                alert('Nombre de usuario o contraseña incorrectos');
            }
        } catch (error) {
            console.error('Error de conexión:', error);
            alert('Error de conexión con el servidor');
        }
    }

    return (
        <div className="rounded bg-slate-900 h-3/5 w-2/5 shadow-md shadow-slate-500/40 flex justify-center">
            <div className="flex h-full w-3/5 flex-col items-center justify-center bg-slate-900">
                <H1 text="Login" className="mb-4 my-0" />
                <H3 text="Escuela Chiapa Unida" className="mb-4" />
                <Field type="text" placeholder="Usuario" text="Usuario" className="mb-4" val={name.current} />
                <Field type="password" placeholder="****" text="Contraseña" className="mb-4" val={password.current} />

                <Button text="Sign up" className="mt-4 shadow-slate-500/40 bg-slate-500 text-white" onClick={handleLogin} />
            </div>
        </div>
    );
}

export default FormLogin;
