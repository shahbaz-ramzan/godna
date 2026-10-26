import { ReportType } from "@/constants/report";
import { FinancialBehaviorReport } from "./financialBehaviorReport";
import { WorkTalentReport } from "./workTalentReport";

interface SwitchReportContentProps {
  activeReport: ReportType;
  loading: boolean;
}

const SwitchReportContent = ({
  activeReport,
  loading,
}: SwitchReportContentProps) => {
  return (
    <>
      {activeReport === ReportType.WORK_TALENT && (
        <WorkTalentReport loading={loading} />
      )}
      {activeReport === ReportType.FINANCIAL_BEHAVIOR && (
        <FinancialBehaviorReport />
      )}
    </>
  );
};

export default SwitchReportContent;
