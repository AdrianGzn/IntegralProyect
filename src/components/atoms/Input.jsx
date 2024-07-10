import React from 'react';

const Input = React.forwardRef(({ type, placeholder, className }, ref) => {
    return (
        <input
            className={`w-full bg-slate-500 rounded-md ${className || ''}`}
            type={type}
            ref={ref}
            placeholder={placeholder}
        />
    );
});

export default Input;
