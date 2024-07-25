import Text from '../atoms/Text';
import InputSearch from '../atoms/InputSearch';

function SearchBallot({ val, fnVal }) {
    return (
        <div className='w-full p-5 flex flex-wrap'>
            <Text text="Buscar por matrícula" className="!m-0 !mx-5 !text-base" />
            <InputSearch type="text" placeholder="Buscar" className="" onChange={fnVal} />
        </div>
    );
}

export default SearchBallot;
