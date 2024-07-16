import Text from "./Text";

function Cell(props) {
    return (
        <div 
            className="w-24 h-full bg-slate-800 flex justify-center items-center border-2 border-gray-700 overflow-hidden text-ellipsis whitespace-nowrap"
        >
            <Text text={props.text} />
        </div>
    );
}

export default Cell;