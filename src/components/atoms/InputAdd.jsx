import React from 'react';

const InputAdd = ({ type = 'text', placeholder, value, onChange, className = '' }) => {
    return (
        <input
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            className={`w-full p-2 border border-gray-300 rounded-md bg-white text-black placeholder-gray-500 ${className}`}
        />
    );
};

export default InputAdd;
