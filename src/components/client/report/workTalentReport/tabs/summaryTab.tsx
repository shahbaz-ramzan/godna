"use client";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { WorkTalentSummarySkeleton } from "@/components/common/skeletons";
import { Button } from "antd";
import { Maximize } from "lucide-react";
import { useRouter } from "next/navigation";
import { Routes } from "@/constants/routes";

interface SummaryTabProps {
  loading?: boolean;
}

export const SummaryTab = ({ loading }: SummaryTabProps) => {
  const router = useRouter();

  const { uniqueStyleAndDescription, careersInsights, strongestFactor } =
    useSelector((state: RootState) => ({
      uniqueStyleAndDescription: state.report.uniqueStyleAndDescription,
      careersInsights: state.report.careersInsights,
      strongestFactor: state.report.strongestFactor,
    }));

  const hasData =
    uniqueStyleAndDescription || careersInsights || strongestFactor;

  const handleRunDigitalScan = () => {
    router.push(`${Routes.CONTACTS}?openScan=true`);
  };

  return (
    <div className="work-talent-summary-wrapper">
      {loading || !hasData ? (
        <WorkTalentSummarySkeleton />
      ) : (
        <>
          <div className="work-talent-summary-card glass-card dna-gradient-soft">
            <div className="summary-card-content">
              <div className="summary-card-content-header">
                <div className="card-header-left">
                  <p className="card-caption-text">Your Unique Style</p>
                  <h2>{uniqueStyleAndDescription?.behaviorTypeName}</h2>
                  <p className="cards-keywords">
                    {strongestFactor?.join(", ")}
                  </p>
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
          <div className="summary-desired-tasks-card glass-card">
            <h3>Desired Tasks</h3>
            <p>Based on your behavioral profile, you are well-suited for:</p>
            <div className="desired-tasks-list grid grid-cols-1 md:grid-cols-2 gap-3">
              {careersInsights?.talents?.map((talent, index) => (
                <div key={index} className="desired-tasks-item">
                  <span
                    className={
                      index === 9 ? "text-primary" : "desired-tasks-item-icon"
                    }
                  >
                    •
                  </span>
                  <span
                    className={
                      index === 8
                        ? "caption text-muted-foreground"
                        : "desired-tasks-item-text"
                    }
                  >
                    {talent?.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
      <div className="work-talent-summary-card work-talent-next-step-card glass-card dna-gradient-soft">
        <div className="digital-scan-card-content">
          <p className="digital-scan-text">
            <span>Next Step:</span> Add contacts by running a Digital Scan
          </p>
          <div className="header-btn-wrapper">
            <Button
              className="header-btn-primary header-btn"
              icon={<Maximize />}
              onClick={handleRunDigitalScan}
            >
              Run Digital Scan
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
