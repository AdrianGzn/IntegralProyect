import React, { useState, useEffect } from 'react';
import Text from '../atoms/Text';
import InputSearch from '../atoms/InputSearch';
import Swal from 'sweetalert2';
import '@sweetalert2/theme-bulma';

function SearchBallot({ val, fnVal }) {
    const [alumnIds, setAlumnIds] = useState([]);

    const handleChange = (event) => {
        const { value } = event.target;
        const numericValue = value.replace(/\D/g, '').slice(0, 5);
        fnVal(numericValue);
    };

    const handleBlur = (event) => {
        const { value } = event.target;
        const validPattern = /^\d{0,5}$/;

        if (!validPattern.test(value)) {
            Swal.fire({
                title: "Error",
                text: "El valor debe contener solo números y no exceder los 5 dígitos",
                icon: "error"
            });
        }

        fetch(`${import.meta.env.VITE_URL}/rating`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error('Network response was not ok.');
        })
        .then(data => {
            setAlumnIds(data.map(item => item.rating_id)); 
            console.log(alumnIds);
        })
        .catch(error => {
            console.error('Error fetching options:', error);
            Swal.fire({
                title: 'Error!',
                text: 'There was an issue fetching options.',
                icon: 'error',
                confirmButtonText: 'Okay'
            });
        });
    };

    return (
        <div className='w-full p-5 flex flex-wrap'>
            <Text text="Buscar por matrícula" className="!m-0 !mx-5 !text-base" />
            <InputSearch
                type="text"
                placeholder="Buscar"
                className=""
                value={val} // Asegúrate de pasar el valor de `val`
                onChange={handleChange}
                onBlur={handleBlur}
                pattern="^\d{0,5}$" // Patrón para aceptar solo hasta 5 dígitos numéricos
            />
        </div>
    );
}

export default SearchBallot;
