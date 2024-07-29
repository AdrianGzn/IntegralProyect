import React from 'react';
import Text from '../atoms/Text';
import InputSearch from '../atoms/InputSearch';
import Swal from 'sweetalert2';
import '@sweetalert2/theme-bulma';

function SearchBallot({ val, fnVal }) {
    const handleChange = (event) => {
        const { value } = event.target;
        // Permite solo números y limita la longitud a 5 dígitos
        const numericValue = value.replace(/\D/g, '').slice(0, 5);
        fnVal(numericValue);
    };

    const handleBlur = (event) => {
        const { value } = event.target;
        // Verifica que el valor contenga solo números y tenga hasta 5 dígitos
        const validPattern = /^\d{0,5}$/;

        if (!validPattern.test(value)) {
            Swal.fire({
                title: "Error",
                text: "El valor debe contener solo números y no exceder los 5 dígitos",
                icon: "error"
            });
        }
    };

    return (
        <div className='w-full p-5 flex flex-wrap'>
            <Text text="Buscar por matrícula" className="!m-0 !mx-5 !text-base" />
            <InputSearch
                type="text"
                placeholder="Buscar"
                className=""
                onChange={handleChange}
                onBlur={handleBlur}
                pattern="^\d{0,5}$" // Patrón para aceptar solo hasta 5 dígitos numéricos
            />
        </div>
    );
}

export default SearchBallot;
