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
    const [cienceQualifications, setCienceQualifications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [options, setOptions] = useState([]);
    const [addedQualifications, setAddedQualifications] = useState(0); // Definido aquí

    const alumnId = useRef('');
    const Español = useRef('');
    const Matematicas = useRef('');
    const Ciencia = useRef('');
    const Grado = useRef('');

    const encabezado = ["Número de lista", "Nombre", "Apellidos", "Español", "Matemáticas", "Ciencias Naturales", "Calificación"];

    useEffect(() => {
        fetchOptions();
    }, []);

    useEffect(() => {
        fetchQualifications('espa', setQualifications);
        fetchQualifications('cience', setCienceQualifications);
        fetchQualifications('math', setMathQualifications);
    }, [addedQualifications]);

    const fetchOptions = () => {
        fetch(`${import.meta.env.VITE_URL}/alumn`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.ok ? response.json() : Promise.reject('Network response was not ok.'))
            .then(data => setOptions(data.map(item => item.alumn_id)))
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

    const fetchQualifications = (subject, setQualificationsFn) => {
        fetch(`${import.meta.env.VITE_URL}/subject/${subject}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.ok ? response.json() : Promise.reject('Failed to fetch qualifications.'))
            .then(data => {
                setQualificationsFn(data);
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
    };

    const processQualifications = (dataEspañol, dataMath, dataCience) => {
        const qualificationsMap = new Map();

        const addToMap = (data, subject) => {
            data.forEach(qualification => {
                const { alumn_id, amount, gradePertenence } = qualification;
                if (!qualificationsMap.has(alumn_id)) {
                    qualificationsMap.set(alumn_id, {
                        alumn_id,
                        name: '',       // Placeholder for name
                        lastName: '',   // Placeholder for last name
                        español: '',
                        matematicas: '',
                        ciencias: '',
                        gradePertenence
                    });
                }
                qualificationsMap.get(alumn_id)[subject] = amount;
            });
        };

        addToMap(dataEspañol, 'español');
        addToMap(dataMath, 'matematicas');
        addToMap(dataCience, 'ciencias');

        const subjectData = [encabezado];
        qualificationsMap.forEach(({ alumn_id, name, lastName, español, matematicas, ciencias, gradePertenence }) => {
            subjectData.push([alumn_id, name, lastName, español, matematicas, ciencias, gradePertenence]);
        });

        return subjectData;
    };

    const subjectData = !loading ? processQualifications(qualifications, mathQualifications, cienceQualifications) : [];

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

        addQualification('Spanish', Español.current.value);
        addQualification('Math', Matematicas.current.value);
        addQualification('Science', Ciencia.current.value);

        Swal.fire({
            title: "Calificaciones agregadas con éxito",
            text: "",
            icon: "success"
        });
    };

    const addQualification = (pertenence, amount) => {
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
                setAddedQualifications(prev => prev + 1); // Correctly updating the state
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
    };

    return (
        <div className="w-full min-h-[80vh] flex flex-col items-center justify-center">
            <div className="w-[70%] mb-4 flex flex-wrap p-4 bg-gray-800 rounded-lg shadow-md">
                <div className="w-[70%] flex my-1">
                    <Text text="Número de lista del alumno" className="!m-0"></Text>
                    <Select options={options} ref={alumnId} className="!my-0"></Select>
                </div>

                <div className="w-full my-1 flex flex-wrap">
                    <div>
                        <Text text="Grupo A" className="!m-0"></Text>
                    </div>
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
            <div className="min-h-4/5 w-[70%] mb-10 flex flex-col items-center bg-gray-800 rounded-lg shadow-md p-4">
                <div className="w-full flex flex-wrap justify-center">
                    {loading ? (
                        <Text text="Cargando..." />
                    ) : (
                        <div className="w-[70%] bg-gray-700 p-4 rounded-lg shadow-md">
                            <Table data={subjectData} title="Calificaciones Combinadas" />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default QualificationsSection;
