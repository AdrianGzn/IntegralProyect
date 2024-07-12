import Text from "../atoms/Text"
import Img from "../atoms/Img";

function HeroSection(props) {
    return (
        <div className="h-full w-full flex flex-col lg:flex-row justify-evenly items-center">
            <div className="w-full lg:w-[40%] flex items-center justify-center lg:justify-start min-w-60 mb-4 lg:mb-0">
                <div className="text-center lg:text-left">
                    <Text text="Escuela Chiapa unida" className="font-thin !text-4xl"></Text>
                    <Text text={props.welcome} className="!text-4xl"></Text>
                </div>
            </div>
            <div className="w-full lg:w-[40%] flex items-center justify-center lg:justify-end min-w-72">
                <Img link="/user-icon.png" className="w-48 h-48 lg:w-96 lg:h-80"></Img>
            </div>
        </div>
    );
}

export default HeroSection;
