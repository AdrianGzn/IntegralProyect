import { useState } from "react";
import H2 from "../atoms/H2";
import H3 from "../atoms/H3";

function ReportCard() {
    const [data, setData] = useState([])

    useState(() => {
        fetch(`${import.meta.env.VITE_URL}/report`)
            .then(response => { if (response.ok) { return response.json() } })
            .then(data => { setData(data) })
            .catch(() => { 'has been an error' })
            .finally(() => { 'has been ended' })
    }, [setData])

    return <div className="p-3 bg-slate-500 w-40 my-5 rounded-md min-h-40">
        {
            data.map((data, key) => {
                <>
                    <div className="flex items-center" key={key}>
                        <H2 text="Id:" className="!m-0 "></H2>
                        <H3 text={data.id} className="!mx-2"></H3>
                    </div>
                    <div className="flex items-center">
                        <H2 text="Estatus:" className="!m-0 "></H2>
                        <H3 text={data.status} className="!mx-2"></H3>
                    </div>
                    <H2 text="Descripción:" className="!m-0"></H2>
                    <H3 text={data.description} className="!m-0"></H3>
                </>
            })
        }

    </div>
}

export default ReportCard;