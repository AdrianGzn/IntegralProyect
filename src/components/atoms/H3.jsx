function H3(props) {
    return (
        <h3 className={`text-sm text-white ${props.className || ''}`}>
            {props.text}
        </h3>
    );
}

export default H3;
