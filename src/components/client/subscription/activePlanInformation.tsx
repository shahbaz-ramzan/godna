import UpdatePaymentModal from "@/modals/updatePaymentModal";
import { Button } from "antd";
import dayjs from "dayjs";
import { useState } from "react";
import { SubscriptionData } from "../subscription";

interface ActivePlanInformationProps {
  subscriptionEndDate: string;
  isTrial: boolean;
  trialPeriodDays: number;
  trialDaysRemaining: number;
  subscriptionDetails: SubscriptionData | null;
  subscriptionFee: number;
  loading: boolean;
  maskedCardNumber: string | null;
  onPaymentSuccess?: () => void;
}

const ActivePlanInformation = ({
  subscriptionEndDate,
  isTrial,
  trialPeriodDays,
  trialDaysRemaining,
  subscriptionDetails,
  subscriptionFee,
  loading,
  maskedCardNumber,
  onPaymentSuccess,
}: ActivePlanInformationProps) => {
  const [subscriptionModal, setSubscriptionModal] = useState(false);
  const autoRenewalText = subscriptionDetails?.cancelAtEndOfPeriod
    ? "Disabled"
    : "Enabled";

  const handleUpdatePayment = () => {
    setSubscriptionModal(true);
  };

  const handleCancelSubscription = () => {
    window.open(subscriptionDetails?.url, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="subscription-card-wrapper glass-card">
      <div className="card-header">
        <div className="card-header-left">
          <div className="card-header-left-title">
            <h2>{subscriptionDetails?.subscriptionName}</h2>
            {isTrial && (
              <span className="dna-gradient" data-slot="badge">
                Active Trial
              </span>
            )}
          </div>
          {isTrial && (
            <p>
              {trialPeriodDays}-day free trial •{" "}
              {trialDaysRemaining === 0
                ? "last day"
                : `${trialDaysRemaining} ${trialDaysRemaining === 1 ? "day" : "days"} remaining`}
            </p>
          )}
        </div>
        <div className="card-header-right">
          <h6>${subscriptionFee}/month</h6>
          {/* <p>30-day money-back guarantee</p> */}
        </div>
      </div>
      <div className="card-separator" />
      <div className="subscription-card-body">
        <div className="billing-info-card space-y-3">
          <h4>Billing Information</h4>
          <div className="billing-info-list">
            <div className="billing-info-list-item">
              <h6>Amount</h6>
              <span>${subscriptionFee}/month</span>
            </div>
            {!subscriptionDetails?.cancelAtEndOfPeriod && (
              <div className="billing-info-list-item">
                <h6>Next billing date</h6>
                <span>{subscriptionEndDate}</span>
              </div>
            )}
            {maskedCardNumber && (
              <div className="billing-info-list-item">
                <h6>Payment method</h6>
                <span>{maskedCardNumber}</span>
              </div>
            )}
            <div className="billing-info-list-item">
              <h6>Auto-renewal</h6>
              <span>{autoRenewalText}</span>
            </div>
            {subscriptionDetails?.cancelAtEndOfPeriod && (
              <div className="billing-info-list-item">
                <h6>Subscription expiry</h6>
                <span>
                  {dayjs(subscriptionDetails.scheduledCancellationAt).format(
                    "MMMM D, YYYY",
                  )}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="subscription-card-btn flex gap-3 flex-wrap">
        <Button
          type="primary"
          className="thm-secondary-btn payment-btn"
          size="small"
          onClick={handleUpdatePayment}
        >
          {maskedCardNumber ? "Update Payment Method" : "Add Payment Method"}
        </Button>
        {!subscriptionDetails?.cancelAtEndOfPeriod && (
          <Button
            size="small"
            type="primary"
            className="thm-secondary-btn cb-btn"
            onClick={handleCancelSubscription}
            disabled={!subscriptionDetails?.url}
          >
            Cancel Subscription
          </Button>
        )}
      </div>
      <div className="subscription-card-footer">
        <p>Includes 1 Named User (Admin). Upgrade to add more admins.</p>
      </div>
      <UpdatePaymentModal
        open={subscriptionModal}
        onCancel={() => setSubscriptionModal(false)}
        onSuccess={onPaymentSuccess}
        addPayment={!maskedCardNumber}
      />
    </div>
  );
};

export default ActivePlanInformation;
