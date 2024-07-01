import { Link } from "react-router-dom";

function Anchor(props) {
    return <div>
        <Link to={props.to}>
            <p className="text-white m-5 hover:underline decoration-lime-500">{props.text}</p>
        </Link>
    </div>
}

export default Anchor;