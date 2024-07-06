import Header from "../../components/organisms/Header";
import HeroSection from "../../components/organisms/HeroSection";
import { getName, getRole } from "../../data/userActual";

function TeacherHome() {
    return (
        <div className="min-h-screen w-full bg-slate-900">
            <Header role="teacher" />
            <div className="w-full flex justify-center items-center">
                <div className="h-[75vh] w-4/6 flex flex-col">
                    <HeroSection welcome={"Bienvenido " + getRole() + " " + getName()} />
                </div>
            </div>
        </div>
    );
}

export default TeacherHome;
