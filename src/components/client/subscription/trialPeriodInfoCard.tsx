import { CircleAlert } from "lucide-react";

interface Props {
  trialEndDate: string;
  subscriptionFee: any;
  maskedCardNumber?: string | null;
  cancelAtEndOfPeriod?: boolean;
  scheduledCancellationAt?: string;
}

const TrialPeriodInfoCard = ({
  trialEndDate,
  subscriptionFee,
  maskedCardNumber,
  cancelAtEndOfPeriod,
  scheduledCancellationAt,
}: Props) => {
  return (
    <div className="trial-card glass-card">
      <div className="trial-card-content">
        <div className="tc-icon">
          <CircleAlert />
        </div>

        <div className="trial-card-content-text">
          <h4>Trial Period Active</h4>
          {cancelAtEndOfPeriod ? (
            <p>
              Your trial has been cancelled and will end on{" "}
              <strong>{scheduledCancellationAt}</strong>. You won&apos;t be
              charged.
            </p>
          ) : (
            <p>
              You won&apos;t be charged until your trial ends on{" "}
              <strong>{trialEndDate}</strong>. Cancel anytime before then with
              no charge.
              {maskedCardNumber && (
                <>
                  {" "}
                  After the trial, your subscription will automatically renew at{" "}
                  <strong>${subscriptionFee}/month</strong>.
                </>
              )}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default TrialPeriodInfoCard;
