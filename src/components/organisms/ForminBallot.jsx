import { useRef, useState } from "react";
import Swal from "sweetalert2";
import Field from "../molecules/Field";
import Button from "../atoms/Button";
import Text from "../atoms/Text";
import InputSearch from "../atoms/InputSearch";

function ForminBallot() {
    const [alumnsIds, setAlumnsIds] = useState([]);
    const ratingFinal = useRef("");
    const observations = useRef("");
    const alumn_id = useRef("");

    const handleBlurAlumnId = () => {

        let found = false;
        const value = alumn_id.current.value;
        const validPattern = /^\d{1,5}$/;

        if (!validPattern.test(value)) {
            Swal.fire({
                title: "Error",
                text: "El valor de la matrícula debe contener solo números y no exceder los 5 dígitos",
                icon: "error"
            });
        }

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
            setAlumnsIds(data.map(item => item.alumn_id)); 
            console.log(alumnsIds);
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

        for (let i = 0; i < alumnsIds.length; i++) {
            if(value == alumnsIds[i]){
                found = true;
            }
        }

        if(!found) {
            Swal.fire({
                title: 'Error',
                text: 'Debe ingresar una id existente',
                icon: 'error',
                confirmButtonText: 'Okay'
            });
        }
    };

    const handleBlurRatingFinal = () => {
        const value = ratingFinal.current.value;
        const validPattern = /^\d{1,2}$/;

        if (!validPattern.test(value)) {
            Swal.fire({
                title: "Error",
                text: "La calificación final debe contener solo números y no exceder las 2 cifras",
                icon: "error"
            });
        }
    };

    const handleBlurObservations = () => {
        const value = observations.current.value;
        const validPattern = /^[\w\s.,:;]*$/;

        if (!validPattern.test(value)) {
            Swal.fire({
                title: "Error",
                text: "Las observaciones solo pueden contener caracteres alfanuméricos, comas, puntos, dos puntos y punto y coma",
                icon: "error"
            });
        }
    };

    const addBallot = () => {
        if (!alumn_id.current.value || !observations.current.value || !ratingFinal.current.value) {
            Swal.fire({
                title: "Agregar",
                text: "No se logró agregar",
                icon: "error"
            });
            return;
        }

        fetch(`${import.meta.env.VITE_URL}/ballot`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                alumn_id: alumn_id.current.value,
                observations: observations.current.value,
                rating: ratingFinal.current.value,
                created_by: 'teacher',
                updated_by: 'teacher',
                deleted: false
            })
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Network response was not ok');
            }
        })
        .then(data => {
            console.log('Success:', data);
            Swal.fire({
                title: "Agregado",
                text: "Se agregó la boleta",
                icon: "success"
            });
        })
        .catch((error) => {
            console.error('Error:', error);
            Swal.fire({
                title: "No se logró agregar",
                text: "No se pudo agregar la boleta",
                icon: "error"
            });
        });
    };

    return (
        <>
            <div className="flex justify-center">
                <div className="w-[80%] min-w-[270px] flex justify-center flex-wrap rounded-lg bg-slate-800">
                    <Text text="Generar" className="!text-4xl underline decoration-lime-500"></Text>
                    <div className="w-full flex justify-evenly  items-center flex-wrap">
                        <div className="h-20 w-[26%] min-w-64 flex justify-center flex-wrap">
                            <Text text="Matricula:" className="my-1"></Text>
                            <InputSearch 
                                ref={alumn_id} 
                                className="!h-6 !w-36"
                                onBlur={handleBlurAlumnId}
                            />
                        </div>
                        <div className="h-20 w-[26%] min-w-64 flex justify-center flex-wrap">
                            <Field 
                                text="Calificación final:" 
                                type="text" 
                                placeholder="calificación" 
                                inputRef={ratingFinal} 
                                className="w-[90%]" 
                                classNameText="!text-4xl !my-1 !mx-0" 
                                classNameInput="h-12"
                                onBlur={handleBlurRatingFinal}
                            />
                        </div>
                        <div className="h-52 w-[50%] min-w-64 mt-5 flex justify-center flex-wrap">
                            <Field 
                                text="Observaciones:" 
                                type="text" 
                                placeholder="observaciones" 
                                inputRef={observations} 
                                className="w-[90%]" 
                                classNameText="!4xl !my-1"
                                onBlur={handleBlurObservations}
                            />
                        </div>
                    </div>
                    <Button text="Generar" className="mt-0" onClick={addBallot}></Button>
                </div>
            </div>
        </>
    );
}

export default ForminBallot;