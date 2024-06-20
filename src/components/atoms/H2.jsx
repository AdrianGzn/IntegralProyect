function H2(props) {
    return <h2 className={`text-base text-white m-5 ${props.className || ''}`}>
            {props.text}
        </h2>
}

export default H2;