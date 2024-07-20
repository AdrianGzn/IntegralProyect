import Anchor from "../atoms/Anchor";
import AnchorHome from "../atoms/AnchorHome";
import Button from "../atoms/Button";
import { getOptions } from "../../data/menuOptions";
import { clearUser, getRole } from "../../data/userActual";
import { useNavigate } from "react-router-dom";

function Header({ role, onClick }) {
    let options = getOptions()[role];
    const navigate = useNavigate();

    const logOut = () => {
            console.log("get it xD");
            console.log(getRole());
            clearUser();
            console.log(getRole());
            navigate("/");
    }

    return (
        <header className="bg-slate-900 w-full min-h-[20vh] mb-5 flex justify-between items-center">
            <div className="flex items-center flex-wrap">
                <AnchorHome />

                {options.map(item => (
                    <Anchor key={item.text + item.link} text={item.text} to={item.link} />
                ))}
            </div>

            <div className="inline-block right-0">
                <Button text="Cerrar sesión" onClick={logOut}></Button>
            </div>
        </header>
    );
}

export default Header;
