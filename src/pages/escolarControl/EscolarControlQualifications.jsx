import Header from "../../components/organisms/Header";
import Field from "../../components/molecules/Field";
import InputSearch from "../../components/atoms/InputSearch";
import Button from "../../components/atoms/Button"
import Table from "../../components/organisms/Table"
import { useState, useEffect, useRef } from "react"

function EscolarControlQualifications() {

    const data = [
        { id: 1, name: 'John Doe', age: 28, job: 'Developer' },
        { id: 2, name: 'Jane Smith', age: 32, job: 'Designer' },
        { id: 3, name: 'Sam Green', age: 24, job: 'Manager' },
        { id: 3, name: 'Sam Green', age: 24, job: 'Manager' },
        { id: 3, name: 'Sam Green', age: 24, job: 'Manager' },
        { id: 3, name: 'Sam Green', age: 24, job: 'Manager' },
    ];

    return (
        <div className="h-full w-full bg-slate-900">
            <Header role="escolarControl" />
            <div className="w-full min-h-[80vh] flex justify-center items-center">
                <div className="h-4/5 w-4/6 flex flex-col items-center border-2 border-white">
                    <Table data={data} title="Hola" />
                </div>
            </div>
        </div>
    );
}

export default EscolarControlQualifications;
