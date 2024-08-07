import ButtonDownload from "../atoms/ButtonDownload";
import React, { useState } from "react";
import React from "react";
import { PDFDocument, rgb } from 'pdf-lib';
import { saveAs } from "file-saver";
import { Worker, Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';

function DownloadFormat({ text }) {

    const [pdfUrl, setPdfUrl] = useState(null);

    const createPdf = async () => {
        const pdfDoc = await PDFDocument.create();
        const page = pdfDoc.addPage([600, 400]);

        const imageBytes = await fetch(`${import.meta.env.VITE_URL}/ballot`).then(res => res.arrayBuffer());
        const image = await pdfDoc.embedJpg(imageBytes);

   
        const { width, height } = image.scale(0.5);
        page.drawImage(image, {
            x: 50,
            y: 200,
            width,
            height,
        });

        const pdfBytes = await pdfDoc.save();
        const blob = new Blob([pdfBytes], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);
        setPdfUrl(url);
        saveAs(blob, 'example.pdf');
    };

    return (
        <div className="min-h-[5%] w-4/6">
            <ButtonDownload onClick={createPdf} text={text}></ButtonDownload>
            {
         
            pdfUrl && (
                <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.6.347/build/pdf.worker.min.js">
                    <div style={{ height: '750px' }}>
                        <Viewer fileUrl={pdfUrl} />
                    </div>
                </Worker>
            )}
        </div>
    );
}

export default DownloadFormat;
