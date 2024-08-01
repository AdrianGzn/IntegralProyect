import React from "react";
import Header from "../../components/organisms/Header";
import QualificationsSection from "../../components/organisms/QualificationsSection";

function TeacherQualifications() {
    return <div className="min-h-screen w-full bg-slate-900">
        <Header role="teacher" />
        <div className="w-full flex justify-center items-center">
            <div className="min-h-[75vh] w-4/6 flex flex-col">
                <QualificationsSection></QualificationsSection>
            </div>
        </div>
    </div>
}

export default TeacherQualifications;