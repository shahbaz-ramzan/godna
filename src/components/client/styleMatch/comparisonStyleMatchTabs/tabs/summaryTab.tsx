import { useEffect, useRef } from "react";
import { useCountAnimation } from "../../../../../hooks/useCountAnimation";

interface SummaryTabProps {
  firstUserStyle: any;
  secondUserStyle: any;
  participantDetails: any;
  styleMatchPercent?: number | null;
}

const SummaryTab = ({
  firstUserStyle,
  secondUserStyle,
  participantDetails,
  styleMatchPercent,
}: SummaryTabProps) => {
  const { value: displayValue, runAnimation, cleanup } = useCountAnimation();
  const percentRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const el = percentRef.current;
    if (!el || styleMatchPercent == null) return;

    const target = Math.round(styleMatchPercent);
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) runAnimation(target);
      },
      { threshold: 0.1 },
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      cleanup();
    };
  }, [styleMatchPercent, runAnimation, cleanup]);

  return (
    <div className="style-match-summary-wrapper">
      <div className="style-summary-row">
        <div className="comparison-summary-card glass-card dna-gradient-soft">
          <div className="comparison-card-content">
            <p>User 1</p>
            <h2 className="text-blue">
              {participantDetails?.[0]?.firstName}{" "}
              {participantDetails?.[0]?.lastName}
            </h2>
            <span className="dna-gradient">
              {firstUserStyle?.behaviorTypeName}
            </span>
          </div>
          <p className="comparison-card-description">
            {firstUserStyle?.behaviorTypeDescription}
          </p>
        </div>
        <div className="comparison-summary-card glass-card dna-gradient-soft">
          <div className="comparison-card-content">
            <p>User 2</p>
            <h2 className="text-blue">
              {participantDetails?.[1]?.firstName}{" "}
              {participantDetails?.[1]?.lastName}
            </h2>
            <span className="dna-gradient">
              {secondUserStyle?.behaviorTypeName}
            </span>
          </div>
          <p className="comparison-card-description">
            {secondUserStyle?.behaviorTypeDescription}
          </p>
        </div>
      </div>
      <div className="style-overview-card glass-card">
        <h4 className="sm-title">Style Match</h4>
        <div className="style-match-centered">
          <p className="style-match-names">
            {participantDetails?.[0]?.firstName}{" "}
            {participantDetails?.[0]?.lastName} and{" "}
            {participantDetails?.[1]?.firstName}{" "}
            {participantDetails?.[1]?.lastName} have a
          </p>
          <p ref={percentRef} className="style-match-percent">
            {styleMatchPercent == null ? "—" : `${displayValue}%`}
          </p>
          <p className="style-match-label">Style Match</p>
        </div>
      </div>
    </div>
  );
};

export default SummaryTab;
