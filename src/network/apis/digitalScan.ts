import NetworkCall from "../networkCall";
import DigitalScanRequest from "../requests/digitalScan";

export const submitDigitalScanApi = async (
  payload: Record<string, unknown>,
): Promise<unknown> => {
  return NetworkCall.makeApiCall(DigitalScanRequest.submit(payload), false);
};
