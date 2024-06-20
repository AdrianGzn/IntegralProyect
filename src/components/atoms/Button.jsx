function Button(props) {
    return <button onClick={props.onClick} className={`h-9 w-3/5 ${props.className} m-5 rounded-md`}>
        <p className={`${props.className}`}>{props.text}</p>
    </button>
}

export default Button;