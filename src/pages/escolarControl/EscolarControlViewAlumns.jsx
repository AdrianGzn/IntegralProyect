import Header from "../../components/organisms/Header";
import Table from "../../components/organisms/Table";

function EscolarControlViewAlumns() {
    useEffect(() => {
        fetch(`${import.meta.env.VITE_URL}/personal`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            },
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('La respuesta no es ok.');
            }
        })
        .then(data => {
        })
        .catch(error => {
            console.log("Ha ocurrido un error: " + error);
        });
    }, []);

    return <div className="min-h-screen w-full bg-slate-900">
        <Header role="escolarControl" />
        <div className="w-full flex justify-center items-center">
            <div className="min-h-[75vh] w-4/6 flex flex-col items-center">
                
            </div>
        </div>
    </div>
}

export default EscolarControlViewAlumns;