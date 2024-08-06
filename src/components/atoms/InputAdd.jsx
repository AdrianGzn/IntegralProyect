import React from 'react';

const InputAdd = ({ type, placeholder, value, onChange, className }) => {
    return (
        <input
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            className={`p-2 border border-gray-300 rounded-md ${className}`}
        />
    );
};

export default InputAdd;
