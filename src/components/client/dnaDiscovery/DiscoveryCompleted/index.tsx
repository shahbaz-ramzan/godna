"use client";
import { Routes } from "@/constants/routes";
import { useLoggedPersonId } from "@/hooks/useLoggedPersonId";
import { getUniqueStyleAndDescriptionApi } from "@/network/apis/report";
import { AppDispatch, RootState } from "@/store";
import { setUniqueStyleAndDescription } from "@/store/slices/reportSlice";
import { Button } from "antd";
import { CircleCheckBig, FileText } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const DiscoveryCompleted = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const personId = useLoggedPersonId();

  const { uniqueStyleAndDescription } = useSelector((state: RootState) => ({
    uniqueStyleAndDescription: state.report.uniqueStyleAndDescription,
  }));

  useEffect(() => {
    if (personId) {
      fetchUniqueStyleData(personId);
    }
  }, [personId]);

  const fetchUniqueStyleData = async (personId: string) => {
    try {
      const response: any = await getUniqueStyleAndDescriptionApi(personId);
      dispatch(setUniqueStyleAndDescription(response.data));
    } catch (err) {
      console.error("Failed to fetch unique style data", err);
    }
  };

  useEffect(() => {
    router.prefetch(Routes.REPORT);
  }, []);

  const handleViewReport = () => {
    router.push(Routes.REPORT);
  };

  return (
    <div className="complete-assessment-modal">
      <div className="ca-modal-content">
        <div className="ca-modal-card glass-card">
          <div className="ca-modal-card-header">
            <div className="ca-header-icon dna-gradient">
              <CircleCheckBig className="h-12 w-12 text-white" />
            </div>
            <div className="header-ring-animation">
              <div className="ring-animation"></div>
            </div>
          </div>
          <div className="ca-modal-card-body">
            <h2>Discovery completed successfully!</h2>
            <p className="ca-body-text">
              Your behavioral profile has been generated. The Discovery section
              has been removed from your navigation, and you can now access your
              results anytime through "My Report".
            </p>
            <p className="ca-sub-text">
              Your Natural Behavior Style: {""}
              <span>{uniqueStyleAndDescription?.behaviorTypeName}</span>
            </p>
          </div>
          <div className="ca-modal-card-footer">
            <Button
              type="primary"
              className="thm-btn report-view-btn"
              onClick={handleViewReport}
              icon={<FileText className="h-5 w-5" />}
            >
              View My Report
            </Button>
          </div>
          <div className="ca-modal-card-bottom">
            <p>
              Your report will always be available in the "My Report" section
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiscoveryCompleted;
