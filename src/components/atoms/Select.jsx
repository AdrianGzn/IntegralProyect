import { forwardRef } from 'react';
import React from 'react';
const Select = forwardRef(({ options, className }, ref) => {
    return (
        <select ref={ref} className={`mx-2 my-3 ${className || ''}`}>
            {options.map((option, index) => (
                <option key={index} value={option}>
                    {option}
                </option>
            ))}
        </select>
    );
});

export default Select;
