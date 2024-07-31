import Text from "../atoms/Text";
import Row from "../molecules/Row";
import React from "react"
function Table(props) {
    const columns = Object.keys(props.data[0]).length;
    const w = columns * 95;
    const h = (props.data.length + 1) * 64 + 8;

    return (
        <div 
            className="border-4 border-white rounded-md overflow-x-auto scroll-snap-x-mandatory"
            style={{ maxWidth: "100%", width: `${w}px`, height: `${h}px` }}
        >
            <div 
                className={`max-h-16 bg-slate-800 flex justify-center items-center border-2 border-gray-700`}
                style={{width: `calc(${w}px - 8px)`}}
            >
                <Text text={props.title} />
            </div>
            <div 
                className="flex flex-wrap"
                style={{width: `calc(${w}px - 8px)`}}
            >
                {props.data.map((row, index) => (
                    <Row key={index} rowData={row} />
                ))}
            </div>
        </div>
    );
}

export default Table;
