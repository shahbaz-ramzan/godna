"use client";
import ClientDashboardHeader from "@/components/common/clientDashboardHeader/clientDashboardHeader";
import GeneAIChatbot from "@/components/common/geneAIChatbot";
import FullScreenLoader from "@/components/common/loader";
import TrialInfoModal from "@/components/modals/trialInfoModal";
import { Routes } from "@/constants/routes";
import { useLoggedPersonId } from "@/hooks/useLoggedPersonId";
import { useLoggedPersonName } from "@/hooks/useLoggedPersonName";
import UpdatePaymentModal from "@/modals/updatePaymentModal";
import { getUniqueStyleApi } from "@/network/apis/discovery";
import { getUniqueStyleAndDescriptionApi } from "@/network/apis/report";
import { AppDispatch, RootState } from "@/store";
import { setUniqueStyleAndDescription } from "@/store/slices/reportSlice";
import { Button } from "antd";
import { ArrowRight, Lightbulb } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import FullDiscovery from "../dnaDiscovery/fullDiscovery";
import QuickDiscovery from "../dnaDiscovery/quickDiscovery";
import QuickActions from "./quickActions";
import RecommendedNextStep from "./recommendedNextStep";

let trialModalShown = false;

const Dashboard = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const {
    uniqueStyleAndDescription,
    trialDaysRemaining,
    isTrial,
    maskedCardNumber,
  } = useSelector((state: RootState) => ({
    uniqueStyleAndDescription: state.report.uniqueStyleAndDescription,
    trialDaysRemaining: state.subscription.trialDaysRemaining,
    isTrial: state.subscription.isTrial,
    maskedCardNumber: state.subscription.maskedCardNumber,
  }));
  const personId = useLoggedPersonId();
  const loggedPersonName = useLoggedPersonName();
  const [chatbotOpen, setChatbotOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [trialModalOpen, setTrialModalOpen] = useState(false);
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);

  const fetchUniqueStyleData = async (personId: string) => {
    try {
      setLoading(true);
      // Cheap pre-check: GetUniqueStyle returns `data.uniqueStyle: null` on a
      // normal 200 when discovery isn't completed yet — unlike
      // getUniqueStyleAndDescriptionApi, which 400s in that case. Every user
      // hits this dashboard right after login regardless of discovery
      // status, so we only pay for the heavier call once we know there's
      // actually a style to describe.
      const styleCheck: any = await getUniqueStyleApi(personId);
      if (!styleCheck?.data?.uniqueStyle) return;

      const response: any = await getUniqueStyleAndDescriptionApi(personId);
      if (response?.data) {
        dispatch(setUniqueStyleAndDescription(response.data));
      }
    } catch (err) {
      console.error("Failed to fetch unique style data", err);
    } finally {
      setLoading(false);
    }
  };
  const handleViewFullReport = () => {
    router.push(Routes.REPORT);
  };

  const dismissTrialModal = () => {
    setTrialModalOpen(false);
  };

  const handleAddPayment = () => {
    dismissTrialModal();
    setPaymentModalOpen(true);
  };

  useEffect(() => {
    if (personId) {
      fetchUniqueStyleData(personId);
    }
  }, [personId]);

  useEffect(() => {
    if (!isTrial || trialDaysRemaining >= 7 || maskedCardNumber) return;

    if (!trialModalShown) {
      trialModalShown = true;
      setTrialModalOpen(true);
    }
  }, [isTrial, trialDaysRemaining, maskedCardNumber]);

  if (loading) {
    return <FullScreenLoader />;
  }

  return (
    <>
      <ClientDashboardHeader
        title={`Welcome back, <span>${loggedPersonName}</span>!`}
        description="Let's continue your behavioral discovery journey"
      />
      {uniqueStyleAndDescription && (
        <div className="dashboard-report-card dna-gradient-soft glass-card">
          <div className="dashboard-card-content">
            <div className="dashboard-card-content-left space-y-2">
              <p className="dashboard-card-caption text-muted-foreground">
                Your Natural Behavior Unique Style
              </p>

              <h2 className="text-primary">
                {uniqueStyleAndDescription.behaviorTypeName}
              </h2>

              <p className="dashboard-card-description">
                {uniqueStyleAndDescription.behaviorTypeDescription}
              </p>
            </div>

            <Button
              type="primary"
              className="thm-secondary-btn report-btn"
              iconPlacement="end"
              icon={<ArrowRight className="h-4 w-4" />}
              onClick={handleViewFullReport}
            >
              View Full Report
            </Button>
          </div>
        </div>
      )}
      {!uniqueStyleAndDescription && (
        <div className="discovery-row dashboard-discovery-row">
          {/* Quick Discovery Card */}
          <QuickDiscovery />
          {/* Full Discovery Card */}
          <FullDiscovery />
        </div>
      )}

      {/* <div className="dashboard-quick-actions">
        <h3 className="mb-4">Quick Actions</h3>
        <div className="dashboard-quick-row">
          <div className="ask-geneai-card" onClick={() => setChatbotOpen(true)}>
            <div className="ask-geneai-card-icon">
              <Sparkles />
            </div>
            <div className="ask-geneai-card-content">
              <h4>Ask GeneAI</h4>
              <p>Get AI insights about your behavioral style</p>
            </div>
            <ArrowRight className="right-arrow-hover" />
          </div>
          <div className="invite-users-card glass-card">
            <div className="invite-users-card-icon">
              <UserPlus />
            </div>
            <div className="invite-users-card-content">
              <h4>Invite Users</h4>
              <p>Add people to your community to compare styles</p>
            </div>
            <ArrowRight className="right-arrow-hover" />
          </div>
        </div>
      </div> */}

      <QuickActions />
      <RecommendedNextStep />

      <div className="daily-insight-card glass-card">
        <div className="daily-insight-card-icon">
          <Lightbulb />
        </div>
        <div className="daily-insight-card-content">
          <h4>Daily Insight</h4>
          <p>
            People with your behavioral style tend to excel in roles that
            require attention to detail and systematic thinking. Consider
            leveraging these strengths in your current projects.
          </p>
        </div>
      </div>
      <GeneAIChatbot open={chatbotOpen} onClose={() => setChatbotOpen(false)} />
      <TrialInfoModal
        open={trialModalOpen}
        onClose={dismissTrialModal}
        onAddPayment={handleAddPayment}
        daysRemaining={trialDaysRemaining}
      />
      <UpdatePaymentModal
        open={paymentModalOpen}
        onCancel={() => setPaymentModalOpen(false)}
        addPayment={true}
      />
    </>
  );
};

export default Dashboard;
