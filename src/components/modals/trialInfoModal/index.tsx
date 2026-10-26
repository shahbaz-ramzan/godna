"use client";

import { formatDays } from "@/lib/utils";
import { Modal } from "antd";
import { Clock } from "lucide-react";

export interface TrialInfoModalProps {
  open: boolean;
  onClose: () => void;
  onAddPayment: () => void;
  daysRemaining?: number;
}

const TrialInfoModal = ({
  open,
  onClose,
  onAddPayment,
  daysRemaining,
}: TrialInfoModalProps) => {
  return (
    <Modal
      open={open}
      onCancel={onClose}
      centered
      footer={null}
      className="trial-info-modal"
      width={480}
    >
      <div className="trial-info-modal__content">
        {/* Hero gradient header */}
        <div
          className="px-8 pt-10 pb-9 text-center rounded-t-2xl"
          style={{
            background: "linear-gradient(135deg, #004e92 0%, #00c9a7 100%)",
          }}
        >
          {/* Countdown number */}
          <div
            className="w-20 h-20 rounded-3xl flex flex-col items-center justify-center mx-auto mb-5"
            style={{ background: "rgba(255,255,255,0.15)" }}
          >
            <span className="text-[2rem] font-black text-white leading-none">
              {daysRemaining}
            </span>
            <span className="text-[10px] font-semibold text-white/70 uppercase tracking-wider mt-0.5">
              {formatDays(daysRemaining, false)}
            </span>
          </div>

          <h2 className="text-[1.375rem] font-bold text-white mb-2 leading-tight">
            {daysRemaining === 0
              ? "Last day of your free trial"
              : `Your free trial will expire in ${formatDays(daysRemaining)}`}
          </h2>
        </div>

        {/* Divider with icon */}
        <div className="flex items-center justify-center -mt-4 mb-0 relative z-10">
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center border-2 border-white"
            style={{
              background: "linear-gradient(135deg, #004e92 0%, #00c9a7 100%)",
            }}
          >
            <Clock className="w-6 h-6 text-white" aria-hidden="true" />
          </div>
        </div>

        {/* Body */}
        <div className="px-8 pt-5 pb-6 text-center">
          <p className="text-sm text-muted-foreground leading-relaxed mb-0">
            Add a payment method before your trial ends to continue enjoying
            full access to your behavioral insights, reports, and all premium
            features without interruption.
          </p>
        </div>

        {/* Actions */}
        <div className="px-8 pb-6 flex flex-col gap-3">
          <button
            onClick={onAddPayment}
            className="flex items-center justify-center w-full h-11 rounded-[14px] text-sm font-semibold transition-opacity hover:opacity-90 cursor-pointer"
            style={{
              background: "linear-gradient(135deg, #004e92 0%, #00c9a7 100%)",
              color: "#ffffff",
            }}
          >
            Add Payment Method
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default TrialInfoModal;
