import { CircleAlert } from "lucide-react";

const DiscoveryBottomCard = () => {
  return (
    <div className="discovery-footer-card glass-card">
      <div className="fc-header">
        <CircleAlert className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
        <div className="fc-content">
          <h4>What to expect</h4>
          <p>
            You’ll answer a short series of simple questions based on your
            natural preferences. There are no right or wrong answers. Just
            choose the option that feels most like you. Most people complete
            this in 4–10 minutes, and your results are available immediately.
          </p>
        </div>
      </div>
    </div>
  );
};

export default DiscoveryBottomCard;
