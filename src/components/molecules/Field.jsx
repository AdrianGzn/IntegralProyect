import H2 from "../atoms/H2";
import Input from "../atoms/Input";

function Field(props) {
    return <div className="m-5">
        <H2 className="m-0" text={props.text}/>
        <Input className="m-0" type={props.type} placeholder={props.placeholder}/>
    </div>
}

export default Field;