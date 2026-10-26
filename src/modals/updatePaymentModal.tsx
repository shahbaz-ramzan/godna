import ChargifyCheckout from "@/components/chargify/ChargifyCheckout";
import { useAccountId } from "@/hooks/useAccountId";
import { getAccountSubscriptionDetailsApi } from "@/network/apis/subscription";
import { setSubscriptionState } from "@/store/slices/subscriptionSlice";
import { Modal } from "antd";
import dayjs from "dayjs";
import React, { useState } from "react";
import { useDispatch } from "react-redux";

interface UpdatePaymentModalProps {
  open: boolean;
  onCancel: () => void;
  onSuccess?: () => void;
  addPayment?: boolean;
}

const UpdatePaymentModal: React.FC<UpdatePaymentModalProps> = ({
  open,
  onCancel,
  onSuccess,
  addPayment = false,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const accountId = useAccountId();

  const handleSuccess = async () => {
    if (accountId) {
      try {
        const response: any = await getAccountSubscriptionDetailsApi(accountId);
        if (response?.data) {
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
        console.error("Failed to refresh subscription after payment:", error);
      }
    }
    onSuccess?.();
  };

  return (
    <Modal
      closable={{ "aria-label": "Custom Close Button" }}
      open={open}
      onCancel={onCancel}
      destroyOnHidden
      footer={null}
    >
      <ChargifyCheckout
        updatePayment={true}
        addPayment={addPayment}
        onCancel={onCancel}
        onSuccess={handleSuccess}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
      />
    </Modal>
  );
};

export default UpdatePaymentModal;
