import { Check } from "lucide-react";
import Link from "next/link";

const UpgradePlanCards = () => {
  return (
    <div className="upgrade-plan-section">
      <div className="upgrade-plan-header">
        <h2>Upgrade to Enterprise Plans</h2>
        <p>Unlock more features and advanced analytics</p>
      </div>
      <div className="upgrade-plan-row">
        <div className="upgrade-plan-card glass-card">
          <div className="upgrade-plan-card-header">
            <h3>Professional</h3>
            <p>$7,950/year</p>
          </div>
          <ul className="upgrade-plan-list">
            <li>
              <Check />
              <span>Includes 1 admin (named user)</span>
            </li>
            <li>
              <Check />
              <span>Team/Group Report</span>
            </li>
            <li>
              <Check />
              <span>Advanced analytics</span>
            </li>
            <li>
              <Check />
              <span>Coaching reports</span>
            </li>
            <li>
              <Check />
              <span>Priority Training and Support</span>
            </li>
          </ul>
          <Link
            href="https://dnabehavior.com/platform-pricing"
            target="_blank"
            rel="noopener noreferrer"
            className="upgrade-plan-button"
          >
            See full plan comparison
          </Link>
        </div>
        <div className="upgrade-plan-card glass-card">
          <div className="upgrade-plan-card-header">
            <h3>Small Business</h3>
            <p>$17,490/year</p>
          </div>
          <ul className="upgrade-plan-list">
            <li>
              <Check />
              <span>Includes 3 admins (named users)</span>
            </li>
            <li>
              <Check />
              <span>Team/Group Report</span>
            </li>
            <li>
              <Check />
              <span>Advanced analytics</span>
            </li>
            <li>
              <Check />
              <span>Dedicated account manager</span>
            </li>
            <li>
              <Check />
              <span>API access</span>
            </li>
          </ul>
          <Link
            href="https://dnabehavior.com/platform-pricing"
            target="_blank"
            rel="noopener noreferrer"
            className="upgrade-plan-button"
          >
            See full plan comparison
          </Link>
        </div>
        <div className="upgrade-plan-card glass-card">
          <div className="upgrade-plan-card-header">
            <h3>Enterprise</h3>
            <p>$27,030/year</p>
          </div>
          <ul className="upgrade-plan-list">
            <li>
              <Check />
              <span>Includes 5 admins (named users)</span>
            </li>
            <li>
              <Check />
              <span>Custom integrations</span>
            </li>
            <li>
              <Check />
              <span>White-label options</span>
            </li>
            <li>
              <Check />
              <span>Team/Group Report</span>
            </li>
            <li>
              <Check />
              <span>Priority onboarding</span>
            </li>
          </ul>
          <a
            href="https://dnabehavior.com/platform-pricing"
            target="_blank"
            rel="noopener noreferrer"
            className="upgrade-plan-button"
          >
            See full plan comparison
          </a>
        </div>
      </div>
    </div>
  );
};

export default UpgradePlanCards;
