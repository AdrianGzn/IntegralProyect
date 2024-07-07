import ButtonDownload from "../atoms/ButtonDownload";
function DownloadFormat({text}) {
    return(
        <div className="min-h-[5%] w-4/6 border-2 border-white">
            <ButtonDownload text={text}></ButtonDownload>
        </div>
    )
}

export default DownloadFormat; 