import { Routes } from "@/constants/routes";
import { Button, Modal } from "antd";
import { Download } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

interface DownloadReportModalProps {
  open: boolean;
  onCancel: () => void;
  selectedUser?: any;
}

const DownloadReportModal: React.FC<DownloadReportModalProps> = ({
  open,
  onCancel,
  selectedUser,
}) => {
  const router = useRouter();

  useEffect(() => {
    router.prefetch(Routes.WORK_TALENTS_REPORT);
    router.prefetch(Routes.PARTICIPANT_FINANCIAL_REPORT);
  }, [router]);

  const handleWorkTalentDownload = () => {
    if (selectedUser) {
      router.push(
        `${Routes.WORK_TALENTS_REPORT}?personId=${selectedUser?.personID}&isDigitalScan=${selectedUser?.isDigitalScanV1_5Imported}&userName=${selectedUser?.firstName} ${selectedUser?.lastName}`,
      );
    } else {
      router.push(`${Routes.WORK_TALENTS_REPORT}`);
    }
    onCancel();
  };

  const handleFinancialBehaviorDownload = () => {
    if (selectedUser) {
      router.push(
        `${Routes.PARTICIPANT_FINANCIAL_REPORT}?personId=${selectedUser?.personID}&isDigitalScan=${selectedUser?.isDigitalScanV1_5Imported}&userName=${selectedUser?.firstName} ${selectedUser?.lastName}`,
      );
    } else {
      router.push(`${Routes.PARTICIPANT_FINANCIAL_REPORT}`);
    }
    onCancel();
  };

  return (
    <Modal
      open={open}
      title="Download Report"
      centered
      className="thm-modal download-report-modal"
      onCancel={onCancel}
      footer={null}
      width={510}
    >
      <div className="modal-text">
        <p className="modal-descp">Choose which PDF you want to download.</p>
        <div className="download-options-wrap">
          <Button
            type="primary"
            className="thm-btn download-option-btn"
            icon={<Download className="h-5 w-5" />}
            onClick={handleWorkTalentDownload}
            block
            size="large"
          >
            <div className="btn-content-wrapper">
              <div className="btn-title">Work Talent Report (PDF)</div>
              <div className="btn-text">
                Traits, performance keys, communication, summary.
              </div>
            </div>
          </Button>
          <Button
            type="primary"
            className="thm-btn download-option-btn"
            icon={<Download className="h-5 w-5" />}
            onClick={handleFinancialBehaviorDownload}
            block
            size="large"
          >
            <div className="btn-content-wrapper">
              <div className="btn-title">Financial Behavior Report (PDF)</div>
              <div className="btn-text">
                Financial behaviors, investment style, communication, summary.
              </div>
            </div>
          </Button>
        </div>
      </div>
      <div
        className="modal-footer"
        style={{ display: "flex", justifyContent: "flex-end" }}
      >
        <Button className="cancel-btn" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </Modal>
  );
};

export default DownloadReportModal;
