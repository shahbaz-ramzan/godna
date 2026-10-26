"use client";

import Logo from "@/assets/images/logo.png";
import FloatingChatButton from "@/components/common/floatingChatButton";
import GeneAIChatbot from "@/components/common/geneAIChatbot";
import FullScreenLoader from "@/components/common/loader";
import { useAccountId } from "@/hooks/useAccountId";
import { useLoggedPersonId } from "@/hooks/useLoggedPersonId";
import { useLoggedPersonName } from "@/hooks/useLoggedPersonName";
import {
  buildWorkTalentsInsights,
  formatTScoreData,
  normalizedKey,
} from "@/lib/utils";
import {
  getAssessmentResultsArrayApi,
  getBDNA5ScoresApi,
  getCareersInsightsApi,
  getCoachingReportTraitsApi,
  getFactorRelationshipTableApi,
  getPerformanceGuideArrayApi,
  getUniqueStyleAndDescriptionApi,
  getUniqueStyleVideoLinksApi,
} from "@/network/apis/report";
import { Button, Progress } from "antd";
import { ArrowLeft, Download } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { QRCodeCanvas } from "qrcode.react";
import { useEffect, useMemo, useRef, useState } from "react";
import "./participantBusinessReport.scss";
import {
  FOOTER_DATE,
  FOOTER_YEAR,
  PRIMARY_COLOR,
  REPORT_COLOR,
  REPORT_NAME,
  SECONDARY_COLOR,
  WORD,
} from "./staticReportData";
import { uniqueStyleImages } from "./uniqueStyleImages";

