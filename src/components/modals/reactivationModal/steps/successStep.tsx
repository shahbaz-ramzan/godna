"use client";

import { CheckCircle2 } from "lucide-react";

interface Props {
  nextBilling: string | null;
  onDone: () => void;
}

const SuccessStep = ({ nextBilling, onDone }: Props) => (
  <div className="rm-step rm-step--success">
    <div className="rm-success-icon">
      <CheckCircle2 className="rm-success-icon__svg" />
    </div>
    <h2 className="rm-success-title">You&apos;re back!</h2>
    <p className="rm-success-body">
      Your subscription has been reactivated successfully.
    </p>
    {nextBilling && (
      <div className="rm-success-summary">
        <div className="rm-success-summary__row">
          <span>Next billing date</span>
          <strong>{nextBilling}</strong>
        </div>
      </div>
    )}
    <button
      className="rm-btn rm-btn--primary rm-btn--full"
      onClick={onDone}
      type="button"
    >
      Go to Dashboard
    </button>
  </div>
);

export default SuccessStep;
