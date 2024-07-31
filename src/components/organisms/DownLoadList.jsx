import { Text } from "../atoms/Text";
import Button from "../atoms/Button";

function DownloadList(props) {
    return <div className="w-full bg-slate-700 rounded-md ">
        <Text text="Descargar lista"></Text>
        <Button onClick={props.onClick}></Button>
    </div>
}

export default DownloadList;