import React, { useState, useEffect, useRef } from 'react';
import Table from './Table';
import Text from '../atoms/Text';
import Field from '../molecules/Field';
import Button from '../atoms/Button';
import Swal from 'sweetalert2';
import Select from '../atoms/Select';

function QualificationsSection() {
    const [qualifications, setQualifications] = useState([]);
    const [mathQualifications, setMathQualifications] = useState([]);
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

    useEffect(() => {
        fetch(`${import.meta.env.VITE_URL}/subject/math`, {
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
            setMathQualifications(data);
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

    const subjectDataEspañol = !loading ? processQualifications(qualifications) : [];
    const subjectDataMath = !loading ? processQualifications(mathQualifications) : [];

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

        const qualificationsData = [
            { pertenence: "Spanish", amount: Español.current.value },
            { pertenence: "Math", amount: Matematicas.current.value },
            { pertenence: "Science", amount: Ciencia.current.value }
        ];

        qualificationsData.forEach(({ pertenence, amount }) => {
            fetch(`${import.meta.env.VITE_URL}/rating`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    alumn_id: alumnId.current.value,
                    amount,
                    pertenence,
                    gradePertenence: Grado.current.value,
                    created_by: "escolar",
                    updated_by: "escolarControl",
                    deleted: false
                })
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Failed to add ${pertenence} qualification.`);
                }
            })
            .catch(error => {
                console.error(`Error adding ${pertenence} qualifications:`, error);
                Swal.fire({
                    title: 'Error!',
                    text: `There was an issue adding the ${pertenence} qualification.`,
                    icon: 'error',
                    confirmButtonText: 'Okay'
                });
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
                <div className="w-full grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {loading ? (
                        <Text text="Cargando..." />
                    ) : (
                        <>
                            <div className="bg-gray-700 p-4 rounded-lg shadow-md">
                                <Table data={subjectDataEspañol} title="Español" />
                            </div>
                            <div className="bg-gray-700 p-4 rounded-lg shadow-md">
                                <Table data={subjectDataMath} title="Matemáticas" />
                            </div>
                            <div className="bg-gray-700 p-4 rounded-lg shadow-md">
                                <Table data={processQualifications(qualifications, "Ciencias naturales")} title="Ciencias naturales" />
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

export default QualificationsSection;
