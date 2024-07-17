import ReportCard from "../../components/molecules/ReportCard";
import Text from "../../components/atoms/Text";

function ReportsSection({ reports }) {

    return (
        <div className="flex gap-2 flex-col">
            <Text text="Reportes activos" className="text-4xl" />
            <div className="flex flex-wrap justify-evenly items-center w-full my-5">
                {reports.map((report, key) => (
                    !report.deleted && (
                        <ReportCard
                            key={key}
                            id={report.report_id}
                            status={report.deleted}
                            description={report.topic}
                        />
                    )
                ))}
            </div>
            <Text text="Reportes anteriores" className="text-4xl" />
            <div className="flex flex-wrap justify-evenly items-center w-full my-5">
                {
                    reports.filter(item => item.deleted == true).map((report, key) => (
                        <ReportCard
                            key={key}
                            id={report.report_id}
                            status={report.deleted}
                            description={report.topic}
                        />
                    ))
                }
            </div>
        </div>
    )

}

export default ReportsSection; 