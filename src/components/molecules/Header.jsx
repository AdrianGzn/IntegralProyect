import Anchor from "../atoms/Anchor";
import AnchorHome from "../atoms/AnchorHome";

function Header() {
    return <header className="bg-slate-900 w-full h-[20vh] flex items-center">
        <AnchorHome></AnchorHome>
        <Anchor text="hola" to=""></Anchor>
    </header>
}

export default Header;