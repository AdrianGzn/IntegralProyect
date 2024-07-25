import { useRef } from "react";
import Swal from "sweetalert2";
import Field from "../molecules/Field";
import Button from "../atoms/Button";
import Text from "../atoms/Text";

function ForminBallot() {
    const ratingFinal = useRef(null);
    const observations = useRef(null);
    const alumn_id = useRef(null);

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
            <div className="w-full flex items-center justify-evenly flex-wrap">
                <div className="w-[30%] min-w-64 mb-10 flex justify-center flex-wrap">
                    <Text text="General" className="!text-xl underline decoration-lime-500"></Text>
                    <Field text="Matricula del alumno" type="text" placeholder="matrícula" inputRef={alumn_id} className="w-[90%]"></Field>
                    <Field text="Observaciones:" type="text" placeholder="observaciones" inputRef={observations} className="w-[90%]" />
                    <Field text="Calificación final:" type="text" placeholder="calificación" inputRef={ratingFinal} className="w-[90%]" />
                </div>
            </div>
            <div className="flex flex-col items-center justify-center mt-4 w-full h-[50]">
                <Button className="mb-4" text="Guardar" onClick={addBallot} />
            </div>
        </>
    );
}

export default ForminBallot;
