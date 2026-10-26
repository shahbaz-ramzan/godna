"use client";
import { Routes } from "@/constants/routes";
import { useDiscoveryStatus } from "@/hooks/useDiscoveryStatus";
import { CreditCard, FileText, UserPlus, Users } from "lucide-react";
import Link from "next/link";

const QUICK_ACTION_CARDS = [
  {
    icon: FileText,
    label: "View My Report",
    subtitle: "Full behavioral profile",
    href: Routes.REPORT,
    iconClass: "qa-icon-report",
    requiresDiscovery: true,
  },
  {
    icon: UserPlus,
    label: "Add a Contact",
    subtitle: "Run a digital DNA scan",
    href: `${Routes.CONTACTS}?openScan=true`,
    iconClass: "qa-icon-contact",
    requiresDiscovery: false,
  },
  {
    icon: Users,
    label: "Style Match",
    subtitle: "Compare with others",
    href: Routes.STYLE_MATCH,
    iconClass: "qa-icon-style",
    requiresDiscovery: true,
  },
  {
    icon: CreditCard,
    label: "Manage Subscription",
    subtitle: "Billing & plan details",
    href: Routes.SUBSCRIPTION,
    iconClass: "qa-icon-subscription",
    requiresDiscovery: false,
  },
];

const QuickActions = () => {
  const { completed } = useDiscoveryStatus();

  const visibleCards = QUICK_ACTION_CARDS.filter(
    (card) => !card.requiresDiscovery || completed,
  );

  return (
    <div className="dashboard-quick-actions-section">
      {/* <h4 className="qa-section-label">Quick Actions</h4> */}
      <div
        className={`qa-cards-grid ${visibleCards.length <= 2 ? "qa-cards-grid--half" : ""}`}
        aria-label="Quick actions"
      >
        {visibleCards.map((card) => (
          <Link
            key={card.label}
            href={card.href}
            className="qa-card glass-card"
          >
            <div className={`qa-card-icon ${card.iconClass}`}>
              <card.icon className="h-5 w-5" />
            </div>
            <div className="qa-card-content">
              <span className="qa-label">{card.label}</span>
              <span className="qa-sub">{card.subtitle}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;
