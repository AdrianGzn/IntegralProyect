import Header from "../../components/organisms/Header";

function ManagementResourses() {
    return (
        <div className="h-full w-full bg-slate-900">
            <Header role="management" />
            <div className="w-full h-[80vh] flex justify-center items-center">
                <div className="h-4/5 w-4/6 border-2 border-white" />
            </div>
        </div>
    );
}

export default ManagementResourses;
