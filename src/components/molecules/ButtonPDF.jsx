import H3 from "../atoms/H3";
import IconPDF from "../atoms/IconPDF";

function ButtonPDF(props) {
    return <div>
        <button onClick={props.onClick} className={`h-28 w-20 m-5 rounded-md bg-slate-500 text-white flex justify-center items-center flex-wrap hover:bg-slate-400 ${props.className || ''}`}>
            <IconPDF />
            <H3 text={props.text}></H3>
        </button>
    </div>
}

export default ButtonPDF;