import React, { useState } from 'react';
import Swal from 'sweetalert2';

function DeleteAlumn({ onDelete, onIdChange, isDeleting }) {
    const [name, setName] = useState(""); // State to store the name of the alumnus to delete

    const handleNameChange = (e) => {
        setName(e.target.value);
        onIdChange(e.target.value); // Pass the name to parent
    };

    const handleDelete = () => {
        if (name.trim() === "") {
            Swal.fire({
                icon: 'warning',
                title: 'No name provided',
                text: 'Please enter a name to delete an alumnus.',
            });
            return;
        }

        onDelete(); // Trigger delete action
    };

    return (
        <div className="w-full max-w-md bg-gray-800 p-6 rounded-lg">
            <h2 className="text-2xl text-white mb-4">Baja de Alumno</h2>
            <div className="mb-4">
                <label htmlFor="alumnName" className="block text-white mb-2">Nombre del Alumno:</label>
                <input
                    id="alumnName"
                    type="text"
                    placeholder="Nombre del Alumno"
                    value={name}
                    onChange={handleNameChange}
                    className="w-full px-3 py-2 bg-gray-900 text-white rounded"
                />
            </div>
            <button
                onClick={handleDelete}
                disabled={isDeleting}
                className={`w-full px-4 py-2 bg-red-600 text-white rounded ${isDeleting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-red-700'}`}
            >
                {isDeleting ? 'Eliminando...' : 'Eliminar Alumno'}
            </button>
        </div>
    );
}

export default DeleteAlumn;
