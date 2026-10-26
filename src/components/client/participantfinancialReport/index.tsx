"use client";

import Logo from "@/assets/images/logo.png";
import { uniqueStyleImages } from "@/components/client/participantBusinessReport/uniqueStyleImages";
import FloatingChatButton from "@/components/common/floatingChatButton";
import GeneAIChatbot from "@/components/common/geneAIChatbot";
import FullScreenLoader from "@/components/common/loader";
import AppConstants from "@/constants/app-constants";
import { useAccountId } from "@/hooks/useAccountId";
import { useLoggedPersonId } from "@/hooks/useLoggedPersonId";
import { useLoggedPersonName } from "@/hooks/useLoggedPersonName";
import { formatTScoreData, normalizedKey } from "@/lib/utils";
import {
  getAssessmentResultsArrayApi,
  getBehavioralBiasesArrayApi,
  getCoachingReportTraitsApi,
  getFactorRelationshipTableApi,
  getFDNA5ScoresApi,
  getFDNAFinancialPlanningInsightsApi,
  getFDNAUniqueStyleVideoLinksApi,
  getMarketMoodArrayApi,
  getPerformanceGuideArrayApi,
  getRiskBehaviorApi,
  getUniqueStyleAndDescriptionApi,
} from "@/network/apis/report";
import { Button, Progress } from "antd";
import { ArrowLeft, Download } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { QRCodeCanvas } from "qrcode.react";
import { useEffect, useMemo, useRef, useState } from "react";
import "./financialBusinessReport.scss";
import {
  FOOTER_DATE,
  FOOTER_YEAR,
  getPrimaryColor,
  getThumbPosition,
  PRIMARY_COLOR,
  REPORT_COLOR,
  REPORT_NAME,
  SECONDARY_COLOR,
  WORD,
} from "./staticReportData";

