"use client";
import { TrendingUp } from "lucide-react";
import { StripSkeleton } from "./marketMoodSkeletons";

interface CommunityStripProps {
  loading?: boolean;
}

const CommunityStrip = ({ loading }: CommunityStripProps) => {
  if (loading) return <StripSkeleton />;

  return (
    <div className="mm-community-strip">
      <div className="mm-positive-badge">
        <TrendingUp size={22} />
        <span>Positive</span>
      </div>
      <div className="mm-strip-divider" />
      <p className="mm-strip-text">
        <strong>Community Mood vs Market</strong> — 60% of your community reports
        a positive mood despite market decline
      </p>
    </div>
  );
};

export default CommunityStrip;
