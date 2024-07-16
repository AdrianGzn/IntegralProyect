import Anchor from "../atoms/Anchor";
import AnchorHome from "../atoms/AnchorHome";
import { getOptions} from "../../data/menuOptions";
import InputSearch from "../atoms/InputSearch";
import { useState } from "react";

function Header({ role }) {
    const [value, setValue] = useState("")
    let options = getOptions()[role];

    return (
        <header className="bg-slate-900 w-full min-h-[20vh] mb-5 flex items-center flex-wrap">
            <AnchorHome />
            <InputSearch val={value} fnval={setValue} />
            {options.map(item => (
                <Anchor key={item.text + item.link} text={item.text} to={item.link} />
            ))}
        </header>
    );
}

export default Header;
