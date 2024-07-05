import Icon from "../atoms/Icon";

function HeroIcons() {
    return<div className="w-[86%] h-[65%] relative">
            <div className="absolute top-0 left-0">
                <div className="absolute top-0 left-0">
                    <Icon type="circle" w="300" h="300" color="rgb(132 204 22)"></Icon>
                </div>
                <div className="absolute top-0 left-2.5">
                    <Icon type="person" w="280" h="280" color="rgb(15 23 42)"></Icon>
                </div>
            </div>
            <div className="absolute bottom-10 right-10">
                <Icon type="pen" w="110" h="110" color="rgb(15 23 42)"></Icon>
            </div>
        </div>
}

export default HeroIcons;