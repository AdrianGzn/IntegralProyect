function Input(props) {

    const handlerOnChange = (event) => {
        props.fnVal(event.target.value)
    }

    return <input 
        className={`w-3/5 bg-slate-500 mx-5 rounded-md ${props.className || ''}`}
        type={props.type}
        placeholder={props.placeholder}
        value={props.val} 
        onChange={handlerOnChange}
    ></input>
}

export default Input;