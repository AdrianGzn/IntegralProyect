function H3(props) {
    return (
        <h3 className={`text-xs text-white ${props.className || ''}`}>
            {props.text}
        </h3>
    );
}

export default H3;
