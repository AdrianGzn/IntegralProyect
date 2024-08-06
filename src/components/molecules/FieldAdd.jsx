import React from "react";
import Text from "../atoms/Text";
import InputAdd from "../atoms/InputAdd"; // Asegúrate de que este componente esté estilizado correctamente

const FieldAdd = ({ text, type, placeholder, value, onChange, className, classNameText, classNameInput }) => {
    return (
        <div className={`m-2 flex flex-col w-3/5 items-center ${className}`}>
            <Text className={`m-0 mb-1 !text-xs ${classNameText}`} text={text} />
            <InputAdd
                className={`mx-0 w-full h-[65%] text-white ${classNameInput}`}
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
            />
        </div>
    );
};

export default FieldAdd;
