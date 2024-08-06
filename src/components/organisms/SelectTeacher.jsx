import React from 'react';
import Button from '../atoms/Button';

const SelectTeacher = ({ onClick, options, reference }) => {
    return (
        <div className="w-full flex flex-col items-center">
            <select
                ref={reference}
                className="w-full h-10 text-white bg-gray-700 border border-gray-500 rounded-md px-2 py-1"
            >
                <option value="">Seleccione un profesor</option>
                {options.map((option, index) => (
                    <option key={index} value={option}>
                        {option}
                    </option>
                ))}
            </select>
            <Button
                text="Guardar"
                onClick={onClick}
                className="mt-4"
            />
        </div>
    );
};

export default SelectTeacher;

