import { Link } from "react-router-dom";

function AnchorHome(props) {
    return <Link to="/">
            <p className={`text-lime-500 mx-5 ${props.className || ''}`}>Home</p>
        </Link>
}

export default AnchorHome;