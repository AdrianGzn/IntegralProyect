import { useRef, useState } from "react";
import Swal from "sweetalert2";
import Field from "../molecules/Field";
import Button from "../atoms/Button";
import Text from "../atoms/Text";
import InputSearch from "../atoms/InputSearch";

function ForminBallot() {
    const ratingFinal = useRef("");
    const observations = useRef("");
    const alumn_id = useRef("");

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
            <Text text="General" className="!text-4xl underline decoration-lime-500"></Text>
            <div className="w-full flex justify-evenly  items-center flex-wrap"> 
                <div className="h-20 w-[26%] min-w-64 flex justify-center flex-wrap">
                    <Text text="Matricula:" className="my-1"></Text>
                    <InputSearch ref={alumn_id} className="!h-6 !w-36"></InputSearch>
                </div>
                <div className="h-20 w-[26%] min-w-64 flex justify-center flex-wrap">
                    <Field text="Calificación final:" type="text" placeholder="calificación" inputRef={ratingFinal} className="w-[90%]" classNameText="!text-4xl !my-1 !mx-0" classNameInput="h-12" />
                </div>
                <div className="h-52 w-[50%] min-w-64 mt-5 flex justify-center flex-wrap">
                    <Field text="Observaciones:" type="text" placeholder="observaciones" inputRef={observations} className="w-[90%]" classNameText="!4xl !my-1" />
                </div>
            </div>
            <Button text="Generar" className="mt-0" onClick={addBallot}></Button>
            </div>
        </div>
        </>
    );
}

export default ForminBallot;