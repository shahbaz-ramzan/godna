interface ComparisonSummaryTabProps {
  firstUserPerformanceGuide: any;
  secondUserPerformanceGuide: any;
  participantDetails: any;
}

interface UserStrengthStrugglesListProps {
  title: string;
  items: any[];
}

const UserStrengthStrugglesList = ({
  title,
  items,
}: UserStrengthStrugglesListProps) => (
  <div className="comparison-list-wrapper">
    <h4>{title}</h4>
    <ul className="comparison-list">
      {items.map((item, index) => (
        <li key={index} className="comparison-list-item">
          <span className="comparison-list-icon"></span>
          <span className={"comparison-text"}>{item?.description}</span>
        </li>
      ))}
    </ul>
  </div>
);

const ComparisonSummaryTab = ({
  firstUserPerformanceGuide,
  secondUserPerformanceGuide,
  participantDetails,
}: ComparisonSummaryTabProps) => {
  const firstName0 = participantDetails?.[0]?.firstName;
  const lastName0 = participantDetails?.[0]?.lastName;
  const firstName1 = participantDetails?.[1]?.firstName;
  const lastName1 = participantDetails?.[1]?.lastName;

  return (
    <div className="comparison-summary-wrapper">
      <div className="comparison-summary-card glass-card">
        <h4 className="csc-title">Talent Comparison</h4>
        <div className="comparison-content-row">
          <UserStrengthStrugglesList
            title={`${firstName0} ${lastName0}'s Strengths`}
            items={firstUserPerformanceGuide?.strengths || []}
          />
          <UserStrengthStrugglesList
            title={`${firstName1} ${lastName1}'s Strengths`}
            items={secondUserPerformanceGuide?.strengths || []}
          />
        </div>
        <div className="comparison-content-row">
          <UserStrengthStrugglesList
            title={`${firstName0} ${lastName0}'s Struggles`}
            items={firstUserPerformanceGuide?.struggles || []}
          />
          <UserStrengthStrugglesList
            title={`${firstName1} ${lastName1}'s Struggles`}
            items={secondUserPerformanceGuide?.struggles || []}
          />
        </div>
      </div>
    </div>
  );
};

export default ComparisonSummaryTab;
