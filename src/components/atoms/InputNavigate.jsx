

function InputNavigate(props) {

    const handlerOnChange = (event) => {
        props.fnval(event.target.value)
    }

    return(
        <div className="rounded-full h-6 w-30 bg-lime-500 flex max-w-40">

        <div className="my-1 mx-2">

            <svg  xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
            </svg>
            
        </div>

        <input className="ml-2 flex-grow bg-transparent outline-none placeholder-slate-900" type={props.type} placeholder={props.placeholder} value={props.val} onChange={handlerOnChange}></input>
    
        </div>
    )
}

export default InputNavigate; 