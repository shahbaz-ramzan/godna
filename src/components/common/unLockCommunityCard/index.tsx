import { Button } from "antd";
import { ArrowUpRight, Lock } from "lucide-react";

const UnLockCommunityCard = () => {
  const handleContactUs = () => {
    globalThis.location.href = "mailto:dnacare@dnabehavior.com";
  };
  return (
    <div className="community-insights-card glass-card">
      <div className="ci-card-content">
        <div className="community-icon">
          <Lock />
        </div>
        <div className="community-card-text">
          <h4>Unlock Community Insights</h4>
          <p>
            Get deeper insights across your client base with advanced analysis
            and reporting. To learn more, contact us by email.
          </p>
        </div>
        <Button
          type="primary"
          className="thm-secondary-btn community-button"
          iconPlacement="end"
          icon={<ArrowUpRight className="h-4 w-4" />}
          onClick={handleContactUs}
        >
          Contact Us
        </Button>
      </div>
    </div>
  );
};

export default UnLockCommunityCard;
