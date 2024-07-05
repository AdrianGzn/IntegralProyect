function Icon(props) {
    switch (props.type) {
        case "circle":
                return <svg color={props.color} xmlns="http://www.w3.org/2000/svg" width={props.w} height={props.h} fill="currentColor" class="bi bi-circle-fill" viewBox="0 0 16 16">
                        <circle cx="8" cy="8" r="8"/>
                    </svg>
            break;
        case "pen":
                return <svg color={props.color} xmlns="http://www.w3.org/2000/svg" width={props.w} height={props.h} fill="currentColor" class="bi bi-pen" viewBox="0 0 16 16">
                        <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001m-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708z"/>
                    </svg>
            break;
        case "person":
                return <svg color={props.color} xmlns="http://www.w3.org/2000/svg" width={props.w} height={props.h} fill="currentColor" class="bi bi-person" viewBox="0 0 16 16">
                        <path className="top-0 left-0" d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z"/>
                    </svg>
            break;
        default:
            console.log("Error");
            break;
    }

}

export default Icon;