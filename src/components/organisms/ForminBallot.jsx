import { useRef, useState } from "react";
import Swal from "sweetalert2";
import Field from "../molecules/Field";
import Button from "../atoms/Button";
import Text from "../atoms/Text";
import { BlobProvider } from '@react-pdf/renderer';
import PDFformat from "../../components/atoms/PDFformat";

function ForminBallot() {
    const [content, setContent] = useState({});
    const [PDFBase64, setPDFBase64] = useState(null);
    const ratingFinal = useRef("");
    const observations = useRef("");
    const subject1 = useRef("");
    const rating1 = useRef("");
    const subject2 = useRef("");
    const rating2 = useRef("");
    const subject3 = useRef("");
    const rating3 = useRef("");
    const subject4 = useRef("");
    const rating4 = useRef("");


    const addBallot = () => {
        if (!pdfBlob) {
            Swal.fire({
                title: "Error",
                text: "Debe generar primero el PDF",
                icon: "error"
            });
            return;
        }
        const blobUrl = URL.createObjectURL(pdfBlob); // Obtener la URL del Blob

        fetch(`${import.meta.env.VITE_URL}/ballot`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                alumn_id: 1,
                name: 'regi',
                url: blobUrl, // Enviar la URL como path en el POST
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
                    
                    <div className="w-1/4 min-w-64 mb-10 flex justify-center flex-wrap">
                        <Text text="Materias" className="!text-xl underline decoration-lime-500"></Text>
                        <Field text="Materia 1:" type="text" placeholder="materia" inputRef={subject1} className="w-[90%]" />
                        <Field text="Materia 2:" type="text" placeholder="materia" inputRef={subject2} className="w-[90%]" />
                        <Field text="Materia 3:" type="text" placeholder="materia" inputRef={subject3} className="w-[90%]" />
                        <Field text="Materia 4:" type="text" placeholder="materia" inputRef={subject4} className="w-[90%]" />
                    </div>
                    <div className="w-1/4 min-w-64 mb-10 flex justify-center flex-wrap">
                        <Text text="Calificaciones" className="!text-xl underline decoration-lime-500"></Text>
                        <Field text="Calificación 1:" type="text" placeholder="calificación" inputRef={rating1} className="w-[90%]" />
                        <Field text="Calificación 2:" type="text" placeholder="calificación" inputRef={rating2} className="w-[90%]" />
                        <Field text="Calificación 3:" type="text" placeholder="calificación" inputRef={rating3} className="w-[90%]" />
                        <Field text="Calificación 4:" type="text" placeholder="calificación" inputRef={rating4} className="w-[90%]" />
                    </div>
                    <div className="w-[30%] min-w-64 mb-10 flex justify-center flex-wrap">
                        <Text text="General" className="!text-xl underline decoration-lime-500"></Text>
                        <Field text="Observaciones:" type="text" placeholder="observaciones" inputRef={observations} className="w-[90%]" />
                        <Field text="Calificación final:" type="text" placeholder="calificación" inputRef={ratingFinal} className="w-[90%]" />
                    </div>
                </div>
                <div className="flex flex-col items-center justify-center mt-4 w-full h-[50]">
                    <Button className="mb-4" text="Guardar" onClick={addBallot} />
                    <BlobProvider document={<PDFformat ratingFinal={content.ratingFinal || ''} observations={content.observations} subject1={content.subject1 || ''} subject2={content.subject2} subject3={content.subject3} subject4={content.subject4} />}>
                        {({ blob, url }) => {
                            if (blob && url) {
                                setPDFBase64(blob);
                                return (
                                    <a href={url} download="ballot.pdf" className="btn btn-primary">Descargar PDF</a>
                                );
                            } else {
                                return <span>No se pudo generar el PDF</span>;
                            }
                        }}
                    </BlobProvider>
                </div>
        </>
    );
}

export default ForminBallot;
