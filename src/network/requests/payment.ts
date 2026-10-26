import Request from ".";
import K from "../../constants";

export default class PaymentRequest extends Request {
  static updatePaymentMethod(payload: any): Request {
    return new Request(
      K.Network.URL.UPDATE_PAYMENT_METHOD,
      K.Network.Method.PUT,
      payload,
      K.Network.Header.Type.Json,
      {},
    );
  }

  static reactivateSubscription(accountId: string): Request {
    return new Request(
      `${K.Network.URL.REACTIVATE_SUBSCRIPTION}?accountId=${accountId}`,
      K.Network.Method.PUT,
      null,
      K.Network.Header.Type.Json,
      {},
    );
  }
}
