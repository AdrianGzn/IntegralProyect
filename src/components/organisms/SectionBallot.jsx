import PDFViewerComponent from "../atoms/PDFViewerComponent";
import pdfIcon from "../../../public/icon_pdf.png";

function SectionBallot({ newPDFs }) {
  return (
    <div className="min-h-[60%] w-full overflow-x-hidden flex align-items-center gap-10 p-10">
      {newPDFs.map((pdfUrl, index) => (
        <div key={index} className="flex-column items-center gap-4 flex-wrap">
          <img src={pdfIcon} alt="PDF Icon" className="w-8 h-8" />
          <PDFViewerComponent pdfFilePath={pdfUrl.url} />
          <p>Matrícula: {pdfUrl.alumn_id}</p>
        </div>
      ))}
    </div>
  );
}

export default SectionBallot;
