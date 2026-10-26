import Request from ".";
import K from "../../constants";

export default class SubscriptionRequest extends Request {
  static goDnaSignUp(payload: any): Request {
    const request = new Request(
      K.Network.URL.GO_DNA_SIGN_UP,
      K.Network.Method.POST,
      payload,
      "file",
      {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    );
    return request;
  }
  static getAccountSubscriptionDetails(accountId: string): Request {
    return new Request(
      `${K.Network.URL.GET_ACCOUNT_SUBSCRIPTION_DETAILS}/${accountId}`,
      K.Network.Method.GET,
      null,
      K.Network.Header.Type.Json,
      {},
    );
  }
  static getChargifyProductsDetails(): Request {
    return new Request(
      K.Network.URL.GET_CHARGIFY_PRODUCTS_DETAILS,
      K.Network.Method.GET,
      null,
      K.Network.Header.Type.Json,
      {},
    );
  }
}
