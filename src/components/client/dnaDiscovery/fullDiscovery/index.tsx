import {
  DNA_APP_GUIDE_URL,
  UPGRADE_FULL_DISCOVERY_URL,
} from "@/constants/urls";
import { Clock, Target } from "lucide-react";
import Link from "next/link";

const FullDiscovery = () => {
  return (
    <div className="quick-discovery-card full-discovery-card glass-card relative dna-gradient-soft">
      <span data-slot="badge" className="recommended-badge dna-gradient ">
        Recommended
      </span>

      <div className="qd-card-header">
        <div className="qd-card-badge">
          <span data-slot="badge">46 Questions</span>
        </div>
        <h2>Full Discovery</h2>
      </div>

      <div className="qd-card-content">
        <div className="qd-content-item">
          <Clock className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
          <div className="qd-content-text">
            <h4>10–12 minutes</h4>
            <p>Worth the extra time</p>
          </div>
        </div>

        <div className="qd-content-item">
          <Target className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
          <div className="qd-content-text">
            <h4>~97.1% accuracy</h4>
            <p>Enhanced depth & predictability (upgrade required)</p>
          </div>
        </div>
      </div>

      <div className="qd-card-button-group">
        <Link
          href={UPGRADE_FULL_DISCOVERY_URL}
          target="_blank"
          rel="noopener noreferrer"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <button
            data-slot="button"
            className="full-discovery-button"
            title="Upgrade to access Full Discovery (46 Questions)"
          >
            Upgrade Now
          </button>
        </Link>
        <Link
          href={DNA_APP_GUIDE_URL}
          target="_blank"
          rel="noopener noreferrer"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <button data-slot="button" className="recommend-btn">
            Why we recommend 46Q
          </button>
        </Link>
      </div>
    </div>
  );
};

export default FullDiscovery;
