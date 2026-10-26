"use client";
import ClientDashboardHeader from "@/components/common/clientDashboardHeader/clientDashboardHeader";
import GeneAIChatbot from "@/components/common/geneAIChatbot";
import UnLockCommunityCard from "@/components/common/unLockCommunityCard";
import { ReportType } from "@/constants/report";
import { useLoggedPersonId } from "@/hooks/useLoggedPersonId";
import DownloadReportModal from "@/modals/downloadReportModal";
import {
  getAssessmentResultsArrayApi,
  getBDNA5ScoresApi,
  getCareersInsightsApi,
  getFDNA5ScoresApi,
  getPerformanceGuideArrayApi,
  getUniqueStyleAndDescriptionApi,
} from "@/network/apis/report";
import { AppDispatch } from "@/store";
import {
  setBDNA5Scores,
  setCareersInsights,
  setFDNA5Scores,
  setPerformanceGuideArray,
  setStrongestFactor,
  setTscoreData,
  setUniqueStyleAndDescription,
} from "@/store/slices/reportSlice";
import { ApiResult } from "@/types/http";
import { Download, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import SwitchReport from "./switchReport";
import SwitchReportContent from "./switchReportContent";

const Report = () => {
  const [activeReport, setActiveReport] = useState(ReportType.WORK_TALENT);
  const [chatbotOpen, setChatbotOpen] = useState(false);
  const [downloadModalOpen, setDownloadModalOpen] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const [loading, setLoading] = useState(false);
  const personId = useLoggedPersonId();

  const fetchReportsData = async (personId: string) => {
    try {
      setLoading(true);

      const results = await Promise.allSettled([
        getUniqueStyleAndDescriptionApi(personId),
        getPerformanceGuideArrayApi(personId),
        getBDNA5ScoresApi(personId),
        getFDNA5ScoresApi(personId),
        getCareersInsightsApi(personId),
        getAssessmentResultsArrayApi(personId),
      ]);

      const [uniqueStyle, performanceGuide, bdna5, fdna5, careers, assessment] =
        results;

      if (uniqueStyle.status === "fulfilled") {
        dispatch(
          setUniqueStyleAndDescription((uniqueStyle.value as ApiResult).data),
        );
      }

      if (performanceGuide.status === "fulfilled") {
        dispatch(
          setPerformanceGuideArray((performanceGuide.value as ApiResult).data),
        );
      }

      if (bdna5.status === "fulfilled") {
        dispatch(setBDNA5Scores((bdna5.value as ApiResult).data));
      }

      if (fdna5.status === "fulfilled") {
        dispatch(setFDNA5Scores((fdna5.value as ApiResult).data));
      }

      if (careers.status === "fulfilled") {
        dispatch(setCareersInsights((careers.value as ApiResult).data));
      }

      if (assessment.status === "fulfilled") {
        dispatch(setTscoreData((assessment.value as ApiResult<any>).data));
        dispatch(
          setStrongestFactor(
            (assessment.value as ApiResult<any>).data?.strogestFactors,
          ),
        );
      }
    } catch (error) {
      console.error("Error fetching reports:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (personId) {
      fetchReportsData(personId);
    }
  }, [personId]);

  return (
    <div className="space-y-6">
      <ClientDashboardHeader
        title="Your Behavioral Report"
        description="Based on your Quick Discovery assessment"
        showBtn={true}
        secondaryLabel="Download PDF"
        secondaryIcon={<Download />}
        primaryLabel="Ask GeneAI"
        primaryIcon={<Sparkles />}
        primaryBtnClass="header-btn-primary"
        secondaryBtnClass="header-btn-secondary"
        secondaryOnClick={() => setDownloadModalOpen(true)}
        // secondaryOnClick={() => router.push(REPORT_PARTICIPANT_BUSINESS_PATH)}
        primaryOnClick={() => setChatbotOpen(true)}
      />
      <GeneAIChatbot open={chatbotOpen} onClose={() => setChatbotOpen(false)} />
      <DownloadReportModal
        open={downloadModalOpen}
        onCancel={() => setDownloadModalOpen(false)}
      />
      <SwitchReport
        setActiveReport={setActiveReport}
        activeReport={activeReport}
      />

      <SwitchReportContent activeReport={activeReport} loading={loading} />
      <UnLockCommunityCard />
    </div>
  );
};

export default Report;
