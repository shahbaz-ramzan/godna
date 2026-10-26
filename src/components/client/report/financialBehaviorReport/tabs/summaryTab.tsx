import { FinancialBehaviorSummarySkeleton } from "@/components/common/skeletons";
import { getFinancialSummary } from "@/network/apis/report";
import { AppDispatch, RootState } from "@/store";
import { setFinancialBehaviorReportSummary } from "@/store/slices/reportSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const SummaryTab = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [financialSummaryByUniqueStyle, setFinancialSummaryByUniqueStyle] =
    useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const {
    uniqueStyleAndDescription,
    strongestFactor,
    FinancialBehaviorReportSummary,
  } = useSelector((state: RootState) => ({
    uniqueStyleAndDescription: state.report.uniqueStyleAndDescription,
    strongestFactor: state.report.strongestFactor,
    FinancialBehaviorReportSummary: state.report.FinancialBehaviorReportSummary,
  }));

  useEffect(() => {
    setFinancialSummaryByUniqueStyle(
      FinancialBehaviorReportSummary?.find((item: any) => {
        return item.uniqueStyle === uniqueStyleAndDescription?.behaviorTypeName;
      }),
    );
  }, [FinancialBehaviorReportSummary, uniqueStyleAndDescription]);

  const fetchFinancialSummary = async () => {
    try {
      setIsLoading(true);
      const response: any = await getFinancialSummary();
      if (response?.value) {
        dispatch(setFinancialBehaviorReportSummary(response?.value));
      }
    } catch (error) {
      console.error("Error fetching financial summary:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchFinancialSummary();
  }, []);

  if (isLoading && !financialSummaryByUniqueStyle) {
    return <FinancialBehaviorSummarySkeleton />;
  }

  return (
    <div className="work-talent-summary-wrapper">
      <div className="work-talent-summary-card glass-card dna-gradient-soft">
        <div className="summary-card-content">
          <div className="summary-card-content-header">
            <div className="card-header-left">
              <p className="card-caption-text">Your Unique Style</p>
              <h2>{uniqueStyleAndDescription?.behaviorTypeName}</h2>
              <p className="cards-keywords">{strongestFactor?.join(", ")}</p>
            </div>
            <span data-slot="badge" className="summary-badge dna-gradient">
              ~89% Accuracy
            </span>
          </div>
          <p className="summary-card-description">
            {uniqueStyleAndDescription?.behaviorTypeDescription}
          </p>
        </div>
      </div>
      <div className="sm-wrapper glass-card">
        <h3>Summary</h3>
        <p>{financialSummaryByUniqueStyle?.SummaryText}</p>
      </div>
    </div>
  );
};

export default SummaryTab;
