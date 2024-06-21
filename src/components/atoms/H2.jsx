function H2(props) {
    return <h2 className={`text-base text-white ${props.className || ''}`}>
            {props.text}
        </h2>
}

export default H2;