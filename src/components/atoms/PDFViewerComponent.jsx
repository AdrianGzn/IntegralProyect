import React from "react";
import PropTypes from "prop-types";
import { usePDFSlick } from "@pdfslick/react";
import PDFNavigation from "../../PDFnavigation/PDFnavigation";
import "@pdfslick/react/dist/pdf_viewer.css";

const PDFViewerComponent = ({ pdfFilePath }) => {
  const { viewerRef, usePDFSlickStore, PDFSlickViewer } = usePDFSlick(
    pdfFilePath,
    {
      scaleValue: "page-fit",
    }
  );

  const scale = usePDFSlickStore((s) => s.scale);
  const numPages = usePDFSlickStore((s) => s.numPages);
  const pageNumber = usePDFSlickStore((s) => s.pageNumber);

  const openPDFInNewTab = () => {
      const pdfViewerUrl = `/pdf-viewer?pdfUrl=${encodeURIComponent(pdfFilePath)}`;
      window.open(pdfViewerUrl, "_blank");
    
  };

  return (
    <div className="absolute inset-0 pdfSlick">
      <div className="relative h-full">
        <div ref={viewerRef} className="pdf-viewer-container" onClick={openPDFInNewTab}>
          <PDFSlickViewer {...{ viewerRef, usePDFSlickStore }} />
        </div>
        <div className="absolute w-full top-0 left-0">
        </div>
      </div>
    </div>
  );
};

PDFViewerComponent.propTypes = {
  pdfFilePath: PropTypes.string.isRequired,
};

export default PDFViewerComponent;
