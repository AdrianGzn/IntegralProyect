import SearchBallot from "../molecules/SearchBallot";

function SearchBallotSection({val, fnval, onClick}) {
    return (
        
        <div className="w-full">
            <SearchBallot onClick={onClick} val={val} fnval={fnval}></SearchBallot>
        </div>
    )
}

export default SearchBallotSection;