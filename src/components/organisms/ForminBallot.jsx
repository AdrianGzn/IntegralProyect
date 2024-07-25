import PDFformat from "../../components/atoms/PDFformat";
import { BlobProvider } from '@react-pdf/renderer';
import { useRef, useState, useEffect } from "react";
import Swal from "sweetalert2";
import Field from "../molecules/Field";
import Button from "../atoms/Button";
import Text from "../atoms/Text";

function ForminBallot() {
    //post id, observations, rating, created_by, updated_by, deleted: false

    const ratingFinal = useRef("");
    const observations = useRef("");

    return (
        <div className="flex justify-center">
            <div className="w-[80%] min-w-[270px] flex justify-center flex-wrap rounded-lg bg-slate-800">
            <Text text="Crear Boleta" className="!text-4xl underline decoration-lime-500"></Text>
            <div className="w-full flex justify-evenly  items-center flex-wrap"> 
                <div className="h-20 w-[40%] min-w-64 flex justify-center flex-wrap">
                    <Field text="Calificación final:" type="text" placeholder="calificación" inputRef={ratingFinal} className="w-[90%]" classNameText="!text-4xl !my-1" classNameInput="h-12" />
                </div>
                <div className="h-52 w-[40%] min-w-64 flex justify-center flex-wrap">
                    <Field text="Observaciones:" type="text" placeholder="observaciones" inputRef={observations} className="w-[90%]" classNameText="!4xl" />
                </div>
            </div>
            <Button text="Generar"></Button>
            </div>
        </div>
    );
}

export default ForminBallot;