import React, { useState } from 'react';
import Header from '../../components/organisms/Header';
import SearchBallotSection from '../../components/organisms/SearchBallotSection';

function TeacherBallots() {
    const [matricleSearch, setMatricleSearch] = useState('');
    const [pdfUrls, setPdfUrls] = useState([]);
    const [newPDFs, setNewPDFS] = useState([]);

    const uploadFile = async (file) => {
        const S3_BUCKET = "pdf-school";
        const REGION = "us-east-1";

        AWS.config.update({
            accessKeyId: "youraccesskeyhere",
            secretAccessKey: "yoursecretaccesskeyhere",
        });

        const s3 = new AWS.S3({
            params: { Bucket: S3_BUCKET },
            region: REGION,
        });

        const params = {
            Bucket: S3_BUCKET,
            Key: file.name,
            Body: file,
        };

        try {
            await s3.putObject(params).promise();
            alert("File uploaded successfully.");
        } catch (error) {
            console.error("Error uploading file: ", error);
            alert("Error uploading file. Please try again.");
        }
    };

    const filteredPDF = (e) => {
        const searchTerm = e.target.value.toLowerCase();
        setMatricleSearch(searchTerm);

        const filteredItems = pdfUrls.filter(ballot => ballot.toLowerCase().includes(searchTerm));
        setNewPDFS(filteredItems);
    };

    return (
        <div className="min-h-screen w-full bg-slate-900 overflow-x-hidden">
            <Header role="teacher" />
            <div className="w-full h-[80vh] flex justify-center items-center">
                <div className="h-4/5 w-4/6 lg:w-4/6 flex flex-col wrap items-center border-2 border-white">
                    <SearchBallotSection val={matricleSearch} fnVal={setMatricleSearch} onChange={filteredPDF} />
                    <div className='h-[60%] w-full overflow-x-hidden flex align-items-center gap-10 p-10'>
                        {
                            newPDFs.length === 0 ?
                                (
                                    <p>No se encontraron boletas</p>
                                ) : (
                                    newPDFs.map((pdfUrl, index) => (
                                        <div key={index}>
                                            <a href={pdfUrl} download={`boleta-${index + 1}.pdf`}><img src="../../public/icon_pdf.png" alt="Icon" className="w-5 h-5 mr-2" /></a>
                                            <h6>Boleta {index + 1}</h6>
                                        </div>
                                    ))
                                )
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TeacherBallots;
