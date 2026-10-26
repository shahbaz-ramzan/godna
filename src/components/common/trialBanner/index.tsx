"use client";

import { formatDays } from "@/lib/utils";
import UpdatePaymentModal from "@/modals/updatePaymentModal";
import { AlertTriangle, X } from "lucide-react";
import { useState } from "react";

export interface TrialBannerProps {
  visible?: boolean;
  daysRemaining?: number;
  maskedCardNumber?: string | null;
}

const TrialBanner = ({
  visible = true,
  daysRemaining = 0,
  maskedCardNumber,
}: TrialBannerProps) => {
  const [dismissed, setDismissed] = useState(false);
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);
  if (!visible || dismissed) return null;

  return (
    <>
      <div className="trial-banner" role="alert" aria-live="polite">
        <div className="trial-banner-inner">
          <div className="trial-banner-content">
            <span className="trial-banner-icon" aria-hidden="true">
              <AlertTriangle />
            </span>
            <div className="trial-banner-text">
              <span className="trial-banner-description">
                {daysRemaining === 0 ? (
                  <strong>Last day of your free trial</strong>
                ) : (
                  <>
                    Your free trial will expire in{" "}
                    <strong>{formatDays(daysRemaining)}</strong>
                  </>
                )}
              </span>
            </div>
          </div>
          <div className="trial-banner-actions">
            {maskedCardNumber ? (
              <button
                className="trial-banner-dismiss-btn cursor-pointer"
                onClick={() => setDismissed(true)}
                aria-label="Dismiss"
              >
                <X className="w-4 h-4" />
              </button>
            ) : (
              <button
                className="trial-banner-upgrade-btn"
                onClick={() => setPaymentModalOpen(true)}
              >
                Add Payment Method
              </button>
            )}
          </div>
        </div>
      </div>
      <UpdatePaymentModal
        addPayment={true}
        open={paymentModalOpen}
        onCancel={() => setPaymentModalOpen(false)}
      />
    </>
  );
};

export default TrialBanner;
