import { useState } from "react";
import { validate } from "../../data/users";
import H1 from "../atoms/H1";
import H3 from "../atoms/H3";
import Field from "../molecules/Field";
import Button from "../atoms/Button";

function FormLogin() {

    const [name, setName] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = (event) => {
        if (!name.trim() || !password.trim()) {
            alert("Complete los campos");
        }else if (validate(name, password)) {
            alert("Logueado exitosamente");
        }else {
            alert("Error, llene los campos debidamente");
        }
    }


    return (
        <div className="rounded bg-slate-900 h-3/5 w-2/5 shadow-md shadow-slate-500/40 flex justify-center">
            <div className="flex h-full w-3/5 flex-col items-center justify-center bg-slate-900">
                <H1 text="Login" className="mb-4 my-0" />
                <H3 text="Escuela Chiapa Unida" className="mb-4" />
                <Field type="text" placeholder="Usuario" text="Usuario" className="mb-4" val={name} fnVal={setName}/>
                <Field type="password" placeholder="****" text="Contraseña" className="mb-4" val={password} fnVal={setPassword}/>
                <Button text="Sign up" className="mt-4 shadow-slate-500/40 bg-slate-500 text-white" onClick={handleLogin}/>
            </div>
        </div>
    );
}

export default FormLogin;
