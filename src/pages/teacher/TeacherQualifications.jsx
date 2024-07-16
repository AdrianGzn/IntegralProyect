import Header from "../../components/organisms/Header";
import QualificationsSection from "../../components/organisms/QualificationsSection";
function TeacherQualifications() {
    return (
        <div className="h-full w-full bg-slate-900">
            <Header role="teacher" />
            <QualificationsSection/>
        </div>
    );
}

export default TeacherQualifications;
