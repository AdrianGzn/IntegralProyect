function InputSearch({type, placeholder, val, className}) {
    const handlerOnChange = (event) => {
        props.fnVal(event.target.value)
    }

    return (
        <div className={`h-full rounded-full w-full my-0 bg-lime-500 flex max-w-56 ${className || ''}`}>
            <div className="my-1 mx-2 h-[20%]">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
                </svg>
            </div>
            <input 
                className="ml-2 bg-transparent outline-none placeholder-slate-900" 
                type={type} 
                placeholder={placeholder} 
                value={val} 
                onChange={handlerOnChange} 
            />
        </div>
    );
}

export default InputSearch;
