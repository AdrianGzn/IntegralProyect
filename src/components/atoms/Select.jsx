import { forwardRef } from 'react';

const Select = forwardRef(({ options }, ref) => {
    return (
        <select ref={ref} className="mx-2 my-3">
            {options.map((option, index) => (
                <option key={index} value={option}>
                    {option}
                </option>
            ))}
        </select>
    );
});

export default Select;
