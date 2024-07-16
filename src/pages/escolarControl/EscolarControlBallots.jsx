import Header from "../../components/organisms/Header";
import "@sweetalert2/theme-bulma";
import ForminBallot from "../../components/organisms/ForminBallot";

function EscolarControlBallots() {

    return (
        <div className="h-full w-full bg-slate-900">
            <Header role="escolarControl" />
            <ForminBallot></ForminBallot>
        </div>
    );
}

export default EscolarControlBallots;
