import Header from "../../components/organisms/Header";
import "@sweetalert2/theme-bulma";
import Swal from "sweetalert2";
import React from "react";
import { useRef } from "react";
import CreateSubject from "../../components/organisms/CreateSubject";

function EscolarControlSubject() {
    const name = useRef("");

    const save = () => {

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
