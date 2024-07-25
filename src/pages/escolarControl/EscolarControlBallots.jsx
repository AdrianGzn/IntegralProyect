import Header from "../../components/organisms/Header";
import "@sweetalert2/theme-bulma";
import ForminBallot from "../../components/organisms/ForminBallot";

function EscolarControlBallots() {

    return (
        <div className="h-full w-full bg-slate-900">
            <Header role="escolarControl" />
            <div className="w-full min-h-[80vh] flex justify-center">
                <div className="w-4/6">
                    <ForminBallot></ForminBallot>
                </div>
            </div>
            
        </div>
    );
}

export default EscolarControlBallots;
