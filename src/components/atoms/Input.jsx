function Input(props) {
    return (
        <input
            className={`w-full bg-slate-500 rounded-md ${props.className || ''}`}
            type={props.type}
            ref={props.val}
            placeholder={props.placeholder}
        />
    );
}

export default Input;
