import React from "react";
import PropTypes from "prop-types";
import { PDFSlickViewer } from "@pdfslick/react";
import "@pdfslick/react/dist/pdf_viewer.css";

const PDFViewerComponent = ({ pdfFilePath }) => {
  const containerRef = React.useRef(null);

  React.useEffect(() => {
    if (containerRef.current) {
      new PDFSlickViewer(containerRef.current, {
        url: pdfFilePath,
        scaleValue: "page-fit", // Configura aquí las opciones válidas
      });
    }
  }, [pdfFilePath]);

  const openPDFInNewTab = () => {
    const pdfViewerUrl = `/pdf-viewer?pdfUrl=${encodeURIComponent(pdfFilePath)}`;
    window.open(pdfViewerUrl, "_blank");
  };

  return (
    <div className="relative h-full w-full">
      <div
        ref={containerRef}
        className="absolute inset-0"
        onClick={openPDFInNewTab}
      />
    </div>
  );
};

PDFViewerComponent.propTypes = {
  pdfFilePath: PropTypes.string.isRequired,
};

export default PDFViewerComponent;
