import { Routes } from "@/constants/routes";
import { useDiscoveryStatus } from "@/hooks/useDiscoveryStatus";
import { useQuestionAnswerStatus } from "@/hooks/useQuestionAnswerStatus";
import { Clock, Target } from "lucide-react";
import Link from "next/link";

const QuickDiscovery = () => {
  const { completed, scheduled } = useDiscoveryStatus();
  const { inProgress, loading } = useQuestionAnswerStatus();
  const href =
    inProgress && scheduled ? Routes.DISCOVERY : Routes.DISCOVERY_INSTRUCTION;
  const displayBtnText = () => {
    if (loading) {
      return "Loading...";
    }
    if (inProgress) {
      return "Continue Discovery";
    } else if (scheduled) {
      return "Start 17Q Discovery";
    } else if (completed) {
      return "View Report";
    }
    return "Start 17Q Discovery";
  };

  return (
    <div className="quick-discovery-card glass-card">
      <div className="qd-card-header">
        <div className="qd-card-badge">
          <span data-slot="badge">17 Questions</span>
        </div>
        <h2>Quick Discovery</h2>
      </div>

      <div className="qd-card-content space-y-4">
        <div className="qd-content-item flex items-start gap-3">
          <Clock className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
          <div className="qd-content-text">
            <h4>4–5 minutes</h4>
            <p className="">Fast and efficient</p>
          </div>
        </div>

        <div className="qd-content-item flex items-start gap-3">
          <Target className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
          <div className="qd-content-text">
            <h4>~89% accuracy</h4>
            <p className="caption text-muted-foreground">
              Quick, directional insights
            </p>
          </div>
        </div>
      </div>

      {loading ? (
        <div
          className="qd-card-button dna-gradient opacity-60 cursor-not-allowed"
          aria-disabled="true"
        >
          {displayBtnText()}
        </div>
      ) : (
        <Link href={href} className="qd-card-button dna-gradient">
          {displayBtnText()}
        </Link>
      )}
    </div>
  );
};

export default QuickDiscovery;
