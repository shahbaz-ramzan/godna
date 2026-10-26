"use client";

import ClientDashboardHeader from "@/components/common/clientDashboardHeader/clientDashboardHeader";
import FullScreenLoader from "@/components/common/loader";
import { useAccountId } from "@/hooks/useAccountId";
import { getAccountSubscriptionDetailsApi } from "@/network/apis/subscription";
import { setSubscriptionState } from "@/store/slices/subscriptionSlice";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import ActivePlanInformation from "./activePlanInformation";
import TrialPeriodInfoCard from "./trialPeriodInfoCard";

export interface SubscriptionData {
  subscriptionId: number;
  subscriptionState: boolean;
  subscriptionCurrentPeriodEndsAt: string;
  subscriptionReferralCode: string;
  productHandle: string;
  customerId: number;
  namedUserSeat: number;
  staffUserSeat: number;
  url: string;
  createdAt: string;
  expiresAt: string;
  newLinkAvailableAt: string;
  trialStartedAt: string;
  trialEndedAt: string;
  productPrice: number;
  subscriptionName: string;
  maskedCardNumber: string | null;
  cancelAtEndOfPeriod: boolean;
  scheduledCancellationAt: string;
  state: string;
}

const Subscription = () => {
  const [subscriptionDetails, setSubscriptionDetails] =
    useState<SubscriptionData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const accountId = useAccountId();
  const dispatch = useDispatch();
  const subscriptionFee = subscriptionDetails?.productPrice ?? 0;

  const formatDate = (date?: string) => dayjs(date).format("MMMM D, YYYY");

  const isTrial = !!subscriptionDetails?.trialEndedAt;

  const trialPeriodDays =
    isTrial &&
    subscriptionDetails?.trialStartedAt &&
    subscriptionDetails?.trialEndedAt
      ? dayjs(subscriptionDetails.trialEndedAt).diff(
          dayjs(subscriptionDetails.trialStartedAt),
          "day",
        )
      : 0;

  const trialDaysRemaining =
    isTrial && subscriptionDetails?.trialEndedAt
      ? Math.max(
          dayjs(subscriptionDetails.trialEndedAt).diff(dayjs(), "day"),
          0,
        )
      : 0;

  const subscriptionEndDate = formatDate(
    subscriptionDetails?.subscriptionCurrentPeriodEndsAt,
  );

  const getAccountSubscriptionDetails = async (accountId: string) => {
    setLoading(true);
    try {
      const response: any = await getAccountSubscriptionDetailsApi(accountId);

      if (response?.data) {
        setSubscriptionDetails(response.data);

        const isTrial = !!response.data?.trialEndedAt;
        const trialDaysRemaining =
          isTrial && response.data?.trialEndedAt
            ? Math.max(
                dayjs(response.data.trialEndedAt).diff(dayjs(), "day"),
                0,
              )
            : 0;
        const maskedCardNumber = response.data?.maskedCardNumber ?? null;
        dispatch(
          setSubscriptionState({
            trialDaysRemaining,
            isTrial,
            maskedCardNumber,
          }),
        );
      }
    } catch (error) {
      console.error("Failed to get account subscription details:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (accountId) {
      getAccountSubscriptionDetails(accountId);
    }
  }, [accountId]);

  return (
    <>
      {loading && <FullScreenLoader />}
      <ClientDashboardHeader
        title="Subscription"
        description="Manage your plan and billing"
      />

      <ActivePlanInformation
        subscriptionEndDate={subscriptionEndDate}
        isTrial={isTrial}
        trialPeriodDays={trialPeriodDays}
        trialDaysRemaining={trialDaysRemaining}
        subscriptionDetails={subscriptionDetails}
        subscriptionFee={subscriptionFee}
        loading={loading}
        maskedCardNumber={subscriptionDetails?.maskedCardNumber}
        onPaymentSuccess={() => getAccountSubscriptionDetails(accountId)}
      />

      {isTrial && (
        <TrialPeriodInfoCard
          trialEndDate={subscriptionEndDate}
          subscriptionFee={subscriptionFee}
          maskedCardNumber={subscriptionDetails?.maskedCardNumber}
          cancelAtEndOfPeriod={subscriptionDetails?.cancelAtEndOfPeriod}
          scheduledCancellationAt={
            subscriptionDetails?.scheduledCancellationAt
              ? formatDate(subscriptionDetails.scheduledCancellationAt)
              : undefined
          }
        />
      )}
    </>
  );
};

export default Subscription;
