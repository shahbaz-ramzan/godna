import { Download } from "lucide-react";

const BillingHistoryCard = () => {
  return (
    <div className="billing-history-card glass-card">
      <h3>Billing History</h3>
      <div className="billing-history-card-content">
        <div className="billing-history-card-item">
          <div className="history-card-left">
            <h6>7-day trial period</h6>
            <p>January 10, 2025</p>
          </div>
          <div className="history-card-right">
            <span data-slot="badge" className="trial-badge">
              Trial
            </span>
            <span className="billing-history-amount">$0.00</span>
            <button
              data-slot="button"
              className="billing-history-download-btn"
              aria-label="Download invoice"
            >
              <Download className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BillingHistoryCard;
