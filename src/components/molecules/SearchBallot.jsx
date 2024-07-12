import Text from "../atoms/Text";
import InputSearch from "../atoms/InputSearch";

function SearchBallot(props) {
    return <div className='h-[20%] w-full p-5 flex flex-wrap'>
        <Text text="Buscar por matrícula" className="!m-0 !mx-5 !text-base"></Text>
        <InputSearch type="text" placeholder="Buscar" val={props.val} fnVal={props.fnVal}></InputSearch>
    </div>
}

export default SearchBallot;