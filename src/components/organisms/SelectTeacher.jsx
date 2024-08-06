import React from 'react';

const SelectTeacher = ({ options, reference, onClick, grades, onGradeChange }) => {
    return (
        <div className="flex items-center mb-4">
            <select ref={reference} className="p-2 border border-gray-300 rounded-md">
                <option value="">Seleccione un profesor</option>
                {options.map((option, index) => (
                    <option key={index} value={option}>
                        {option}
                    </option>
                ))}
            </select>
            <button
                onClick={onClick}
                className="ml-4 bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition-colors font-bold shadow-lg"
            >
                Guardar Selección
            </button>
        </div>
    );
};

export default SelectTeacher;
