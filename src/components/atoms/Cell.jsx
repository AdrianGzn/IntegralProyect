import Text from "./Text";

function Cell(props) {
    return (
        <div className="w-24 h-full bg-slate-800 flex items-center border-2 border-gray-700 overflow-hidden text-ellipsis whitespace-pre-wrap" >
            <Text text={props.text} className="mx-2" />
        </div>
    );
}

export default Cell;