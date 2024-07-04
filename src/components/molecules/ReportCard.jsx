import H2 from "../atoms/H2";
import H3 from "../atoms/H3";

function ReportCard(props) {
    return <div className="p-3 bg-slate-500 w-40 my-5 rounded-md">
        <H2 text="Descripción:" className="!m-0"></H2>
        <H3 text={props.description} className="!m-0"></H3>
        <H2 text="Lugar:" className="!m-0"></H2>
        <H3 text={props.place} className="!m-0"></H3>
    </div>
}

export default ReportCard;