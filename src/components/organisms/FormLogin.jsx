import H1 from "../atoms/H1";
import H3 from "../atoms/H3";
import Field from "../molecules/Field";
import Button from "../atoms/Button";

function FormLogin() {
    return <div className="rounded bg-slate-900 h-3/5 w-2/5 shadow-md shadow-slate-500/40 flex justify-center">
        <div className="h-full w-3/5">
            <div className="w-full flex justify-center">
                <H1 text="Login"></H1>
            </div>
            
            <H3 text="Escuela Chiapa Unida"></H3>
            <Field type="text" placeholder="Usuario" text="Usuario" className="m-0"></Field>
            <Field type="password" placeholder="****" text="Contraseña"></Field>
            
            <div className="w-full flex justify-center">
                <Button text="Sign up" className="bg-slate-500 text-white"></Button>
            </div>
        </div>
    </div>
}

export default FormLogin;