import Header from "../../components/organisms/Header";
import Field from "../../components/molecules/Field";
import InputSearch from "../../components/atoms/InputSearch";
import Button from "../../components/atoms/Button"
import { useState, useEffect, useRef } from "react"

function EscolarControlBallots() {

    const ratingFinal = useRef();
    const observations = useRef("");
    const subject1 = useRef("");
    const rating1 = useRef("");
    const subject2 = useRef("");
    const rating2 = useRef("");
    const subject3 = useRef("");
    const rating3 = useRef("");
    const subject4 = useRef("");
    const rating4 = useRef("");   

    const handleSave = () => {
        console.log("Datos guardados");
    };

    return (
        <div className="h-full w-full bg-slate-900">
            <Header role="escolarControl" />
            <div className="w-full h-[80vh] flex justify-center items-center">
                <div className="h-4/5 w-4/6 flex flex-col items-center">
                    <div className="w-full h-[75%] flex items-center justify-evenly">
                        <div className="w-[30%]">
                            <InputSearch type="text" placeholder="Matricula"></InputSearch>
                            <Field text="Observaciones:" type="text" placeholder="observaciones" val={observations}  className="w-[90%]" />
                            <Field text="Calificación final:" type="text" placeholder="calificación" val={ratingFinal} className="w-[90%]" />
                        </div>
                        <div className="w-1/4">
                            <Field text="Materia 1:" type="text" placeholder="materia" ref={subject1} className="w-[90%]" />
                            <Field text="Materia 2:" type="text" placeholder="materia" ref={subject2} className="w-[90%]" />
                            <Field text="Materia 3:" type="text" placeholder="materia" ref={subject3} className="w-[90%]" />
                            <Field text="Materia 4:" type="text" placeholder="materia" ref={subject4} className="w-[90%]" />
                        </div>
                        <div className="w-1/4">
                            <Field text="Calificación 1:" type="text" placeholder="calificación" ref={rating1}  className="w-[90%]" />
                            <Field text="Calificación 2:" type="text" placeholder="calificación" ref={rating2}  className="w-[90%]" />
                            <Field text="Calificación 3:" type="text" placeholder="calificación" ref={rating3}  className="w-[90%]" />
                            <Field text="Calificación 4:" type="text" placeholder="calificación" ref={rating4}  className="w-[90%]" />
                        </div>
                    </div>
                    <Button className="mb-4" text="Guardar" onClick={handleSave}></Button>
                </div>
            </div>
        </div>
    );
}

export default EscolarControlBallots;
