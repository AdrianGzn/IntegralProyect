import H3 from "../atoms/H3";
import Input from "../atoms/Input";

function Field(props) {
    return (
        <div className="m-2 flex flex-col items-center w-3/5">
            <H3 className="m-0 mb-1" text={props.text} />
            <Input className="m-0" type={props.type} placeholder={props.placeholder} val={props.val} fnVal={props.fnVal}/>
        </div>
    );
}

export default Field;