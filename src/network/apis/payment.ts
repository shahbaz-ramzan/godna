import NetworkCall from "../networkCall";
import PaymentRequest from "../requests/payment";

export const updatePaymentMethodApi = async (payload: any): Promise<any> => {
  try {
    // showErrorToast: false — ChargifyCheckout.tsx's updatePaymentMethod
    // already shows its own toast.error(response.message) on failure, so
    // the network layer's generic "Bad Request" toast would stack on top.
    const response = await NetworkCall.makeApiCall(
      PaymentRequest.updatePaymentMethod(payload),
      false,
      false,
    );
    return response;
  } catch (error) {
    return error as Error;
  }
};

export const reactivateSubscriptionApi = async (
  accountId: string,
): Promise<any> => {
  // showErrorToast: false — reactivationModal's handleReactivate already
  // shows its own specific error message, so the network layer's generic
  // "Bad Request" toast would otherwise stack on top of it.
  const response = await NetworkCall.makeApiCall(
    PaymentRequest.reactivateSubscription(accountId),
    false,
    false,
  );
  return response;
};
