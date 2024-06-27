import Header from "../../components/organisms/Header";
import Field from "../../components/molecules/Field";
import InputSearch from "../../components/atoms/InputSearch";
import Button from "../../components/atoms/Button"
import { useState } from "react"
import { useEffect } from "react";

function EscolarControlBallots() {

    const [ratingFinal, setRatingFinal] = useState();
    const [observations, setObservations] = useState();
    const [subject1, setSubject1] = useState("");
    const [rating1, setRating1] = useState("");
    const [subject2, setSubject2] = useState("");
    const [rating2, setRating2] = useState("");
    const [subject3, setSubject3] = useState("");
    const [rating3, setRating3] = useState("");
    const [subject4, setSubject4] = useState("");
    const [rating4, setRating4] = useState("");

    return (
        <div className="h-full w-full bg-slate-900">
            <Header role="escolarControl" />
            <div className="w-full h-[80vh] flex justify-center items-center">
                <div className="h-4/5 w-4/6 flex flex-col items-center">
                    <div className="w-full h-[75%] flex items-center justify-evenly">
                        <div className="w-[30%]">
                            <InputSearch type="text" placeholder="Matricula"></InputSearch>
                            <Field text="Observaciones:" type="text" placeholder="observaciones" val={observations} fnVal={setObservations} className="w-[90%]" />
                            <Field text="Calificación final:" type="text" placeholder="calificación" val={ratingFinal} fnVal={setRatingFinal} className="w-[90%]" />
                        </div>
                        <div className="w-1/4">
                            <Field text="Materia 1:" type="text" placeholder="materia" val={subject1} fnVal={setSubject1} className="w-[90%]" />
                            <Field text="Materia 2:" type="text" placeholder="materia" val={subject2} fnVal={setSubject2} className="w-[90%]" />
                            <Field text="Materia 3:" type="text" placeholder="materia" val={subject3} fnVal={setSubject3} className="w-[90%]" />
                            <Field text="Materia 4:" type="text" placeholder="materia" val={subject4} fnVal={setSubject4} className="w-[90%]" />
                        </div>
                        <div className="w-1/4">
                            <Field text="Calificación 1:" type="text" placeholder="calificación" val={rating1} fnVal={setRating1} className="w-[90%]" />
                            <Field text="Calificación 2:" type="text" placeholder="calificación" val={rating2} fnVal={setRating2} className="w-[90%]" />
                            <Field text="Calificación 3:" type="text" placeholder="calificación" val={rating3} fnVal={setRating3} className="w-[90%]" />
                            <Field text="Calificación 4:" type="text" placeholder="calificación" val={rating4} fnVal={setRating4} className="w-[90%]" />
                        </div>
                    </div>
                    <Button  className="mb-4" text="Guardar" onClick={handleSave}></Button>
                </div>
            </div>
        </div>
    );
}

export default EscolarControlBallots;
