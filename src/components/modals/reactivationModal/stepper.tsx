"use client";

import { Check } from "lucide-react";

type Step = "ended" | "payment" | "success";

interface Props {
  step: Step;
}

const STEPS = [
  { key: "ended", label: "Reactivate" },
  { key: "payment", label: "Payment" },
];

const stepOrder: Step[] = ["ended", "payment", "success"];

const Stepper = ({ step }: Props) => {
  const currentIndex = stepOrder.indexOf(step);

  return (
    <div className="rm-stepper">
      {STEPS.map((s, i) => {
        const itemIndex = stepOrder.indexOf(s.key as Step);
        const isCompleted = currentIndex > itemIndex;
        const isActive = currentIndex === itemIndex;
        return (
          <div key={s.key} className="rm-stepper__item">
            <div
              className={`rm-stepper__dot${isActive ? " rm-stepper__dot--active" : ""}${isCompleted ? " rm-stepper__dot--done" : ""}`}
            >
              {isCompleted ? (
                <Check className="w-3 h-3 text-white" />
              ) : (
                <span>{i + 1}</span>
              )}
            </div>
            <span
              className={`rm-stepper__label${isActive ? " rm-stepper__label--active" : ""}`}
            >
              {s.label}
            </span>
            {i < STEPS.length - 1 && (
              <div
                className={`rm-stepper__line${isCompleted ? " rm-stepper__line--done" : ""}`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Stepper;
