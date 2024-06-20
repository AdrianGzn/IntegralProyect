import Anchor from "../atoms/Anchor";
import AnchorHome from "../atoms/AnchorHome";
import getOptions from "../../data/menuOptions";
import InputSearch from "../atoms/InputSearch";

function Header() {
    let options = getOptions().teacher;

    return <header className="bg-slate-900 w-full h-[20vh] flex items-center">
        <AnchorHome />
        <InputSearch></InputSearch>

        {
            options.map(item => (
                <Anchor key={item.text+item.link} text={item.text} to={item.link} />
            ))
        }
    </header>
}

export default Header;