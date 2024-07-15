import Header from "../../components/organisms/Header";
import Field from "../../components/molecules/Field";
import Button from "../../components/atoms/Button";
import { useRef, useState } from "react";
import PDFformat from "../../components/atoms/PDFformat";
import { PDFViewer, BlobProvider, PDFDownloadLink } from '@react-pdf/renderer';

function EscolarControlBallots() {
    const [content, setContent] = useState({});
    const [PDF, setPDF] = useState(null)
    const ratingFinal = useRef(null);
    const observations = useRef(null);
    const subject1 = useRef(null);
    const rating1 = useRef(null);
    const subject2 = useRef(null);
    const rating2 = useRef(null);
    const subject3 = useRef(null);
    const rating3 = useRef(null);
    const subject4 = useRef(null);
    const rating4 = useRef(null);

    const addBallot = () => {

        const newContent = {
            observations: observations.current.value,
            ratingFinal: ratingFinal.current.value,
            subject1: subject1.current.value, rating1: rating1.current.value,
            subject2: subject2.current.value, rating2: rating2.current.value,
            subject3: subject3.current.value, rating3: rating3.current.value,
            subject4: subject4.current.value, rating4: rating4.current.value,
        };

        setContent(newContent);

        fetch(`${import.meta.env.VITE_URL}/ballot`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Control-Acces-Allow-Origin': '*'
            },
            body: JSON.stringify({
                content: PDF,
                created_by: "teacher",
                updated_by: "teacher",
                deleted: false
            })
        })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };

    return (
        <div className="h-full w-full bg-slate-900">
            <Header role="escolarControl" />
            <div className="w-full h-[80vh] flex justify-center items-center">
                <div className="h-4/5 w-4/6 flex flex-col items-center">
                    <div className="w-full h-[75%] flex items-center justify-evenly">
                        <div className="w-[30%]">
                            <Field text="Observaciones:" type="text" placeholder="observaciones" inputRef={observations} className="w-[90%]" />
                            <Field text="Calificación final:" type="text" placeholder="calificación" inputRef={ratingFinal} className="w-[90%]" />
                        </div>
                        <div className="w-1/4">
                            <Field text="Materia 1:" type="text" placeholder="materia" inputRef={subject1} className="w-[90%]" />
                            <Field text="Materia 2:" type="text" placeholder="materia" inputRef={subject2} className="w-[90%]" />
                            <Field text="Materia 3:" type="text" placeholder="materia" inputRef={subject3} className="w-[90%]" />
                            <Field text="Materia 4:" type="text" placeholder="materia" inputRef={subject4} className="w-[90%]" />
                        </div>
                        <div className="w-1/4">
                            <Field text="Calificación 1:" type="text" placeholder="calificación" inputRef={rating1} className="w-[90%]" />
                            <Field text="Calificación 2:" type="text" placeholder="calificación" inputRef={rating2} className="w-[90%]" />
                            <Field text="Calificación 3:" type="text" placeholder="calificación" inputRef={rating3} className="w-[90%]" />
                            <Field text="Calificación 4:" type="text" placeholder="calificación" inputRef={rating4} className="w-[90%]" />
                        </div>
                    </div>
                    <Button className="mb-4" text="Guardar" onClick={addBallot} />
                    {"la variable para el blob del PDF"}
                    <BlobProvider document={<PDFformat ratingFinal={content.ratingFinal || ''} observations={content.observations} subject1={content.subject1 || ''} subject2={content.subject2} subject3={content.subject3} subject4={content.subject4} />}>
                        {({ blob, url, loading, error }) => { //no estoy usando el url, loading y error
                            if (blob) {
                                setPDF(blob)
                                console.log("win"); //el blob
                            }
                            return (
                                <>
                                    <PDFDownloadLink document={<PDFformat ratingFinal={content.ratingFinal || ''} observations={content.observations} subject1={content.subject1 || ''} subject2={content.subject2} subject3={content.subject3} subject4={content.subject4} />}>
                                        {({ loading, url, error, blob }) =>
                                            loading ? (
                                                <button>loading ...</button>
                                            ) : (
                                                <button>no pdf</button>
                                            )
                                        }
                                    </PDFDownloadLink>
                                </>    
                            )
                        }}
                    </BlobProvider>

                </div>
            </div>
        </div >
    );
}

export default EscolarControlBallots;