export const ParticipantBusinessReport = () => {
  const router = useRouter();
  const reportRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [chatOpen, setChatOpen] = useState(false);
  const [tscoreData, setTscoreData] = useState<number[] | null>(null);
  const [strongestFactor, setStrongestFactor] = useState<any>(null);
  const [performanceGuideArray, setPerformanceGuideArray] = useState<any>(null);
  const [bdna5Scores, setBDNA5Scores] = useState<any>(null);
  const [careersInsights, setCareersInsights] = useState<any>(null);
  const [uniqueStyleAndDescription, setUniqueStyleAndDescription] =
    useState<any>(null);
  const [factorRelationship, setFactorRelationship] = useState<any>(null);
  const [coachingReportTraits, setCoachingReportTraits] = useState<Record<
    string,
    string
  > | null>(null);
  const accountId = useAccountId();
  const searchParams = useSearchParams();
  const [uniqueStyleVideoLinks, setUniqueStyleVideoLinks] = useState<any[]>([]);
  const loggedUserName = useLoggedPersonName();
  const userName = searchParams.get("userName") ?? loggedUserName;
  const loggedPersonId = useLoggedPersonId();
  const personId = searchParams.get("personId") ?? loggedPersonId;
  const isDigitalScan = searchParams.get("isDigitalScan") ?? false;
  const onBack = () => router.back();

  const chatPayload = useMemo<Record<string, unknown> | null>(() => {
    if (!uniqueStyleAndDescription || !tscoreData || !userName) return null;
    return {
      personName: userName,
      reportType: "Participant Business Report",
      personID: uniqueStyleAndDescription?.personID,
      behaviorTypeID: uniqueStyleAndDescription?.behaviorTypeID,
      behaviorTypeName: uniqueStyleAndDescription?.behaviorTypeName,
      behaviorTypeDescription:
        uniqueStyleAndDescription?.behaviorTypeDescription,
      twoStrongestTraits: strongestFactor,
      insights: buildWorkTalentsInsights(bdna5Scores),
      tScores: formatTScoreData(tscoreData),
    };
  }, [
    uniqueStyleAndDescription,
    tscoreData,
    strongestFactor,
    bdna5Scores,
    userName,
  ]);

  const PAGE_COUNT = 7;

  const bdna5ScoreList = [
    {
      value: bdna5Scores?.resultsVsRelationships?.value,
      label: bdna5Scores?.resultsVsRelationships?.label,
      titleSparsed: ["Results", "Relationships"],
      description: bdna5Scores?.resultsVsRelationships?.description,
    },
    {
      value: bdna5Scores?.daringVsCareful?.value,
      label: bdna5Scores?.daringVsCareful?.label,
      titleSparsed: ["Daring", "Careful"],
      description: bdna5Scores?.daringVsCareful?.description,
    },
    {
      value: bdna5Scores?.abstractVsConcrete?.value,
      label: bdna5Scores?.abstractVsConcrete?.label,
      titleSparsed: ["Abstract", "Concrete"],
      description: bdna5Scores?.abstractVsConcrete?.description,
    },
    {
      value: bdna5Scores?.systematicVsFlexible?.value,
      label: bdna5Scores?.systematicVsFlexible?.label,
      titleSparsed: ["Systematic", "Flexible"],
      description: bdna5Scores?.systematicVsFlexible?.description,
    },
    {
      value: bdna5Scores?.promotingVsOperating?.value,
      label: bdna5Scores?.promotingVsOperating?.label,
      titleSparsed: ["Promoting", "Operating"],
      description: bdna5Scores?.promotingVsOperating?.description,
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
        fetchPerformanceGuideArray(personId),
        fetchBDNA5Scores(personId),
        fetchCareersInsights(personId),
        fetchAssessmentResultsArray(personId),
        fetchUniqueStyleVideoLinks(),
        fetchCoachingReportTraits(),
      ]);
    } catch (error) {
      console.error("Error fetching report data:", error);
    } finally {
      setIsLoading(false);
    }
  };
  const getUniqueStyleVideoUrl = () => {
    const behaviorTypeName = uniqueStyleAndDescription?.behaviorTypeName;

    if (!behaviorTypeName || !uniqueStyleVideoLinks?.length) {
      return "";
    }

    const match = uniqueStyleVideoLinks.find(
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
  const fetchBDNA5Scores = async (personId: string) => {
    try {
      const response: any = await getBDNA5ScoresApi(personId);
      setBDNA5Scores(response?.data);
    } catch (error) {
      console.error("Error fetching BDNA5 scores:", error);
    }
  };
  const fetchCareersInsights = async (personId: string) => {
    try {
      const response: any = await getCareersInsightsApi(personId);
      setCareersInsights(response?.data);
    } catch (error) {
      console.error("Error fetching careers insights:", error);
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
  const fetchUniqueStyleVideoLinks = async () => {
    try {
      const response: any = await getUniqueStyleVideoLinksApi();
      setUniqueStyleVideoLinks(response?.value);
    } catch (error) {
      console.error("Error fetching BDNAUniqueStyleVideoLinks:", error);
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
          {/* Page 1 – Cover */}
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
                    {/* eslint-disable-next-line @next/next/no-img-element */}
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

          {/* Page 2 – DNA Result */}
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
                      alt="fast-paced"
                      width="100%"
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

          {/* Page 3 – Work Talents */}
          <div className="pageWrapper" id="3">
            <table width="100%" role="presentation">
              <tbody>
                <tr>
                  <td
                    className="primaryColorBox"
                    style={{ backgroundColor: REPORT_COLOR }}
                  />
                  <td className="mainHeading" style={{ color: REPORT_COLOR }}>
                    Your Contrasting Work Talents
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
                    {bdna5ScoreList.map((talent) => {
                      const isLeftDominant =
                        talent.label === talent.titleSparsed[0];
                      return (
                        <tr key={talent.label} className="financialInsightWrap">
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
                                percent={
                                  isLeftDominant
                                    ? talent.value
                                    : 100 - talent.value
                                }
                                size={98}
                                strokeWidth={8}
                                strokeColor={PRIMARY_COLOR}
                                showInfo={false}
                                style={{ position: "absolute" }}
                              />
                              <div
                                style={{
                                  position: "absolute",
                                  top: "42%",
                                  left: "50%",
                                  transform: "translate(-50%, -50%)",
                                  fontSize: 20,
                                  fontWeight: 700,
                                  color: isLeftDominant
                                    ? PRIMARY_COLOR
                                    : SECONDARY_COLOR,
                                }}
                              >
                                {talent.value}%
                              </div>
                            </div>
                          </td>
                          <td>
                            <h6>
                              <span style={{ color: PRIMARY_COLOR }}>
                                {talent.titleSparsed[0]}
                              </span>{" "}
                              vs{" "}
                              <span style={{ color: SECONDARY_COLOR }}>
                                {talent.titleSparsed.at(-1)}
                              </span>
                            </h6>
                            <p>{talent.description}</p>
                          </td>
                        </tr>
                      );
                    })}
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

          {/* Page 4 – Ultimate Performance Guide */}
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

          {/* Page 5 – Top Two Factors */}
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

          {/* Page 6 – Desired Tasks */}
          <div className="pageWrapper" id="6">
            <table width="100%" role="presentation">
              <tbody>
                <tr>
                  <td
                    className="primaryColorBox"
                    style={{ backgroundColor: REPORT_COLOR }}
                  />
                  <td className="mainHeading" style={{ color: REPORT_COLOR }}>
                    Your Desired Tasks Based on Talents
                  </td>
                </tr>
                <tr>
                  <td colSpan={2} className="spacer20" />
                </tr>

                <tr>
                  <td colSpan={2}>
                    <p className="page-text">
                      Below is a summary of the work tasks, roles, and
                      environments you&apos;re most naturally motivated by.
                    </p>
                  </td>
                </tr>
                <tr>
                  <td colSpan={2} className="spacer40" />
                </tr>
                <tr>
                  <td colSpan={2} style={{ paddingBottom: "4px" }}>
                    <h5 className="mb0">Desired Tasks based on Talents</h5>
                  </td>
                </tr>
                <tr>
                  <td
                    className="tdBackground tdPadding"
                    valign="top"
                    colSpan={3}
                    style={{ borderTop: `10px solid ${REPORT_COLOR}` }}
                  >
                    <ul>
                      {careersInsights?.talents?.map((insight, i) => (
                        <li key={i}>{insight.name}</li>
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
                    <h5 className="mb0">Desired Team Roles</h5>
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
                      {careersInsights?.roles?.map((role, i) => (
                        <li key={i}>{role.name}</li>
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

          {/* Page 7 – Desired Tasks Continued + Unique Style Overview */}
          <div className="pageWrapper" id="7">
            <table width="100%" role="presentation">
              <tbody>
                <tr>
                  <td
                    className="primaryColorBox"
                    style={{ backgroundColor: REPORT_COLOR }}
                  />
                  <td className="mainHeading" style={{ color: REPORT_COLOR }}>
                    Your Desired Tasks Based on Talents
                  </td>
                </tr>
                <tr>
                  <td colSpan={2} className="spacer20" />
                </tr>

                <tr>
                  <td colSpan={2} style={{ paddingBottom: "4px" }}>
                    <h5 className="mb0">Desired Work Environment</h5>
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
                      {careersInsights?.environments?.map((env, i) => (
                        <li key={i}>{env.name}</li>
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
                    <h5 className="mb0">Desired Work Rewards</h5>
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
                      {careersInsights?.rewards?.map((r, i) => (
                        <li key={i}>{r.name}</li>
                      ))}
                    </ul>
                  </td>
                </tr>

                <tr>
                  <td colSpan={2} className="spacer40" />
                </tr>
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
                              your unique behavioral style as it relates to work
                              talent. Scan the QR code to access a video that
                              offers further insights into your style, helping
                              you understand its impact on your work talent
                              behaviors and strategies.
                            </div>
                          </td>
                          <td width="25%">
                            <div className="qrCodeContainer">
                              <QRCodeCanvas
                                value={getUniqueStyleVideoUrl()}
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
        </div>
      </div>
    </div>
  );
};
