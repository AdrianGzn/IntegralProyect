import Header from "../../components/organisms/Header";
import "@sweetalert2/theme-bulma";
import ForminBallot from "../../components/organisms/ForminBallot";

function EscolarControlBallots() {

    return (
        <div className="h-full w-full bg-slate-900">
            <Header role="escolarControl" />
            <div className="w-full min-h-[80vh] flex justify-center items-center">
                <div className="h-4/5 w-4/6 flex flex-col items-center">
                    <ForminBallot></ForminBallot>
                </div>
            </div>
            
        </div>
    );
}

export default EscolarControlBallots;
