import Header from "../../components/organisms/Header";
import Herosection from "../../components/organisms/HeroSection";

function TeacherHome() {
    return (
        <div className="min-h-screen w-full bg-slate-900">
            <Header role="teacher" />
            <div className="w-full flex justify-center items-center">
                <div className="h-[75vh] w-4/6 border-2 border-white flex flex-col">
                    <Herosection />
                </div>
            </div>
        </div>
    );
}

export default TeacherHome;
