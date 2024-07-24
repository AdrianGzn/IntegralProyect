import React from "react";
import PropTypes from "prop-types";
import { usePDFSlick } from "@pdfslick/react";
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

  return (
    <div className="absolute inset-0 pdfSlick">
      <div className="relative h-full">
        <PDFSlickViewer {...{ viewerRef, usePDFSlickStore }} />
        <PDFNavigation {...{ usePDFSlickStore }} />
        <div className="absolute w-full top-0 left-0">
          <p>Current scale: {scale}</p>
          <p>Current page number: {pageNumber}</p>
          <p>Total number of pages: {numPages}</p>
        </div>
      </div>
    </div>
  );
};

PDFViewerComponent.propTypes = {
  pdfFilePath: PropTypes.string.isRequired,
};

export default PDFViewerComponent;
