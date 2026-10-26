import K from "../../constants";
import Request from ".";

export default class DigitalScanRequest extends Request {
  static submit(payload: Record<string, unknown>): Request {
    return new Request(
      K.Network.URL.DIGITAL_SCAN_SUBMIT,
      K.Network.Method.POST,
      payload,
      K.Network.Header.Type.Json,
      {},
    );
  }
}
