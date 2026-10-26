"use client";

import { Routes } from "@/constants/routes";
import { reactivateSubscriptionApi } from "@/network/apis/payment";
import { getAccountSubscriptionDetailsApi } from "@/network/apis/subscription";
import { setSubscriptionState } from "@/store/slices/subscriptionSlice";
import { Modal, Tooltip } from "antd";
import dayjs from "dayjs";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import Stepper from "./stepper";
import EndedStep from "./steps/endedStep";
import PaymentStep from "./steps/paymentStep";
import SuccessStep from "./steps/successStep";

enum Step {
  Ended = "ended",
  Payment = "payment",
  Success = "success",
}

interface Props {
  open: boolean;
  accountId: string | null;
  maskedCardNumber?: string | null;
  subscriptionName?: string | null;
  productPrice?: number | null;
  subscriptionUrl?: string | null;
  onClose: () => void;
  onSuccess?: () => void;
}

const ReactivationModal = ({
  open,
  accountId,
  maskedCardNumber,
  subscriptionName,
  productPrice,
  subscriptionUrl,
  onClose,
  onSuccess,
}: Props) => {
  const [step, setStep] = useState<Step>(Step.Ended);
  const [isLoading, setIsLoading] = useState(false);
  const [nextBilling, setNextBilling] = useState<string | null>(null);
  const [newlyAddedCard, setNewlyAddedCard] = useState<string | null>(null);
  const dispatch = useDispatch();
  const router = useRouter();

  // Prefer a card just added in this session, fall back to what the API returned
  const activeCard = newlyAddedCard ?? maskedCardNumber ?? null;

  const handlePaymentAdded = async () => {
    if (!accountId) return;
    setIsLoading(true);
    try {
      const response: any = await getAccountSubscriptionDetailsApi(accountId);
      if (response?.data?.maskedCardNumber) {
        setNewlyAddedCard(response.data.maskedCardNumber);
      }
    } catch {
      // card display will fall back gracefully
    } finally {
      setIsLoading(false);
    }
  };

  const handleReactivate = async () => {
    if (!accountId) return;
    setIsLoading(true);
    try {
      const reactivateResponse: any =
        await reactivateSubscriptionApi(accountId);
      if (!reactivateResponse?.data) {
        toast.error(
          reactivateResponse?.message ?? "Failed to reactivate subscription.",
        );
        return;
      }

      try {
        const subResponse: any =
          await getAccountSubscriptionDetailsApi(accountId);
        if (subResponse?.data) {
          const isTrial = !!subResponse.data?.trialEndedAt;
          const trialDaysRemaining =
            isTrial && subResponse.data?.trialEndedAt
              ? Math.max(
                  dayjs(subResponse.data.trialEndedAt).diff(dayjs(), "day"),
                  0,
                )
              : 0;
          dispatch(
            setSubscriptionState({
              trialDaysRemaining,
              isTrial,
              maskedCardNumber: subResponse.data?.maskedCardNumber ?? null,
            }),
          );
          setNextBilling(
            subResponse.data?.subscriptionCurrentPeriodEndsAt
              ? dayjs(subResponse.data.subscriptionCurrentPeriodEndsAt).format(
                  "MMMM D, YYYY",
                )
              : null,
          );
        }
      } catch {
        // subscription refresh failed silently
      }

      setStep(Step.Success);
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to reactivate subscription.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleDismiss = () => {
    onClose();
    setTimeout(() => setStep(Step.Ended), 300);
  };

  const handleGoToDashboard = () => {
    onSuccess?.();
    router.push(Routes.DASHBOARD);
    setTimeout(() => setStep(Step.Ended), 300);
  };

  const getTitle = () => null;

  return (
    <Modal
      open={open}
      centered
      onCancel={step === Step.Success ? handleGoToDashboard : handleDismiss}
      footer={null}
      width={500}
      title={getTitle()}
      closeIcon={
        step === Step.Success ? (
          <X className="w-4 h-4" />
        ) : (
          <Tooltip title="Closing will log you out" placement="right">
            <X className="w-4 h-4" />
          </Tooltip>
        )
      }
      className="reactivation-modal thm-modal"
      maskClosable={false}
      destroyOnHidden
    >
      {step !== Step.Success && <Stepper step={step} />}

      {step === Step.Ended && (
        <EndedStep
          accountId={accountId}
          subscriptionUrl={subscriptionUrl}
          onNext={() => setStep(Step.Payment)}
        />
      )}

      {step === Step.Payment && (
        <PaymentStep
          subscriptionName={subscriptionName}
          productPrice={productPrice}
          activeCard={activeCard}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          onReactivate={handleReactivate}
          onPaymentAdded={handlePaymentAdded}
          onBack={() => setStep(Step.Ended)}
        />
      )}

      {step === Step.Success && (
        <SuccessStep nextBilling={nextBilling} onDone={handleGoToDashboard} />
      )}
    </Modal>
  );
};

export default ReactivationModal;
