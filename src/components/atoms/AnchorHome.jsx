import { Link } from "react-router-dom";

function AnchorHome() {
    return <Link to="/">
            <p className="text-lime-500 m-5">Home</p>
        </Link>
}

export default AnchorHome;