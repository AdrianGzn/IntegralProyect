import SearchPlaque from "../molecules/SearchPlaque";
import Template from "../molecules/Template";
import DownloadFormat from "../molecules/DownloadFormat";

function TeacherSection() {
  return (
    <div className="w-full h-[80vh] flex flex-wrap justify-center items-center">
      <SearchPlaque />
      <Template />
      <DownloadFormat text="Descargar formato" />
    </div>
  );
}

export default TeacherSection;
