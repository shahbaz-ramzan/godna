"use client";

import { ArrowRight, RefreshCw, Sparkles } from "lucide-react";

interface Props {
  accountId: string | null;
  subscriptionUrl?: string | null;
  onNext: () => void;
}

const EndedStep = ({ accountId, subscriptionUrl, onNext }: Props) => (
  <div className="rm-step rm-step--ended">
    <div className="rm-ended-icon">
      <RefreshCw className="rm-ended-icon__svg" />
    </div>
    <p className="rm-ended-body">
      Account <span className="rm-ended-account">#{accountId}</span> no longer
      has an active subscription. Reactivate to regain full access to your
      behavioral insights, reports, and premium features.
    </p>
    <div className="rm-ended-actions">
      <button className="rm-btn rm-btn--primary" onClick={onNext}>
        <Sparkles className="rm-btn__icon" />
        Reactivate Now
        <ArrowRight className="rm-btn__arrow" />
      </button>
      {/* {subscriptionUrl && (
        <a
          className="rm-btn rm-btn--ghost rm-btn--full"
          href={subscriptionUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          Manage Subscription
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      )} */}
    </div>
  </div>
);

export default EndedStep;
