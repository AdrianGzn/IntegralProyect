import { useState } from "react";
import Input from "../../components/atoms/InputNavigate"

function SearchPlaque() {
    const [plaque, setPlaque] = useState("")

    return(
        <div className="min-h-[5%] w-4/6 "><Input val={plaque} fnval={setPlaque}></Input></div>
    )
}

export default SearchPlaque; 