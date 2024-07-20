import ReportCard from "../../components/molecules/ReportCard";
import Text from "../../components/atoms/Text";

function ReportsSection({ reports }) {

    return (
        <div className="flex justify-center flex-wrap mb-10 bg-gray-800 rounded-lg">
            <Text text="Reportes activos" className="!text-2xl !mb-0 underline decoration-lime-500" />
            <div className="flex flex-wrap justify-evenly items-center w-full my-5">
                {reports.map((report, key) => (
                    !report.deleted && (
                        <ReportCard
                            key={key}
                            id={report.report_id}
                            status={report.status}
                            description={report.topic}
                        />
                    )
                ))}
            </div>
            <Text text="Reportes anteriores" className="!text-2xl mb-0 underline decoration-lime-500" />
            <div className="flex flex-wrap justify-evenly items-center w-full my-5">
                {
                    reports.filter(item => item.deleted == true).map((report, key) => (
                        <ReportCard
                            key={key}
                            id={report.report_id}
                            status={report.status}
                            description={report.topic}
                        />
                    ))
                }
            </div>
        </div>
    )

}

export default ReportsSection; 