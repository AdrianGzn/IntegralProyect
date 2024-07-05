import HeroIcons from "../molecules/HeroIcons";
import H1 from "../atoms/H1";

function Herosection() {
    return (
        <div className="h-full w-full flex justify-evenly">
            <div className="w-[30%] flex items-center">
                <H1 text="Hola mundo"></H1>
            </div>
            <div className=" w-[40%] flex items-center">
                <HeroIcons />
            </div>
        </div>
    );
}

export default Herosection;
