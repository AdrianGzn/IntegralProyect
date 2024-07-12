import Text from "../atoms/Text";

function ReportCard({id, status, description}) {

    return <div className="p-3 bg-slate-500 w-40 my-5 rounded-md min-h-40">

        <>
            <div className="flex items-center">
                <Text text="Id:" className="!m-0 !text-base"></Text>
                <Text text={id} className="!mx-2 !text-xs"></Text>
            </div>
            <div className="flex items-center">
                <Text text="Estatus:" className="!m-0 !text-base"></Text>
                <Text text={status} className="!mx-2 !text-xs"></Text>
            </div>
            <Text text="Descripción:" className="!m-0 !text-base"></Text>
            <Text text={description} className="!m-0 !text-xs"></Text>
        </>

    </div>
}

export default ReportCard;