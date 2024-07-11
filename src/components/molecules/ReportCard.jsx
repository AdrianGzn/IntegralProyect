import H2 from "../atoms/H2";
import H3 from "../atoms/H3";

function ReportCard({id, status, description}) {

    return <div className="p-3 bg-slate-500 w-40 my-5 rounded-md min-h-40">

        <>
            <div className="flex items-center">
                <H2 text="Id:" className="!m-0 "></H2>
                <H3 text={id} className="!mx-2"></H3>
            </div>
            <div className="flex items-center">
                <H2 text="Estatus:" className="!m-0 "></H2>
                <H3 text={status} className="!mx-2"></H3>
            </div>
            <H2 text="Descripción:" className="!m-0"></H2>
            <H3 text={description} className="!m-0"></H3>
        </>

    </div>
}

export default ReportCard;