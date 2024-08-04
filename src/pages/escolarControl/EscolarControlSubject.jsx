import Header from "../../components/organisms/Header";
import "@sweetalert2/theme-bulma";
import Swal from "sweetalert2";
import React from "react";
import CreateSubject from "../../components/organisms/CreateSubject";

function EscolarControlSubject() {
    const name = useRef("");

    const save = () => {
        fetch(`${import.meta.env.VITE_URL}/subject`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: name.current.value,
                created_by: 'escolarControl',
                updated_by: 'escolarControl',
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
                    text: "Se agregó la asignatura",
                    icon: "success"
                });
            })
            .catch((error) => {
                console.error('Error:', error);
                Swal.fire({
                    title: "No se logró agregar",
                    text: "No se pudo agregar la asignatura",
                    icon: "error"
                });
            });
    }

    return (
        <div className="h-full w-full bg-slate-900">
            <Header role="escolarControl" />
            <div className="w-full flex justify-center items-center">
                <div className="min-h-[80vh] w-4/6 flex flex-col items-center">
                    <CreateSubject
                        name={name}
                        onClick={save}
                    ></CreateSubject>
                </div>
            </div>
        </div>
    );
}

export default EscolarControlSubject;
