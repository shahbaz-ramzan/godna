import { ReportType } from "@/constants/report";
import { Button } from "antd";
interface SwitchReportProps {
  setActiveReport: (report: ReportType) => void;
  activeReport: ReportType;
}
const SwitchReport = ({ setActiveReport, activeReport }: SwitchReportProps) => {
  return (
    <div className="glass-card p-6">
      <div className="report-path-card">
        <p>Choose report path:</p>
        <div className="report-path-button-wrap flex gap-2">
          <Button
            type="primary"
            onClick={() => setActiveReport(ReportType.WORK_TALENT)}
            className={`${
              activeReport === ReportType.WORK_TALENT
                ? "thm-btn"
                : "thm-secondary-btn"
            }`}
          >
            Work Talent
          </Button>
          <Button
            type="primary"
            onClick={() => setActiveReport(ReportType.FINANCIAL_BEHAVIOR)}
            className={`${
              activeReport === ReportType.FINANCIAL_BEHAVIOR
                ? "thm-btn"
                : "thm-secondary-btn"
            }`}
          >
            Financial Behavior
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SwitchReport;
