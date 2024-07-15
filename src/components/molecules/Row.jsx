import Cell from "../atoms/Cell";

function Row(props) {
    return <div className="w-full max-h-16 flex">
        {
            Object.values(props.rowData).map((cellData, index) => (
                <Cell key={index} text={cellData} />
            ))
        }
    </div>
}

export default Row;