import Text from "../atoms/Text";
import Input from "../atoms/Input";

function Field({ text, type, placeholder, inputRef, className }) {
    return (
        <div className={`m-2 flex flex-col w-3/5 ${className} items-center`}>
            <Text className="m-0 mb-1 !text-xs" text={text} />
            <Input
                className="mx-0 w-15 h-[65%] text-white"
                type={type}
                placeholder={placeholder}
                ref={inputRef}
            />
        </div>
    );
}

export default Field;
