interface ComparisonSummaryTabProps {
  firstUserPerformanceGuide: any;
  secondUserPerformanceGuide: any;
  participantDetails: any;
  firstUserCommunicationInsights?: { preferredContactMethod?: string } | null;
  secondUserCommunicationInsights?: { preferredContactMethod?: string } | null;
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

const CollaborationInsightsTab = ({
  firstUserPerformanceGuide,
  secondUserPerformanceGuide,
  participantDetails,
  firstUserCommunicationInsights,
  secondUserCommunicationInsights,
}: ComparisonSummaryTabProps) => {
  const firstName0 = participantDetails?.[0]?.firstName;
  const lastName0 = participantDetails?.[0]?.lastName;
  const firstName1 = participantDetails?.[1]?.firstName;
  const lastName1 = participantDetails?.[1]?.lastName;

  const firstUserPreferredContact =
    firstUserCommunicationInsights?.preferredContactMethod;
  const secondUserPreferredContact =
    secondUserCommunicationInsights?.preferredContactMethod;

  return (
    <div className="comparison-summary-wrapper">
      <div className="comparison-summary-card glass-card">
        <h3 className="csc-title">Collaboration Insights</h3>
        <div className="comparison-content-row">
          <UserStrengthStrugglesList
            title={`${firstName0} ${lastName0}'s Communication Keys`}
            items={firstUserPerformanceGuide?.environmentKeys || []}
          />
          <UserStrengthStrugglesList
            title={`${firstName1} ${lastName1}'s Communication Keys`}
            items={secondUserPerformanceGuide?.environmentKeys || []}
          />
        </div>
        <div className="comparison-content-row">
          <UserStrengthStrugglesList
            title={`${firstName0} ${lastName0}'s Preferred Contact Method`}
            items={[
              {
                description: firstUserPreferredContact ?? "—",
              },
            ]}
          />
          <UserStrengthStrugglesList
            title={`${firstName1} ${lastName1}'s Preferred Contact Method`}
            items={[
              {
                description: secondUserPreferredContact ?? "—",
              },
            ]}
          />
        </div>
        {/* <div className="insights-card-wrapper">
                    <div className="insights-card glass-card">
                        <div className="insights-card-content">
                            <div className="icon-wrapper">
                                <CircleCheckBig className="h-6 w-6 text-primary" />
                            </div>
                            <div className="insights-card-content-text">
                                <h4>Work Well Together</h4>
                                <p>
                                    Leverage complementary strengths: John's structured
                                    strategic approach (Strategist) pairs well with Sarah's
                                    expressive communication style (Engager). Combine
                                    systematic planning with dynamic engagement for optimal
                                    results.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="insights-card glass-card">
                        <div className="insights-card-content">
                            <div className="icon-wrapper">
                                <TriangleAlert className="h-6 w-6 text-warning" />
                            </div>
                            <div className="insights-card-content-text">
                                <h4>Watch For</h4>
                                <p>
                                    Balance communication preferences: John values structured,
                                    analytical discussions while Sarah thrives on expressive,
                                    interactive dialogue. Create space for both detailed
                                    planning and spontaneous ideation.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="insights-card glass-card">
                        <div className="insights-card-content">
                            <div className="icon-wrapper">
                                <Briefcase className="h-6 w-6 text-blue" />
                            </div>
                            <div className="insights-card-content-text">
                                <h4>Best Fit Tasks</h4>
                                <p>
                                    Assign roles strategically: John excels at strategic
                                    planning, quality control, and process optimization. Sarah
                                    thrives in client engagement, motivating others, and
                                    relationship-building projects.
                                </p>
                            </div>
                        </div>
                    </div>
                </div> */}
      </div>
    </div>
  );
};

export default CollaborationInsightsTab;
