import SearchBallot from "../molecules/SearchBallot";

function SearchBallotSection({val, fnval}) {
    return (
        
        <div className="w-full">
            <SearchBallot val={val} fnval={fnval}></SearchBallot>
        </div>
    )
}

export default SearchBallotSection;