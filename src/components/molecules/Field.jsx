import { useEffect } from "react";
import H3 from "../atoms/H3";
import Input from "../atoms/Input";
import { useState } from "react";

function Field({ text, type, placeholder, val, fnVal, className }) {
    const [valor, setValor] = useState("")

    
    useEffect(() => {
     fetch("")
    .then(item => {
        if(item.response !== ok) {
            throw new Error("ingreso mal")
        }else {
            
        }
    } )       
    }, [valor])

    useEffect(() => {
        
    })

    return (
        <div className={`m-2 flex flex-col w-3/5 ${className}`}>
            <H3 className="m-0 mb-1" text={text} />
            <Input className="mx-0" type={type} placeholder={placeholder} value={val} onChange={(e) => fnVal(e.target.value)} />
        </div>
    );
}

export default Field;
