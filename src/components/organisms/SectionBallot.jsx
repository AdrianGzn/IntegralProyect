function SectionBallot({ newPDFs }) {
    return (
        <div className='min-h-[60%] w-full overflow-x-hidden flex align-items-center gap-10 p-10'>
            {newPDFs.map((pdfUrl, index) => (
                <div key={index}>
                    <p>{pdfUrl.name}</p>
                </div>
            ))}
        </div>
    );
}

export default SectionBallot;
