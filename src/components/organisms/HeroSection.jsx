import HeroIcons from "../molecules/HeroIcons";
import H1 from "../atoms/H1";

function HeroSection(props) {
    return (
        <div className="h-full w-full flex justify-evenly">
            <div className="w-[40%] flex items-center">
                <div>
                    <H1 text="Escuela Chiapa unida" className="font-thin"></H1>
                    <H1 text={props.welcome}></H1>
                </div>
            </div>
            <div className=" w-[40%] flex items-center">
                <HeroIcons />
            </div>
        </div>
    );
}

export default HeroSection;
