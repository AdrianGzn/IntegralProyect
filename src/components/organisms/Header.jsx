import Anchor from "../atoms/Anchor";
import AnchorHome from "../atoms/AnchorHome";
import getOptions from "../../data/menuOptions";
import InputSearch from "../atoms/InputSearch";

function Header({ role }) {
    let options = getOptions()[role];

    return (
        <header className="bg-slate-900 w-full min-h-[20vh] mb-5 flex items-center flex-wrap">
            <AnchorHome />
            <InputSearch />
            {options.map(item => (
                <Anchor key={item.text + item.link} text={item.text} to={item.link} />
            ))}
        </header>
    );
}

export default Header;
