import { useRef, useState } from "react";
import FormLogin from "../components/organisms/FormLogin";
import Swal from "sweetalert2";

function Login() {
    /*const value = useRef('');
    const [error, setError] = useState("");

    const handlerBlurUsername = (e) => {
        const regex = /[^A-Z0-9$]/i;
        if(regex.test(value.current.value)){
            setError("Ok");
            setTimeout(() => {
                setError('')
                value.current.focus()},2000  
            )
        }
        else {
        Swal.fire({
            title: "Error", 
            text: "has breen an error",
            icon: "error"
        })}
    }*/

    return <div className="h-[100vh] w-full bg-slate-900 flex	justify-center items-center">
        <FormLogin></FormLogin>
        {/*<input value={value} onBlur={handlerBlurUsername} />
        <label>{error}</label>*/}
    </div>
}

export default Login;