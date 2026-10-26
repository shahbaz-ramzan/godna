import { AnimatedCircleProgress } from "@/components/common/animatedCircleProgress";
import { RootState } from "@/store";
import { ProgressProps } from "antd";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";

type TraitKey =
  | "financialPlanningManagement"
  | "financialRelationshipManagement"
  | "riskBehavior"
  | "wealthBuildingMotivation"
  | "financialEmotionalIntelligence";

const progressGradient: ProgressProps["strokeColor"] = {
  "0%": "#00C9A7",
  "50%": "#004E92",
  "100%": "#00C9A7",
};

const traits: { key: TraitKey; title: string }[] = [
  {
    key: "financialPlanningManagement",
    title: "Financial Planning Management",
  },
  {
    key: "financialRelationshipManagement",
    title: "Financial Relationship Management",
  },
  { key: "riskBehavior", title: "Risk Behavior" },
  { key: "wealthBuildingMotivation", title: "Wealth Creation Motivation" },
  {
    key: "financialEmotionalIntelligence",
    title: "Financial Emotional Intelligence",
  },
];

const TraitsTab = () => {
  const fdna5Scores = useSelector(
    (state: RootState) => state.report.fdna5Scores,
  );

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
        <h3>Financial Behaviors</h3>
        <p className="traits-description">
          Your behavioral patterns across key financial dimensions
        </p>

        <div className="key-work-traits-list">
          {traits.map(({ key, title }) => {
            const trait = fdna5Scores?.[key];

            return (
              <div key={key} className="key-work-traits-item">
                <div className="key-work-traits-item-icon">
                  <AnimatedCircleProgress
                    percent={trait?.value ?? 0}
                    size={135}
                    strokeColor={progressGradient}
                    strokeWidth={8}
                    triggerKey={triggerKey}
                    tooltip={trait?.value ? `${trait.value}%` : undefined}
                  />
                </div>

                <div className="traits-item-text">
                  <h4>{title}</h4>
                  <p>{trait?.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TraitsTab;
