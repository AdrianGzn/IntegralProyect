import Cell from "../atoms/Cell";
import React from "react";
function Row(props) {
    return <div className="w-full h-16 flex">
        {
            Object.values(props.rowData).map((cellData, index) => (
                <Cell key={index} text={cellData} />
            ))
        }
    </div>
}

export default Row;