function Button(props) {
    return <button onClick={props.onClick} className={`h-9 w-3/5 m-5 rounded-md ${props.className || ''}`}>
        <p>{props.text}</p>
    </button>
}

export default Button;