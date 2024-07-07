import H3 from "../atoms/H3";
import Input from "../atoms/Input";

function Field({ text, type, placeholder, val, className }) {
    return (
        <div className={`m-2 flex flex-col w-3/5 ${className} items-center`}>
            <H3 className="m-0 mb-1" text={text} />
            <Input
                className="mx-0"
                type={type}
                placeholder={placeholder}
                val={val}
            />
        </div>
    );
}

export default Field;