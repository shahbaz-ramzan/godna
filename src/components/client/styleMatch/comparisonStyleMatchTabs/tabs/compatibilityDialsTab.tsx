import { AnimatedCircleProgress } from "@/components/common/animatedCircleProgress";
import { Col, ProgressProps, Row } from "antd";
import { useEffect, useRef, useState } from "react";

interface CompatibilityDialsTabProps {
  firstUserBDNA5Scores: any;
  secondUserBDNA5Scores: any;
  participantDetails: any;
}

interface TraitItemProps {
  label: string;
  value: number;
  tooltip: string;
  description: string;
  progressGradient: ProgressProps["strokeColor"];
  triggerKey: number;
}

const TraitItem = ({
  label,
  value,
  tooltip,
  progressGradient,
  description,
  triggerKey,
}: TraitItemProps) => (
  <div className="key-work-traits-item compatibility-dials-trait-item">
    <div className="key-work-traits-item-icon">
      <AnimatedCircleProgress
        percent={value}
        size={90}
        strokeColor={progressGradient}
        strokeWidth={8}
        triggerKey={triggerKey}
        tooltip={tooltip}
      />
    </div>
    <div className="traits-item-text">
      <h4>{label}</h4>
      <p>{description}</p>
    </div>
  </div>
);

const UserTraitCard = ({ user, scores, progressGradient, triggerKey }: any) => {
  const traits = [
    { key: "resultsVsRelationships", label: "Results vs Relationships" },
    { key: "daringVsCareful", label: "Daring vs Careful" },
    { key: "abstractVsConcrete", label: "Abstract vs Concrete" },
    { key: "systematicVsFlexible", label: "Systematic vs Flexible" },
    { key: "promotingVsOperating", label: "Promoting vs Operating" },
  ];

  return (
    <div className="rc-card glass-card">
      <h4 className="comp-name">
        {user?.firstName} {user?.lastName}
      </h4>
      <div className="key-work-traits-list compatibility-dials-traits-list">
        {traits.map((trait) => (
          <TraitItem
            key={trait.key}
            label={trait.label}
            value={scores?.[trait.key]?.value}
            description={scores?.[trait.key]?.description}
            tooltip={`${scores?.[trait.key]?.label} (${scores?.[trait.key]?.value}%)`}
            progressGradient={progressGradient}
            triggerKey={triggerKey}
          />
        ))}
      </div>
    </div>
  );
};

const CompatibilityDialsTab = ({
  firstUserBDNA5Scores,
  secondUserBDNA5Scores,
  participantDetails,
}: CompatibilityDialsTabProps) => {
  const progressGradient: ProgressProps["strokeColor"] = {
    "0%": "#00C9A7",
    "50%": "#004E92",
    "100%": "#00C9A7",
  };

  const containerRef = useRef<HTMLDivElement>(null);
  const [triggerKey, setTriggerKey] = useState(0);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setTriggerKey((k) => k + 1);
      },
      { threshold: 0.1 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="key-work-traits-wrapper">
      <div className="key-work-traits-card glass-card">
        <h3>Compatibility Dials</h3>
        <p className="traits-description">
          Five key dimensions showing behavioral alignment between{" "}
          {participantDetails?.[0]?.firstName}{" "}
          {participantDetails?.[0]?.lastName} and{" "}
          {participantDetails?.[1]?.firstName}{" "}
          {participantDetails?.[1]?.lastName}
        </p>
        <Row gutter={[24, 24]}>
          <Col span={24} md={{ span: 12 }}>
            <UserTraitCard
              user={participantDetails?.[0]}
              scores={firstUserBDNA5Scores}
              progressGradient={progressGradient}
              triggerKey={triggerKey}
            />
          </Col>
          <Col span={24} md={{ span: 12 }}>
            <UserTraitCard
              user={participantDetails?.[1]}
              scores={secondUserBDNA5Scores}
              progressGradient={progressGradient}
              triggerKey={triggerKey}
            />
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default CompatibilityDialsTab;
