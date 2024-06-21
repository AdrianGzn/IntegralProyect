function H1(props) {
    return <h1 className={`text-4xl text-white m-5 ${props.className || ''}`}>{props.text}</h1>
}

export default H1;