import React, { useState, useEffect, useRef } from 'react';
import Table from './Table';
import Text from '../atoms/Text';
import Field from '../molecules/Field';
import Button from '../atoms/Button';
import Swal from 'sweetalert2';

function QualificationsSection() {
    const [qualifications, setQualifications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [options, setOptions] = useState([]);
    const Español = useRef('');
    const Matematícas = useRef('');
    const Ciencia = useRef('');
    const Grado = useRef('')

    const encabezado = ["id Calificaciones", "Id Boleta", "Cantidad", "Grado","Created at"];

    useEffect(() => {
        // Fetch for available options
        fetch(`${import.meta.env.VITE_URL}/ballot`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            if (response.ok) {
                console.log("win")
                return response.json();
            }
            throw new Error('Network response was not ok.');
        })
        .then(data => {
            setOptions(data.map(item => item.alumn_id)); 
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
    }, []);


    useEffect(() => {
        fetch(`${import.meta.env.VITE_URL}/subject/espa`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error('Failed to fetch qualifications.');
        })
        .then(data => {
            setQualifications(data);
            setLoading(false);
        })
        .catch(error => {
            console.error('Error fetching qualifications:', error);
            setLoading(false);
            Swal.fire({
                title: 'Error!',
                text: 'There was an issue fetching the qualifications.',
                icon: 'error',
                confirmButtonText: 'Okay'
            });
        });
    }, []);

    const processQualifications = (data) => {
        console.log(qualifications)
        const subjectData = [encabezado];

        data.forEach(qualification => {
            subjectData.push([
                qualification.rating_id,
                qualification.subject_id,
                qualification.amount,
                qualification.gradePertenence,
            ]);
        });

        return subjectData;
    };

    const subjectData = !loading ? processQualifications(qualifications) : [];

    return (
        <div className="w-full min-h-[80vh] flex flex-col items-center justify-center">
            <div className="mb-4 flex flex-wrap gap-4 w-full max-w-4xl p-4 bg-gray-800 rounded-lg shadow-md">
                <select
                    className="w-full md:w-1/4 h-10 px-2 border rounded"
                    name="matriculas"
                    multiple={true}
                >
                    {options.map(option => (
                        <option key={option} value={option}>
                            {option}
                        </option>
                    ))}
                </select>
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex flex-col w-full md:w-1/3">
                        <Text text="Español" />
                        <Field ref={Español} placeholder="Español" />
                    </div>
                    <div className="flex flex-col w-full md:w-1/3">
                        <Text text="Matemáticas" />
                        <Field ref={Matematícas} placeholder="Matemáticas" />
                    </div>
                    <div className="flex flex-col w-full md:w-1/3">
                        <Text text="Ciencias" />
                        <Field ref={Ciencia} placeholder="Ciencias" />
                    </div>
                    <div className="flex flex-col w-full md:w-1/3">
                        <Text text="Grado" />
                        <Field ref={Grado} placeholder="Grado" />
                    </div>
                </div>
                <Button
                    text="Subir Calificaciones"
                   
                    className="mt-4"
                />
            </div>
            <div className="h-4/5 w-4/6 border-2 mb-10 border-white flex flex-col items-center bg-gray-800 rounded-lg shadow-md p-4">
                {["Español", "Matematícas", "Ciencias naturales"].map((title, index) => (
                    <div key={index} className="w-full mb-10 flex justify-center">
                        {loading ? (
                            <Text text="Cargando..." />
                        ) : (
                            <Table data={subjectData} title={title} />
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default QualificationsSection;
