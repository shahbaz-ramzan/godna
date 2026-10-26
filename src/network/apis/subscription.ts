import NetworkCall from "../networkCall";
import SubscriptionRequest from "../requests/subscription";

export const goDnaSignUpApi = async (payload: any): Promise<any> => {
  try {
    // showErrorToast: false — both callers (signup, ChargifyCheckout) show
    // their own specific error message (e.g. "already exists" + KB link),
    // so the network layer's generic "Bad Request" toast would stack on top.
    const response = await NetworkCall.makeApiCall(
      SubscriptionRequest.goDnaSignUp(payload),
      false,
      false,
    );
    return response;
  } catch (error) {
    return error as Error;
  }
};

export const getAccountSubscriptionDetailsApi = async (
  accountId: string,
): Promise<any> => {
  try {
    const response = await NetworkCall.makeApiCall(
      SubscriptionRequest.getAccountSubscriptionDetails(accountId),
      false,
    );
    return response;
  } catch (error) {
    throw new Error(error as string);
  }
};

export const getChargifyProductsDetailsApi = async (): Promise<any> => {
  try {
    const response = await NetworkCall.makeApiCall(
      SubscriptionRequest.getChargifyProductsDetails(),
      false,
    );
    return response;
  } catch (error) {
    return error as Error;
  }
};
