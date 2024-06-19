import { Link } from "react-router-dom";

function AnchorHome() {
    return <Link to="/home">
            <p class="text-lime-500 m-5">Home</p>
        </Link>
}

export default AnchorHome;