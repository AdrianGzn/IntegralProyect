import Text from "../atoms/Text";
import Row from "../molecules/Row";

function Table(props) {
    const w = Object.keys(props.data[0]).length * 96;
    const h = (props.data.length + 1) * 64 + 8;

    return (
        <div style={{ width: `${w}px`, height: `${h}px` }} className="border-4 border-white rounded-md">
            <div className="max-h-16 bg-slate-800 flex justify-center items-center border-2 border-gray-700" >
                <Text text={props.title} />
            </div>
            <div className="flex flex-wrap">
                {props.data.map((row, index) => (
                    <Row key={index} rowData={row} />
                ))}
            </div>
        </div>
    );
}

export default Table;
