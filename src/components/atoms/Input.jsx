function Input(props) {
    return <input className={`h-1/6 w-3/5 bg-slate-500 m-5 rounded-md
         ${props.className || ''}`}  type={props.type} placeholder={props.placeholder}></input>
}

export default Input;