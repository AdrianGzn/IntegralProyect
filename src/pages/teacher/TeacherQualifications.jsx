import React from "react";
import Header from "../../components/organisms/Header";

function TeacherQualifications() {
    return <div className="min-h-screen w-full bg-slate-900">
        <Header role="teacher" />
        <div className="w-full flex justify-center items-center">
            <div className="h-[75vh] w-4/6 flex flex-col">
                Sección de calificaciones
            </div>
        </div>
    </div>
}

export default TeacherQualifications;