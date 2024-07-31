import Button from "../atoms/Button";
import Text from "../atoms/Text";
import React from "react";

function DownLoadList(props) {
    return <div className="w-full bg-slate-700 rounded-md">
        <Text text="Descargar lista"></Text>
        <Button text="Descargar" onClick={props.onClick}></Button>
    </div>
}

export default DownLoadList;