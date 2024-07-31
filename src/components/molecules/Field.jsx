import Text from "../atoms/Text";
import Input from "../atoms/Input";
import React from "react";
function Field({ text, type, placeholder, inputRef, className, classNameText, classNameInput, onBlur }) {
    return (
        <div className={`m-2 flex flex-col w-3/5 items-center ${className}`}>
            <Text className={`m-0 mb-1 !text-xs ${classNameText}`} text={text} />
            <Input
                className={`mx-0 w-15 h-[65%] text-white ${classNameInput}`}
                type={type}
                placeholder={placeholder}
                ref={inputRef}
                onBlur={onBlur}
            />
        </div>
    );
}

export default Field;
