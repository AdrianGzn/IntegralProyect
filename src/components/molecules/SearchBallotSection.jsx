import H2 from "../atoms/H2";
import InputSearch from "../atoms/InputSearch";

function SearchBallotSection(props) {
    return <div className='h-[20%] w-full p-5 flex flex-wrap'>
        <H2 text="Buscar por matrícula" className="!m-0 !mx-5"></H2>
        <InputSearch type="text" placeholder="Buscar" val={props.val} fnVal={props.fnVal}></InputSearch>
    </div>
}

export default SearchBallotSection;