import React, { useState } from 'react';
import Header from "../../components/organisms/Header";
import ButtonPDF from "../../components/molecules/ButtonPDF";

function TeacherBallots() {
    const [pdfBytes, setPdfBytes] = useState(null);

    const handleDownload = async (event) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_URL}/pdfs`,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            setPdfBytes(data);

            const blob = new Blob([data], { type: 'application/pdf' });
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'alumn.pdf');
            document.body.appendChild(link);
            link.click();
            link.remove();
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.log("Error: ", error);
        }
    };

    return (
        <div className="h-full w-full bg-slate-900">
            <Header role="teacher" />
            <div className="w-full h-[80vh] flex justify-center items-center">
                <div className="h-4/5 w-4/6 flex flex-col items-center border-2 border-white">
                    <ButtonPDF text="Hola mundo" onClick={handleDownload}></ButtonPDF>
                </div>
            </div>
        </div>
    );
}

export default TeacherBallots;
