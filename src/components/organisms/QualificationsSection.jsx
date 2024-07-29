import React, { useState, useEffect, useRef } from 'react';
import Table from './Table';
import Text from '../atoms/Text';
import Field from '../molecules/Field';
import Button from '../atoms/Button';
import Swal from 'sweetalert2';
import Select from '../atoms/Select';

function QualificationsSection() {
    const [qualifications, setQualifications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [options, setOptions] = useState([]);
    const alumnId = useRef('');
    const Español = useRef('');
    const Matematicas = useRef('');
    const Ciencia = useRef('');
    const Grado = useRef('');

    const encabezado = ["Id Calificaciones", "Id Materia", "Cantidad", "Grado"];
    const [addedQualifications, setAddedQualifications] = useState(0);

    useEffect(() => {
        // Fetch for available options
        fetch(`${import.meta.env.VITE_URL}/alumn`, {
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
    }, [addedQualifications]);

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
    }, [addedQualifications]);

    const processQualifications = (data) => {
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

    const validateInput = (value) => {
        const regEx = /^\d{1,2}$/;
        return regEx.test(value);
    };

    const addQualifications = () => {
        if (!Español.current.value || !Matematicas.current.value || !Ciencia.current.value || !Grado.current.value) {
            Swal.fire({
                title: "Error!",
                text: "Todos los campos son obligatorios.",
                icon: "error",
                confirmButtonText: "Okay"
            });
            return;
        }

        if (!validateInput(Español.current.value) || !validateInput(Matematicas.current.value) || !validateInput(Ciencia.current.value) || !validateInput(Grado.current.value)) {
            Swal.fire({
                title: "Error!",
                text: "Los campos solo pueden contener hasta 2 dígitos numéricos.",
                icon: "error",
                confirmButtonText: "Okay"
            });
            return;
        }

        fetch(`${import.meta.env.VITE_URL}/rating`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                alumn_id: alumnId.current.value,
                amount: Español.current.value,
                pertenence: "Spanish",
                gradePertenence: Grado.current.value,
                created_by: "escolar",
                updated_by: "escolarControl",
                deleted: false
            })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to add Spanish qualification.');
            }
        })
        .catch(error => {
            console.error('Error adding Spanish qualifications:', error);
            Swal.fire({
                title: 'Error!',
                text: 'There was an issue adding the Spanish qualification.',
                icon: 'error',
                confirmButtonText: 'Okay'
            });
        });

        fetch(`${import.meta.env.VITE_URL}/rating`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                alumn_id: alumnId.current.value,
                amount: Matematicas.current.value,
                pertenence: "Math",
                gradePertenence: Grado.current.value,
                created_by: "escolar",
                updated_by: "escolarControl",
                deleted: false
            })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to add Math qualification.');
            }
        })
        .catch(error => {
            console.error('Error adding Math qualifications:', error);
            Swal.fire({
                title: 'Error!',
                text: 'There was an issue adding the Math qualification.',
                icon: 'error',
                confirmButtonText: 'Okay'
            });
        });

        fetch(`${import.meta.env.VITE_URL}/rating`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                alumn_id: alumnId.current.value,
                amount: Ciencia.current.value,
                pertenence: "Science",
                gradePertenence: Grado.current.value,
                created_by: "escolar",
                updated_by: "escolarControl",
                deleted: false
            })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to add Science qualification.');
            }
        })
        .catch(error => {
            console.error('Error adding Science qualifications:', error);
            Swal.fire({
                title: 'Error!',
                text: 'There was an issue adding the Science qualification.',
                icon: 'error',
                confirmButtonText: 'Okay'
            });
        });

        setAddedQualifications(addedQualifications + 1);
        Swal.fire({
            title: "Calificaciones agregadas con éxito",
            text: "",
            icon: "success"
        });
    };

    return (
        <div className="w-full min-h-[80vh] flex flex-col items-center justify-center">
            <div className="w-4/6 mb-4 flex flex-wrap max-w-4xl p-4 bg-gray-800 rounded-lg shadow-md">
                <div className="flex my-1">
                    <Text text="Id del alumno" className="!m-0"></Text>
                    <Select options={options} ref={alumnId} className="!my-0"></Select>
                </div>
                <div className="w-full my-1 flex flex-wrap">
                    <div className="w-1/4 min-w-32">
                        <Field inputRef={Español} text="Español" placeholder="Español" />
                    </div>
                    <div className="w-1/4 min-w-32">
                        <Field inputRef={Matematicas} text="Matemáticas" placeholder="Matemáticas" />
                    </div>
                    <div className="w-1/4 min-w-32">
                        <Field inputRef={Ciencia} text="Ciencias" placeholder="Ciencias" />
                    </div>
                    <div className="w-1/4 min-w-32">
                        <Field inputRef={Grado} text="Grado" placeholder="Grado" />
                    </div>
                </div>
                <Button text="Subir Calificaciones" onClick={addQualifications} className="!mx-0 !mt-5 !mb-0" />
            </div>
            <div className="min-h-4/5 w-4/6 mb-10 flex flex-col items-center bg-gray-800 rounded-lg shadow-md p-4">
                {["Español", "Matemáticas", "Ciencias naturales"].map((title, index) => (
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