export const FinancialBusinessReport = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const reportRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [chatOpen, setChatOpen] = useState(false);
  const [tscoreData, setTscoreData] = useState<number[] | null>(null);
  const [coachingReportTraits, setCoachingReportTraits] = useState<Record<
    string,
    string
  > | null>(null);
  const [factorRelationship, setFactorRelationship] = useState<any>(null);
  const [performanceGuideArray, setPerformanceGuideArray] = useState<any>(null);
  const [strongestFactor, setStrongestFactor] = useState<any>(null);
  const [uniqueStyleAndDescription, setUniqueStyleAndDescription] =
    useState<any>(null);
  const [fdna5Scores, setFDNA5Scores] = useState<any>(null);
  const [fdnaFinancialPlanningInsights, setFDNAFinancialPlanningInsights] =
    useState<any[] | null>(null);
  const [fdnaUniqueStyleVideoLinks, setFDNAUniqueStyleVideoLinks] = useState<
    any[]
  >([]);
  const loggedPersonId = useLoggedPersonId();
  const personId = searchParams.get("personId") ?? loggedPersonId;
  const isDigitalScan = searchParams.get("isDigitalScan") ?? false;
  const [riskGroup, setRiskGroup] = useState<any>(null);
  const [behavioralBiases, setBehavioralBiases] = useState<any[]>([]);
  const [marketMoodArray, setMarketMoodArray] = useState<any>();
  const firstBiasName = behavioralBiases?.[0]?.name;
  const secondBiasName = behavioralBiases?.[1]?.name;
  const loggedUserName = useLoggedPersonName();
  const userName = searchParams.get("userName") ?? loggedUserName;
  const accountId = useAccountId();
  const onBack = () => router.back();

  const chatPayload = useMemo<Record<string, unknown> | null>(() => {
    if (!uniqueStyleAndDescription || !tscoreData || !userName) return null;
    return {
      personName: userName,
      reportType: "Participant Financial Report",
      personID: uniqueStyleAndDescription?.personID,
      behaviorTypeID: uniqueStyleAndDescription?.behaviorTypeID,
      behaviorTypeName: uniqueStyleAndDescription?.behaviorTypeName,
      behaviorTypeDescription:
        uniqueStyleAndDescription?.behaviorTypeDescription,
      twoStrongestTraits: strongestFactor,
      insights: {
        "Risk Behavior": fdna5Scores?.riskBehavior?.description ?? "",
        "Financial Relationship Management":
          fdna5Scores?.financialRelationshipManagement?.description ?? "",
        "Financial Planning Management":
          fdna5Scores?.financialPlanningManagement?.description ?? "",
        "Wealth Building Motivation":
          fdna5Scores?.wealthBuildingMotivation?.description ?? "",
        "Financial Emotional Intelligence":
          fdna5Scores?.financialEmotionalIntelligence?.description ?? "",
      },
      tScores: formatTScoreData(tscoreData),
    };
  }, [
    uniqueStyleAndDescription,
    tscoreData,
    strongestFactor,
    fdna5Scores,
    userName,
  ]);

  const PAGE_COUNT = 10;

  const firstBiasVideoUrl =
    AppConstants.BEHAVIORAL_BIASES_VIDEOS[firstBiasName];
  const secondBiasVideoUrl =
    AppConstants.BEHAVIORAL_BIASES_VIDEOS[secondBiasName];

  const financialBehaviorInsights = [
    {
      key: "riskBehavior",
      label: "Risk Behavior",
      value: fdna5Scores?.riskBehavior?.value ?? 0,
      description: fdna5Scores?.riskBehavior?.description,
    },
    {
      key: "financialRelationshipManagement",
      label: "Financial Relationship Management",
      value: fdna5Scores?.financialRelationshipManagement?.value ?? 0,
      description: fdna5Scores?.financialRelationshipManagement?.description,
    },
    {
      key: "financialPlanningManagement",
      label: "Financial Planning Management",
      value: fdna5Scores?.financialPlanningManagement?.value ?? 0,
      description: fdna5Scores?.financialPlanningManagement?.description,
    },
    {
      key: "wealthBuildingMotivation",
      label: "Wealth Building Motivation",
      value: fdna5Scores?.wealthBuildingMotivation?.value ?? 0,
      description: fdna5Scores?.wealthBuildingMotivation?.description,
    },
    {
      key: "financialEmotionalIntelligence",
      label: "Financial Emotional Intelligence",
      value: fdna5Scores?.financialEmotionalIntelligence?.value ?? 0,
      description: fdna5Scores?.financialEmotionalIntelligence?.description,
    },
  ];

  useEffect(() => {
    if (personId) {
      getAllData();
    }
  }, [personId]);

  const getAllData = async () => {
    setIsLoading(true);
    try {
      await Promise.allSettled([
        fetchUniqueStyleAndDescription(personId),
        fetchMarketMoodArray(personId),
        fetchRiskBehavior(personId),
        fetchPerformanceGuideArray(personId),
        fetchFDNA5Scores(personId),
        fetchAssessmentResultsArray(personId),
        fetchBehavioralBiasesArray(personId),
        fetchFDNAFinancialPlanningInsights(personId),
        fetchCoachingReportTraits(),
        fetchFDNAUniqueStyleVideoLinks(),
      ]);
    } catch (error) {
      console.error("Error fetching report data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const getFDNAUniqueStyleVideoUrl = () => {
    const behaviorTypeName = uniqueStyleAndDescription?.behaviorTypeName;
    const match = fdnaUniqueStyleVideoLinks?.find(
      (item: any) => item?.UniqueStyle === behaviorTypeName,
    );

    return match?.videoURL || "";
  };

  const fetchCoachingReportTraits = async () => {
    try {
      const response: any = await getCoachingReportTraitsApi();
      setCoachingReportTraits(response?.value?.[0]);
    } catch (error) {
      console.error("Error fetching coaching report traits:", error);
    }
  };
  const fetchFDNAUniqueStyleVideoLinks = async () => {
    try {
      const response: any = await getFDNAUniqueStyleVideoLinksApi();
      setFDNAUniqueStyleVideoLinks(response?.value);
    } catch (error) {
      console.error("Error fetching FDNAUniqueStyleVideoLinks:", error);
    }
  };

  const fetchFactorRelationshipTable = async (strongestFactors: any) => {
    try {
      const response: any = await getFactorRelationshipTableApi();
      const factorRelationship = response?.value?.find(
        (el: any) =>
          el?.FactorName == strongestFactors?.[0] + "_" + strongestFactors?.[1],
      );
      setFactorRelationship(factorRelationship);
    } catch (error) {
      console.error("Error fetching factor relationship table:", error);
    }
  };
  const fetchPerformanceGuideArray = async (personId: string) => {
    try {
      const response: any = await getPerformanceGuideArrayApi(personId);
      setPerformanceGuideArray(response?.data);
    } catch (error) {
      console.error("Error fetching performance guide array:", error);
    }
  };
  const fetchFDNA5Scores = async (personId: string) => {
    try {
      const response: any = await getFDNA5ScoresApi(personId);
      setFDNA5Scores(response?.data);
    } catch (error) {
      console.error("Error fetching FDNA5 scores:", error);
    }
  };

  const fetchAssessmentResultsArray = async (personId: string) => {
    try {
      const response: any = await getAssessmentResultsArrayApi(personId);
      const strongestFactors = response?.data?.strogestFactors;
      setStrongestFactor(strongestFactors);
      setTscoreData(response?.data?.tscore ?? null);
      if (strongestFactors) {
        await fetchFactorRelationshipTable(strongestFactors);
      }
    } catch (error) {
      console.error("Error fetching assessment results array:", error);
    }
  };
  const fetchUniqueStyleAndDescription = async (personId: string) => {
    try {
      const response: any = await getUniqueStyleAndDescriptionApi(personId);
      setUniqueStyleAndDescription(response?.data);
    } catch (error) {
      console.error("Error fetching unique style and description:", error);
    }
  };
  const fetchRiskBehavior = async (personId: string) => {
    try {
      const response: any = await getRiskBehaviorApi(personId);
      setRiskGroup(response?.data);
    } catch (error) {
      console.error("Error fetching Risk Behavior:", error);
    }
  };
  const fetchMarketMoodArray = async (personId: string) => {
    try {
      const formattedDate = new Date()
        .toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        })
        .replace(/\//g, "-");
      const response: any = await getMarketMoodArrayApi(
        personId,
        -1,
        formattedDate,
      );
      setMarketMoodArray(response?.data);
    } catch (error) {
      console.error("Error fetching Market Mood Array:", error);
    }
  };
  const fetchBehavioralBiasesArray = async (personId: string) => {
    try {
      const response: any = await getBehavioralBiasesArrayApi(personId);
      setBehavioralBiases(response?.data?.behavioralBiasList);
    } catch (error) {
      console.error("Error fetching Behavioral Biases Array:", error);
    }
  };
  const fetchFDNAFinancialPlanningInsights = async (personId: string) => {
    const keyPrefix = "insight";

    try {
      const response: any = await getFDNAFinancialPlanningInsightsApi(personId);
      const data = response?.data;

      const insights = Object.keys(data)
        .filter((k) => k.startsWith(keyPrefix))
        .sort(
          (a, b) =>
            Number(a.slice(keyPrefix.length)) -
            Number(b.slice(keyPrefix.length)),
        )
        .map((k) => data[k]);

      setFDNAFinancialPlanningInsights(insights);
    } catch (error) {
      console.error("Error fetching FDNA Financial Planning Insights:", error);
    }
  };
  const downloadPdf = async () => {
    if (isDownloading) return;
    setIsDownloading(true);
    setDownloadProgress(0);
    try {
      const html2canvas = (await import("html2canvas")).default;
      const { jsPDF } = await import("jspdf");
      // Match Angular: jsPDF portrait, mm, letter; capture each page by id; scale image to full page width
      const pdf = new jsPDF("p", "mm", "letter", true);
      const pageWidthMm = 215.9; // US Letter width in mm (Angular uses 215)

      for (let i = 1; i <= PAGE_COUNT; i++) {
        const pageEl = document.getElementById(i.toString());
        if (!pageEl) {
          setDownloadProgress(Math.round((i / PAGE_COUNT) * 100));
          continue;
        }
        pageEl.style.fontFeatureSettings = '"liga" 0';
        const canvas = await html2canvas(pageEl, {
          scale: 3,
          useCORS: true,
          logging: false,
        });
        const imgWidth = pageWidthMm;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        const dataUrl = canvas.toDataURL("image/png");
        pdf.addPage();
        pdf.addImage(
          dataUrl,
          "PNG",
          0,
          0,
          imgWidth,
          imgHeight,
          undefined,
          "FAST",
        );
        setDownloadProgress(Math.round((i / PAGE_COUNT) * 100));
      }
      pdf.deletePage(1); // First addPage() is empty
      pdf.save(`${REPORT_NAME} Report ${userName}.pdf`);
    } catch (e) {
      console.error("PDF download failed:", e);
    } finally {
      setIsDownloading(false);
      setDownloadProgress(0);
    }
  };

  return (
    <div className="reportScreenWrapper">
      {isLoading && <FullScreenLoader />}
      <div className="hidden md:block">
        <FloatingChatButton onClick={() => setChatOpen((v) => !v)} />
      </div>
      <GeneAIChatbot
        open={chatOpen}
        onClose={() => setChatOpen(false)}
        externalPayload={chatPayload ?? null}
      />
      {/* Header */}
      <div className="reportsWrapper">
        <header className="reportsHeader glass-card">
          <div className="reportTitle">
            <Button
              type="text"
              size="small"
              className="arrow-left-btn"
              onClick={onBack}
              aria-label="Go back"
              icon={<ArrowLeft size={20} />}
            />
            <h3 className="mb0">{REPORT_NAME} Report</h3>
          </div>
          <Button
            onClick={downloadPdf}
            className="outline-btn"
            icon={<Download size={16} />}
            disabled={isDownloading}
          >
            {isDownloading ? `Downloading ${downloadProgress}%` : "Download"}
          </Button>
        </header>

        <div ref={reportRef} className="reportPdfContent">
          <div className="pageWrapper p0" id="1">
            <table width="100%" role="presentation">
              <tbody>
                <tr>
                  <td colSpan={2} className="patternBanner" />
                </tr>
                <tr>
                  <td
                    className="reportCard"
                    style={{
                      borderTopColor: REPORT_COLOR,
                      borderBottomColor: REPORT_COLOR,
                    }}
                  >
                    <img
                      src={Logo.src}
                      alt="Logo"
                      style={{ maxWidth: 130, height: 40 }}
                    />
                    <h1>
                      {REPORT_NAME} Report:
                      <br />
                      {userName}
                    </h1>
                    <p className="mb0">
                      Providing key insights into your unique work talents.
                    </p>
                  </td>
                </tr>
                <tr>
                  <td colSpan={2} className="patternBanner">
                    {isDigitalScan === "true" && (
                      <p>
                        This client&apos;s insights are based on a Digital Scan.
                        Use this data for marketing, communication, and
                        alignment purposes only—not for high-stakes decisions.
                        <br />
                        <a
                          href="https://kb.dnabehavior.com/gene/predicted-results"
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ textDecoration: "underline" }}
                        >
                          Learn more in our Digital Scan Knowledge Base.
                        </a>
                      </p>
                    )}
                  </td>
                </tr>
                <tr>
                  <td colSpan={2} className="patternBanner"></td>
                </tr>
                <tr>
                  <td
                    colSpan={2}
                    className="footerTop"
                    style={{ backgroundColor: REPORT_COLOR }}
                  >
                    Based on your completion of the Natural Behavior Discovery
                    Process
                  </td>
                </tr>
                <tr>
                  <td colSpan={2} className="footer">
                    Powered by DNA Behavior
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="pageWrapper" id="2">
            <table width="100%" role="presentation">
              <tbody>
                <tr>
                  <td colSpan={2} className="headingBdna textCenter">
                    Your DNA Result is
                  </td>
                </tr>
                <tr>
                  <td colSpan={2} className="textCenter">
                    <h1 className="mb35 facilitatorHead">
                      You Are {WORD}{" "}
                      {uniqueStyleAndDescription?.behaviorTypeName}
                    </h1>
                  </td>
                </tr>
                <tr>
                  <td colSpan={2} className="spacer20" />
                </tr>
                <tr>
                  <td
                    className="tdBackground tdPadding"
                    valign="top"
                    colSpan={3}
                    style={{ borderTop: `10px solid ${REPORT_COLOR}` }}
                  >
                    <p>{uniqueStyleAndDescription?.behaviorTypeDescription}</p>
                  </td>
                </tr>
                <tr>
                  <td colSpan={2} className="spacer20" />
                </tr>
                <tr>
                  <td width="49%" className="tdPadding p0" align="center">
                    <img
                      src={
                        uniqueStyleImages[
                          uniqueStyleAndDescription?.behaviorTypeName
                        ]
                      }
                      width="100%"
                      alt={uniqueStyleAndDescription?.behaviorTypeName}
                    />
                  </td>
                </tr>
                <tr>
                  <td colSpan={2} className="spacer20" />
                </tr>
              </tbody>
            </table>
            <div className="pageFooter">
              <table role="presentation">
                <tbody>
                  <tr>
                    <td>Page 2</td>
                    <td>{FOOTER_DATE}</td>
                    <td>
                      {userName} - {uniqueStyleAndDescription?.behaviorTypeName}
                    </td>
                    <td>
                      © Copyright {FOOTER_YEAR} DNA Behavior Solutions, LLC
                    </td>
                    <td>ID#{accountId}</td>
                  </tr>
                  <div className="spacer10" />
                </tbody>
              </table>
            </div>
          </div>

          <div className="pageWrapper" id="3">
            <table width="100%" role="presentation">
              <tbody>
                <tr>
                  <td
                    className="primaryColorBox"
                    style={{ backgroundColor: REPORT_COLOR }}
                  />
                  <td className="mainHeading" style={{ color: REPORT_COLOR }}>
                    5 Key Financial Behavior Insights
                  </td>
                </tr>
                <tr>
                  <td colSpan={2} className="spacer20" />
                </tr>

                <tr>
                  <td colSpan={2}>
                    <p className="page-text">
                      The shaded circles and scores below indicate your strength
                      level as a percentage of the population with the
                      corresponding descriptor in the same color.
                    </p>
                  </td>
                </tr>
                <tr>
                  <td colSpan={2} className="spacer20" />
                </tr>
                <tr>
                  <td colSpan={2}>
                    {financialBehaviorInsights.map((insight) => (
                      <tr key={insight.key} className="financialInsightWrap">
                        <td>
                          <div
                            style={{
                              position: "relative",
                              width: 105,
                              height: 105,
                            }}
                          >
                            <Progress
                              type="circle"
                              percent={100}
                              size={98}
                              strokeWidth={8}
                              strokeColor={SECONDARY_COLOR}
                              showInfo={false}
                              style={{ position: "absolute" }}
                            />
                            <Progress
                              type="circle"
                              percent={insight.value}
                              size={98}
                              strokeWidth={8}
                              strokeColor={PRIMARY_COLOR}
                              showInfo={false}
                              style={{ position: "absolute" }}
                            />
                            {/* Percentage text overlay */}
                            <div
                              style={{
                                position: "absolute",
                                top: "42%",
                                left: "50%",
                                transform: "translate(-50%, -50%)",
                                fontSize: 20,
                                fontWeight: 700,
                                color: PRIMARY_COLOR,
                              }}
                            >
                              {insight.value}%
                            </div>
                          </div>
                        </td>
                        <td>
                          <h6>
                            <span style={{ color: "#000000" }}>
                              {insight.label}
                            </span>
                          </h6>
                          <p>{insight.description}</p>
                        </td>
                      </tr>
                    ))}
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="pageFooter">
              <table role="presentation">
                <tbody>
                  <tr>
                    <td>Page 3</td>
                    <td>{FOOTER_DATE}</td>
                    <td>
                      {userName} - {uniqueStyleAndDescription?.behaviorTypeName}
                    </td>
                    <td>
                      © Copyright {FOOTER_YEAR} DNA Behavior Solutions, LLC
                    </td>
                    <td>ID#{accountId}</td>
                  </tr>
                  <div className="spacer10" />
                </tbody>
              </table>
            </div>
          </div>

          <div className="pageWrapper" id="4">
            <table width="100%" role="presentation">
              <tbody>
                <tr>
                  <td
                    className="primaryColorBox"
                    style={{ backgroundColor: REPORT_COLOR }}
                  />
                  <td className="mainHeading" style={{ color: REPORT_COLOR }}>
                    Ultimate Performance Guide
                  </td>
                </tr>
                <tr>
                  <td colSpan={2} className="spacer20" />
                </tr>

                <tr>
                  <td colSpan={2}>
                    <p className="page-text">
                      This section provides a concise summary of your report for
                      quick review. More in-depth results and information are
                      provided in the remaining sections.
                    </p>
                  </td>
                </tr>
                <tr>
                  <td colSpan={2} className="spacer20" />
                </tr>
                <tr>
                  <td colSpan={2} className="spacer20" />
                </tr>
                <tr>
                  <td colSpan={2} style={{ paddingBottom: "4px" }}>
                    <h5 className="mb0">
                      Knowing your strengths, you can increase your performance
                      potential
                    </h5>
                  </td>
                </tr>
                <tr>
                  <td
                    className="tdBackground tdPadding"
                    valign="top"
                    colSpan={3}
                    style={{ borderTop: `10px solid ${REPORT_COLOR}` }}
                  >
                    <ul className="pl20">
                      {performanceGuideArray?.strengths?.map((s, i) => (
                        <li key={i}>{s.description}</li>
                      ))}
                    </ul>
                  </td>
                </tr>
                <tr>
                  <td colSpan={2} className="spacer20" />
                </tr>
                <tr>
                  <td colSpan={2} className="spacer20" />
                </tr>
                <tr>
                  <td colSpan={2} style={{ paddingBottom: "4px" }}>
                    <h5 className="mb0">
                      Knowing your struggles, you can reduce your performance
                      impediments
                    </h5>
                  </td>
                </tr>
                <tr>
                  <td
                    className="tdBackground tdPadding"
                    valign="top"
                    colSpan={3}
                    style={{ borderTop: `10px solid ${REPORT_COLOR}` }}
                  >
                    <ul className="pl20">
                      {performanceGuideArray?.struggles?.map((s, i) => (
                        <li key={i}>{s.description}</li>
                      ))}
                    </ul>
                  </td>
                </tr>
                <tr>
                  <td colSpan={2} className="spacer20" />
                </tr>
                <tr>
                  <td colSpan={2} className="spacer20" />
                </tr>
                <tr>
                  <td colSpan={2} style={{ paddingBottom: "4px" }}>
                    <h5 className="mb0">
                      How to communicate effectively for building a relationship
                    </h5>
                  </td>
                </tr>
                <tr>
                  <td
                    className="tdBackground tdPadding"
                    valign="top"
                    colSpan={3}
                    style={{ borderTop: `10px solid ${REPORT_COLOR}` }}
                  >
                    <ul className="pl20">
                      {performanceGuideArray?.environmentKeys?.map((k, i) => (
                        <li key={i}>{k.description}</li>
                      ))}
                    </ul>
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="pageFooter">
              <table role="presentation">
                <tbody>
                  <tr>
                    <td>Page 4</td>
                    <td>{FOOTER_DATE}</td>
                    <td>
                      {userName} - {uniqueStyleAndDescription?.behaviorTypeName}
                    </td>
                    <td>
                      © Copyright {FOOTER_YEAR} DNA Behavior Solutions, LLC
                    </td>
                    <td>ID#{accountId}</td>
                  </tr>
                  <div className="spacer10" />
                </tbody>
              </table>
            </div>
          </div>

          <div className="pageWrapper" id="5">
            <table width="100%" role="presentation">
              <tbody>
                <tr>
                  <td colSpan={3}>
                    <table width="100%" role="presentation">
                      <tbody>
                        <tr>
                          <td
                            className="primaryColorBox"
                            style={{ backgroundColor: REPORT_COLOR }}
                          />
                          <td
                            className="mainHeading"
                            style={{ color: REPORT_COLOR }}
                          >
                            Your Top Two Factors
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td colSpan={2} className="pb16" />
                </tr>

                <tr>
                  <td>
                    <table width="100%" role="presentation">
                      <tbody>
                        <tr>
                          <td
                            width="49%"
                            className="tdBackground tdPadding"
                            valign="top"
                            style={{
                              borderTop: `10px solid ${REPORT_COLOR}`,
                            }}
                          >
                            <h5>{strongestFactor?.[0]}</h5>
                            <p>
                              {
                                coachingReportTraits?.[
                                  normalizedKey(strongestFactor?.[0])
                                ]
                              }
                            </p>
                          </td>
                          <td width="1%" />
                          <td
                            width="49%"
                            className="tdBackground tdPadding"
                            valign="top"
                            style={{
                              borderTop: `10px solid ${REPORT_COLOR}`,
                            }}
                          >
                            <h5>{strongestFactor?.[1]}</h5>
                            <p>
                              {
                                coachingReportTraits?.[
                                  normalizedKey(strongestFactor?.[1])
                                ]
                              }
                            </p>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td colSpan={2} className="pb16" />
                </tr>
                <tr>
                  <td
                    className="tdBackground tdPadding textCenter"
                    valign="top"
                    colSpan={3}
                    style={{ borderTop: `10px solid ${REPORT_COLOR}` }}
                  >
                    <h5>Factor Relationship</h5>
                    <p>
                      The above combination of these two traits indicates that
                      you {factorRelationship?.Description}
                    </p>
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="pageFooter">
              <table role="presentation">
                <tbody>
                  <tr>
                    <td>Page 5</td>
                    <td>{FOOTER_DATE}</td>
                    <td>
                      {userName} - {uniqueStyleAndDescription?.behaviorTypeName}
                    </td>
                    <td>
                      © Copyright {FOOTER_YEAR} DNA Behavior Solutions, LLC
                    </td>
                    <td>ID#{accountId}</td>
                  </tr>
                  <div className="spacer10" />
                </tbody>
              </table>
            </div>
          </div>

          <div className="pageWrapper" id="6">
            <table
              className="mw-700"
              cellSpacing="0"
              cellPadding="0"
              role="presentation"
            >
              <tbody>
                <tr>
                  <td colSpan={3}>
                    <table width="100%" role="presentation">
                      <tbody>
                        <tr>
                          <td
                            className="primaryColorBox"
                            style={{ backgroundColor: REPORT_COLOR }}
                          />
                          <td
                            className="mainHeading"
                            style={{ color: REPORT_COLOR }}
                          >
                            Financial Planning Insights
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td colSpan={2} className="pb16" />
                </tr>

                <tr>
                  <td colSpan={2}>
                    <p className="page-text">
                      Based on combinations of your behavioral factors, your
                      natural approaches to financial planning are set out
                      below.
                    </p>
                  </td>
                </tr>
                <tr>
                  <td colSpan={2} className="spacer20" />
                </tr>
                <tr>
                  <td colSpan={2} className="spacer20" />
                </tr>
                <tr>
                  <td>
                    <table
                      className="insight-table table-border"
                      role="presentation"
                    >
                      <thead style={{ backgroundColor: REPORT_COLOR }}>
                        <tr>
                          <th className="textLeft">Insight</th>
                          <th style={{ width: "20%", textAlign: "center" }}>
                            L/M/H
                          </th>
                          <th style={{ textAlign: "center" }}>
                            Population % (0-100%)
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td style={{ padding: 0 }} />
                        </tr>
                        {fdnaFinancialPlanningInsights?.length > 0 &&
                          fdnaFinancialPlanningInsights?.map(
                            (insight: any, i: number) => (
                              <tr key={insight.insightName ?? i}>
                                <td
                                  className={
                                    i % 2 === 0 ? "bg-semidark" : "bg-semilight"
                                  }
                                >
                                  {insight.insightName}
                                </td>
                                <td
                                  className={`uppercase textCenter ${
                                    i % 2 === 0 ? "bg-semidark" : "bg-semilight"
                                  }`}
                                >
                                  {insight.hml}
                                </td>
                                <td
                                  className={`textCenter ${
                                    i % 2 === 0 ? "bg-semidark" : "bg-semilight"
                                  }`}
                                >
                                  {insight.population}%
                                </td>
                              </tr>
                            ),
                          )}
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="pageFooter">
              <table role="presentation">
                <tbody>
                  <tr>
                    <td>Page 6</td>
                    <td>{FOOTER_DATE}</td>
                    <td>
                      {userName} - {uniqueStyleAndDescription?.behaviorTypeName}
                    </td>
                    <td>
                      © Copyright {FOOTER_YEAR} DNA Behavior Solutions, LLC
                    </td>
                    <td>ID#{accountId}</td>
                  </tr>
                  <div className="spacer10" />
                </tbody>
              </table>
            </div>
          </div>

          <div className="pageWrapper" id="7">
            <table
              className="mw-700"
              cellSpacing="0"
              cellPadding="0"
              role="presentation"
            >
              <tbody>
                <tr>
                  <td colSpan={3}>
                    <table width="100%" role="presentation">
                      <tbody>
                        <tr>
                          <td
                            className="primaryColorBox"
                            style={{ backgroundColor: REPORT_COLOR }}
                          />
                          <td
                            className="mainHeading"
                            style={{ color: REPORT_COLOR }}
                          >
                            Natural Behavior Portfolio Risk Group
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td colSpan={2} className="spacer-20" />
                </tr>

                <tr>
                  <td style={{ paddingBottom: "1rem", paddingTop: "1rem" }}>
                    <p className="m-0">
                      The Natural Behavior Portfolio Risk Group that should be
                      considered as a starting point in determining the
                      structure of your investment portfolio is indicated below.
                      The Portfolio Risk Group shown below has been determined
                      based on the blend of your Natural Behavior Risk
                      Propensity and Risk Tolerance Scores as summarized in the
                      table above.
                    </p>
                    <p className="m-0">
                      Based only on your Natural Behavior Risk Score, your
                      Portfolio Risk Group is{" "}
                      <strong>Group {riskGroup?.riskGroup}.</strong>
                    </p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <table role="presentation">
                      <tbody>
                        <tr>
                          <td width="22%" className=" font-semibold">
                            Portfolio Risk Group
                          </td>
                          <td width="75%">
                            <div className="slider-container">
                              <div className="slider-track"></div>
                              <div
                                className="slider-thumb"
                                style={{
                                  backgroundColor: REPORT_COLOR,
                                  left: `${getThumbPosition(riskGroup?.riskGroup)}%`,
                                }}
                              />
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td colSpan={2} className="spacer20" />
                </tr>
                <tr>
                  <td>
                    <table
                      className="portfolio-table"
                      style={{
                        borderSpacing: 1,
                        borderCollapse: "separate",
                        fontSize: 11,
                      }}
                    >
                      <thead>
                        <tr>
                          <th className="textCenter" style={{ width: "25%" }} />
                          <th
                            className="textCenter"
                            style={getPrimaryColor(riskGroup?.riskGroup === 1)}
                          >
                            1
                          </th>
                          <th
                            className="textCenter"
                            style={getPrimaryColor(riskGroup?.riskGroup === 2)}
                          >
                            2
                          </th>
                          <th
                            className="textCenter"
                            style={getPrimaryColor(riskGroup?.riskGroup === 3)}
                          >
                            3
                          </th>
                          <th
                            className="textCenter"
                            style={getPrimaryColor(riskGroup?.riskGroup === 4)}
                          >
                            4
                          </th>
                          <th
                            className="textCenter"
                            style={{
                              paddingBottom: "1rem",
                              ...getPrimaryColor(riskGroup?.riskGroup === 5),
                            }}
                          >
                            5
                          </th>
                          <th
                            className="textCenter"
                            style={getPrimaryColor(riskGroup?.riskGroup === 6)}
                          >
                            6
                          </th>
                          <th
                            className="textCenter"
                            style={getPrimaryColor(riskGroup?.riskGroup === 7)}
                          >
                            7
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td style={{ padding: 0 }} />
                        </tr>
                        <tr>
                          <td style={{ textAlign: "left" }}>
                            Percentage of the population with a risk taking
                            level less than you
                          </td>
                          <td
                            style={getPrimaryColor(riskGroup?.riskGroup === 1)}
                          >
                            &lt; 2%
                          </td>
                          <td
                            style={getPrimaryColor(riskGroup?.riskGroup === 2)}
                          >
                            2-16%
                          </td>
                          <td
                            style={getPrimaryColor(riskGroup?.riskGroup === 3)}
                          >
                            17-30%
                          </td>
                          <td
                            style={getPrimaryColor(riskGroup?.riskGroup === 4)}
                          >
                            31-69%
                          </td>
                          <td
                            className="textCenter"
                            style={getPrimaryColor(riskGroup?.riskGroup === 5)}
                          >
                            70-83%
                          </td>
                          <td
                            style={getPrimaryColor(riskGroup?.riskGroup === 6)}
                          >
                            84-98%
                          </td>
                          <td
                            style={getPrimaryColor(riskGroup?.riskGroup === 7)}
                          >
                            98%&gt;
                          </td>
                        </tr>
                        <tr>
                          <td
                            className="vertical-align-top"
                            style={{ textAlign: "left" }}
                          >
                            Portfolio Structure
                          </td>
                          <td
                            className="vertical-align-top"
                            style={getPrimaryColor(riskGroup?.riskGroup === 1)}
                          >
                            Capital <br />
                            Protection
                          </td>
                          <td
                            className="vertical-align-top"
                            style={getPrimaryColor(riskGroup?.riskGroup === 2)}
                          >
                            Ultra-
                            <br />
                            Conservative
                          </td>
                          <td
                            className="vertical-align-top"
                            style={getPrimaryColor(riskGroup?.riskGroup === 3)}
                          >
                            Conservative
                          </td>
                          <td
                            className="vertical-align-top"
                            style={getPrimaryColor(riskGroup?.riskGroup === 4)}
                          >
                            Balanced
                          </td>
                          <td
                            className="textCenter"
                            style={{
                              paddingBottom: "1rem",
                              ...getPrimaryColor(riskGroup?.riskGroup === 5),
                            }}
                          >
                            Accumulation
                          </td>
                          <td
                            className="vertical-align-top"
                            style={getPrimaryColor(riskGroup?.riskGroup === 6)}
                          >
                            Growth
                          </td>
                          <td
                            className="vertical-align-top"
                            style={getPrimaryColor(riskGroup?.riskGroup === 7)}
                          >
                            Aggressive
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td colSpan={2} className="spacer20" />
                </tr>
                <tr>
                  <td>
                    <p className="mt-0 mb-2">
                      Your Overall Portfolio Risk Group that is ultimately used
                      in the Financial Plan and Investment Policy Statement will
                      also be influenced by other factors. Prior to determining
                      your final Portfolio Risk Group, please review the
                      following with your advisor to determine the portfolio
                      that is most suitable for you.
                    </p>
                  </td>
                </tr>
                <tr>
                  <td colSpan={2} className="spacer20" />
                </tr>
                <tr>
                  <td>
                    <ul>
                      <li>
                        Your goals and current financial capacity as shown in
                        the Investment Portfolio Risk Reward Analysis table in
                        Appendix Section 1.
                      </li>
                      <li>
                        Learned risk behavior motivations that have evolved from
                        circumstances, experiences, and education as shown in
                        the Potential Learned Behavior Risk Motivations Table in
                        Appendix Section 2.
                      </li>
                    </ul>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div className="page-break" />
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="pageFooter">
              <table role="presentation">
                <tbody>
                  <tr>
                    <td>Page 7</td>
                    <td>{FOOTER_DATE}</td>
                    <td>
                      {userName} - {uniqueStyleAndDescription?.behaviorTypeName}
                    </td>
                    <td>
                      © Copyright {FOOTER_YEAR} DNA Behavior Solutions, LLC
                    </td>
                    <td>ID#{accountId}</td>
                  </tr>
                  <div className="spacer10" />
                </tbody>
              </table>
            </div>
          </div>

          <div className="pageWrapper" id="8">
            <table role="presentation">
              <tbody>
                <tr>
                  <td colSpan={3}>
                    <table width="100%" role="presentation">
                      <tbody>
                        <tr>
                          <td
                            className="primaryColorBox"
                            style={{ backgroundColor: REPORT_COLOR }}
                          />
                          <td
                            className="mainHeading"
                            style={{ color: REPORT_COLOR }}
                          >
                            Appendix: Consideration Factors for Final Portfolio
                            Risk Group Determination
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td colSpan={2} className="spacer20" />
                </tr>

                <tr>
                  <td>
                    <h5>
                      1. Review The Investment Portfolio Risk Reward Analysis
                    </h5>
                    <p className="mb-1">
                      We recommend that you review with your advisor the
                      Investment Portfolio Risk Reward Analysis table that is
                      provided below to assess the appropriate Overall Portfolio
                      Risk Group. The Overall Portfolio Risk Group that is used
                      in the Financial Plan and Investment Policy Statement
                      should be selected based on understanding the investment
                      portfolio returns needed to achieve your goals (item 1 in
                      the table below) and with respect to your current
                      financial capacity (items 2 to 4 in the table below).
                    </p>
                  </td>
                </tr>
                <tr>
                  <td colSpan={2} className="spacer20" />
                </tr>
                <tr>
                  <td colSpan={2} className="spacer20" />
                </tr>
                <tr>
                  <td>
                    <table className="portfolio-anylasis-table table-border">
                      <thead style={{ backgroundColor: REPORT_COLOR }}>
                        <tr>
                          <th style={{ textAlign: "left" }}>
                            Portfolio Risk Group
                          </th>
                          <th>
                            1 <br />
                            Capital Protection
                          </th>
                          <th>
                            2<br />
                            Ultra-Conservative
                          </th>
                          <th>
                            3 <br />
                            Conservative
                          </th>
                          <th>
                            4 <br />
                            Balanced
                          </th>
                          <th>
                            5<br />
                            Accumulation
                          </th>
                          <th>
                            6<br />
                            Growth
                          </th>
                          <th>
                            7 <br />
                            Aggressive
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td style={{ padding: 0 }} />
                        </tr>
                        <tr>
                          <td className="bg-semidark">
                            1.Investment Portfolio Return Aim (Without
                            Borrowing)
                          </td>
                          <td className="bg-semidark">
                            In Line with Cash Deposits
                          </td>
                          <td className="bg-semidark">
                            In Line with or slightly better than cash deposits
                          </td>
                          <td className="bg-semidark">
                            Excess of deposits and possibly beats inflation
                          </td>
                          <td className="bg-semidark">
                            Average returns higher than deposit rates and
                            inflation
                          </td>
                          <td className="bg-semidark">
                            Above average returns and higher than deposits or
                            inflation
                          </td>
                          <td className="bg-semidark">
                            Significantly higher than deposits and inflation
                            with high return potential over the long term
                          </td>
                          <td className="bg-semidark">
                            The highest return potential over the long term
                          </td>
                        </tr>
                        <tr>
                          <td className="bg-semilight">
                            2. Average Portfolio Fluctuation Based on 5 Year
                            Data of Monthly Pricing
                          </td>
                          <td className="bg-semilight">0% to ±0.5%</td>
                          <td className="bg-semilight">±0.5% to ±2%</td>
                          <td className="bg-semilight">±2% to ±5%</td>
                          <td className="bg-semilight">±5% to ±10%</td>
                          <td className="bg-semilight">±10% to ±15%</td>
                          <td className="bg-semilight">±15% to ±25%</td>
                          <td className="bg-semilight">±25% or greater</td>
                        </tr>
                        <tr>
                          <td className="bg-semidark">
                            3. Potential Short Term Portfolio Loss (Based on
                            Outer Limits)
                          </td>
                          <td className="bg-semidark">-1%</td>
                          <td className="bg-semidark">-4%</td>
                          <td className="bg-semidark">-10%</td>
                          <td className="bg-semidark">-20%</td>
                          <td className="bg-semidark">-30%</td>
                          <td className="bg-semidark">-50%</td>
                          <td className="bg-semidark">Far greater than -50%</td>
                        </tr>
                        <tr>
                          <td className="bg-semilight">
                            4. Risk of Expected Loss
                          </td>
                          <td className="bg-semilight">Very Low Risk</td>
                          <td className="bg-semilight">Low Risk</td>
                          <td className="bg-semilight">Low to Medium Risk</td>
                          <td className="bg-semilight">Medium Risk</td>
                          <td className="bg-semilight">Medium to High Risk</td>
                          <td className="bg-semilight">High Risk</td>
                          <td className="bg-semilight">Very High Risk</td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td colSpan={2} className="spacer20" />
                </tr>
                <tr>
                  <td>
                    <span style={{ fontSize: "10px" }}>
                      The guidelines provided in this table are based on
                      research from a range of relevant international investment
                      body sources.
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="pageFooter">
              <table role="presentation">
                <tbody>
                  <tr>
                    <td>Page 8</td>
                    <td>{FOOTER_DATE}</td>
                    <td>
                      {userName} - {uniqueStyleAndDescription?.behaviorTypeName}
                    </td>
                    <td>
                      © Copyright {FOOTER_YEAR} DNA Behavior Solutions, LLC
                    </td>
                    <td>ID#{accountId}</td>
                  </tr>
                  <div className="spacer10" />
                </tbody>
              </table>
            </div>
          </div>

          <div className="pageWrapper" id="9">
            <table
              className="mw-700"
              cellSpacing="0"
              cellPadding="0"
              role="presentation"
            >
              <tbody>
                <tr>
                  <td colSpan={3}>
                    <table width="100%" role="presentation">
                      <tbody>
                        <tr>
                          <td
                            className="primaryColorBox"
                            style={{ backgroundColor: REPORT_COLOR }}
                          />
                          <td
                            className="mainHeading"
                            style={{ color: REPORT_COLOR }}
                          >
                            Appendix: Consideration Factors for Final Portfolio
                            Risk Group Determination
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td colSpan={2} className="spacer20" />
                </tr>

                <tr>
                  <td>
                    <h5>
                      2. Review Your Potential Learned Risk Behavior Motivations
                    </h5>
                    <p className="m-0">
                      The Overall Portfolio Risk Group that is used in the
                      Financial Plan and Investment Policy Statement should also
                      be selected based on understanding the potential
                      motivations that influence your Learned Risk Behavior. The
                      Learned Risk Behavior reflects how the Natural Risk
                      Behavior identified in this report may be currently
                      adapted in your complete financial personality by
                      circumstances, experiences and education. We recommend
                      that you review with your advisor the Potential Learned
                      Risk Behavior Motivations table that is provided below to
                      assess the appropriate Overall Portfolio Group.
                    </p>
                  </td>
                </tr>
                <tr>
                  <td colSpan={2} className="spacer20" />
                </tr>
                <tr>
                  <td colSpan={2} className="spacer20" />
                </tr>
                <tr>
                  <td>
                    <table className="potential-table table-border">
                      <thead style={{ backgroundColor: REPORT_COLOR }}>
                        <tr>
                          <th>Potential Motivations</th>
                          <th>
                            May Invest Higher Than Natural Risk <br />
                            Behavior
                          </th>
                          <th>
                            May Invest Lower Than Natural Risk <br />
                            Behavior
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td style={{ padding: 0 }} />
                        </tr>
                        <tr>
                          <td className="bg-semidark">1. Market Perception</td>
                          <td className="bg-semidark">Bullish</td>
                          <td className="bg-semidark">Bearish</td>
                        </tr>
                        <tr>
                          <td className="bg-semilight">
                            2. Goal Setting Attitude
                          </td>
                          <td className="bg-semilight">Ambitious</td>
                          <td className="bg-semilight">Conservative</td>
                        </tr>
                        <tr>
                          <td className="bg-semidark">
                            3. Financial Decision-Making Confidence
                          </td>
                          <td className="bg-semidark">High</td>
                          <td className="bg-semidark">Low</td>
                        </tr>
                        <tr>
                          <td className="bg-semilight">4. Age</td>
                          <td className="bg-semilight">
                            Retirement in 10+ Years
                          </td>
                          <td className="bg-semilight">Close to Retirement</td>
                        </tr>
                        <tr>
                          <td className="bg-semidark">
                            5. Financial Experiences
                          </td>
                          <td className="bg-semidark">
                            Good-&quot;Rags to Riches&quot;
                          </td>
                          <td className="bg-semidark">
                            Poor-&quot;Riches to Rags&quot;
                          </td>
                        </tr>
                        <tr>
                          <td className="bg-semilight">6. Life Experiences</td>
                          <td className="bg-semilight">Positive Feeling</td>
                          <td className="bg-semilight">Negative Mood</td>
                        </tr>
                        <tr>
                          <td className="bg-semidark">7. Values and Beliefs</td>
                          <td className="bg-semidark">
                            Belief in taking risk builds wealth
                          </td>
                          <td className="bg-semidark">
                            Belief that investments are for life security
                          </td>
                        </tr>
                        <tr>
                          <td className="bg-semilight">
                            8. Financial Education
                          </td>
                          <td className="bg-semilight">
                            High Investment Knowledge
                          </td>
                          <td className="bg-semilight">
                            Low Investment Knowledge
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td colSpan={2} className="spacer-40" />
                </tr>
              </tbody>
            </table>
            <div className="pageFooter">
              <table role="presentation">
                <tbody>
                  <tr>
                    <td>Page 9</td>
                    <td>{FOOTER_DATE}</td>
                    <td>
                      {userName} - {uniqueStyleAndDescription?.behaviorTypeName}
                    </td>
                    <td>
                      © Copyright {FOOTER_YEAR} DNA Behavior Solutions, LLC
                    </td>
                    <td>ID#{accountId}</td>
                  </tr>
                  <div className="spacer10" />
                </tbody>
              </table>
            </div>
          </div>

          <div className="pageWrapper" id="10">
            <table width="100%" role="presentation">
              <tbody>
                <tr>
                  <td
                    className="primaryColorBox"
                    style={{ backgroundColor: REPORT_COLOR }}
                  />
                  <td className="mainHeading" style={{ color: REPORT_COLOR }}>
                    Unique Style Overview
                  </td>
                </tr>
                <tr>
                  <td colSpan={2}>
                    <table width="100%" role="presentation">
                      <tbody>
                        <tr>
                          <td width="70%">
                            <div className="pBdna">
                              This section provides a concise description of
                              your unique behavioral style as it relates to
                              financial decision-making. Scan the QR code to
                              access a video that offers further insights into
                              your style, helping you understand its impact on
                              your financial behaviors and strategies.
                            </div>
                          </td>
                          <td width="25%">
                            <div className="qrCodeContainer">
                              <QRCodeCanvas
                                value={getFDNAUniqueStyleVideoUrl()}
                                size={120}
                                includeMargin
                              />
                            </div>
                            <p className="qrCodeText mb0">
                              Scan to watch video
                            </p>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>

                <tr>
                  <td colSpan={2} className="spacer20" />
                </tr>
                <tr>
                  <td
                    className="primaryColorBox"
                    style={{ backgroundColor: REPORT_COLOR }}
                  />
                  <td className="mainHeading" style={{ color: REPORT_COLOR }}>
                    Behavioral Biases
                  </td>
                </tr>
                <tr>
                  <td colSpan={2}>
                    <table width="100%" role="presentation">
                      <tbody>
                        <tr>
                          <td colSpan={2} className="spacer20" />
                        </tr>
                        <tr>
                          <td colSpan={2}>
                            <div className="pBdna">
                              Your two strongest Behavioral Biases in making
                              decisions are:
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td colSpan={2} className="spacer20" />
                        </tr>
                        <tr>
                          <td width="25%" className="textCenter">
                            <h5>{firstBiasName}</h5>
                            <div className="qrCodeContainer">
                              <QRCodeCanvas
                                value={firstBiasVideoUrl}
                                size={120}
                                includeMargin
                              />
                            </div>
                            <p className="qrCodeText mb0">
                              Scan to watch video
                            </p>
                          </td>
                          <td width="25%" className="textCenter">
                            <h5>{secondBiasName}</h5>
                            <div className="qrCodeContainer">
                              <QRCodeCanvas
                                value={secondBiasVideoUrl}
                                size={120}
                                includeMargin
                              />
                            </div>
                            <p className="qrCodeText mb0">
                              Scan to watch video
                            </p>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>

                <tr>
                  <td colSpan={2} className="spacer20" />
                </tr>
                <tr>
                  <td
                    className="primaryColorBox"
                    style={{ backgroundColor: REPORT_COLOR }}
                  />
                  <td className="mainHeading" style={{ color: REPORT_COLOR }}>
                    Market Mood
                  </td>
                </tr>
                <tr>
                  <td colSpan={2} className="spacer20" />
                </tr>
                <tr>
                  <td colSpan={2}>
                    <table width="100%" role="presentation">
                      <tbody>
                        <tr>
                          <td width="25%">
                            <QRCodeCanvas
                              value={AppConstants.MARKET_MOOD_VIDEO}
                              size={120}
                              includeMargin
                            />
                            <p className="qrCodeText mb0">
                              Scan to watch video
                            </p>
                          </td>
                          <td width="70%">
                            <div className="pBdna">
                              Market Mood helps identify your natural style to
                              make financial decisions. It helps advisors manage
                              your market fear so that you can achieve your
                              goals. Use Market Mood to open up discussions with
                              your advisors to share your feelings (such as
                              fear, caution or excitement) about the market
                              movements and the effects they might have on your
                              financial performance.
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>

                <tr>
                  <td colSpan={2} className="spacer40" />
                </tr>
                <tr>
                  <td colSpan={2}>
                    <p>
                      People like you are{" "}
                      <strong>{marketMoodArray?.mood}</strong> with the current
                      market conditions
                    </p>
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="pageFooter">
              <table role="presentation">
                <tbody>
                  <tr>
                    <td>Page 10</td>
                    <td>{FOOTER_DATE}</td>
                    <td>
                      {userName} - {uniqueStyleAndDescription?.behaviorTypeName}
                    </td>
                    <td>
                      © Copyright {FOOTER_YEAR} DNA Behavior Solutions, LLC
                    </td>
                    <td>ID#{accountId}</td>
                  </tr>
                  <div className="spacer10" />
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
