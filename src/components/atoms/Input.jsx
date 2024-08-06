import React from 'react';

const Input = React.forwardRef(({ type = 'text', placeholder, className = '', onBlur }, ref) => {
    return (
        <input
            type={type}
            placeholder={placeholder}
            className={`w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${className}`}
            ref={ref}
            onBlur={onBlur}
        />
    );
});

export default Input;
