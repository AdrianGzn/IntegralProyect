import Text from "./Text";

function Cell(props) {
    return <div className="h-full w-24 bg-slate-800 flex justify-center items-center border-2 border-gray-700">
        <Text text={props.text}></Text>
    </div>
}

export default Cell;