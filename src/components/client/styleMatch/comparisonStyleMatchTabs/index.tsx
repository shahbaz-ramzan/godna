import type { TabsProps } from "antd";
import { Button, Tabs } from "antd";
import CollaborationInsightsTab from "./tabs/collaborationInsightsTab";
import ComparisonSummaryTab from "./tabs/comparisonSummaryTab";
import CompatibilityDialsTab from "./tabs/compatibilityDialsTab";
import SummaryTab from "./tabs/summaryTab";

export interface ComparisonStyleMatchTabsProps {
  firstUserStyle: any;
  secondUserStyle: any;
  firstUserPerformanceGuide?: any;
  secondUserPerformanceGuide?: any;
  firstUserBDNA5Scores?: any;
  secondUserBDNA5Scores?: any;
  participantDetails: any;
  styleMatchPercent?: number | null;
  firstUserCommunicationInsights?: any;
  secondUserCommunicationInsights?: any;
  onCompareDifferentUsers?: () => void;
}

const ComparisonStyleMatchTabs = ({
  firstUserStyle,
  secondUserStyle,
  firstUserPerformanceGuide,
  secondUserPerformanceGuide,
  firstUserBDNA5Scores,
  secondUserBDNA5Scores,
  participantDetails,
  styleMatchPercent,
  firstUserCommunicationInsights,
  secondUserCommunicationInsights,
  onCompareDifferentUsers,
}: ComparisonStyleMatchTabsProps) => {
  const items: TabsProps["items"] = [
    {
      key: "summary",
      label: "Summary",
      children: (
        <SummaryTab
          firstUserStyle={firstUserStyle}
          secondUserStyle={secondUserStyle}
          participantDetails={participantDetails}
          styleMatchPercent={styleMatchPercent}
        />
      ),
    },
    {
      key: "dials",
      label: "Compatibility Dials",
      children: (
        <CompatibilityDialsTab
          firstUserBDNA5Scores={firstUserBDNA5Scores}
          secondUserBDNA5Scores={secondUserBDNA5Scores}
          participantDetails={participantDetails}
        />
      ),
    },
    {
      key: "insights",
      label: "Collaboration Insights",
      children: (
        <CollaborationInsightsTab
          firstUserPerformanceGuide={firstUserPerformanceGuide}
          secondUserPerformanceGuide={secondUserPerformanceGuide}
          participantDetails={participantDetails}
          firstUserCommunicationInsights={firstUserCommunicationInsights}
          secondUserCommunicationInsights={secondUserCommunicationInsights}
        />
      ),
    },
    {
      key: "comparison",
      label: "Comparison Summary",
      children: (
        <ComparisonSummaryTab
          firstUserPerformanceGuide={firstUserPerformanceGuide}
          secondUserPerformanceGuide={secondUserPerformanceGuide}
          participantDetails={participantDetails}
        />
      ),
    },
  ];

  return (
    <>
      <div className="flex flex-col gap-2 space-y-6">
        <Tabs
          defaultActiveKey="summary"
          centered
          size="small"
          items={items}
          className="thm-tabs"
        />
      </div>
      <div className="compare-btn-wrapper">
        <Button
          size="small"
          className="thm-secondary-btn compare-btn"
          onClick={onCompareDifferentUsers}
        >
          Compare Different Users
        </Button>
      </div>
    </>
  );
};

export default ComparisonStyleMatchTabs;
