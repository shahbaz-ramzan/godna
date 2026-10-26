import NetworkCall from "../networkCall";
import DiscoveryRequest from "../requests/discovery";

export const checkParticipantApi = async (
  personId: string,
): Promise<unknown> => {
  try {
    const response: unknown = await NetworkCall.makeApiCall(
      DiscoveryRequest.checkParticipant(personId),
      false,
    );
    return response;
  } catch (error) {
    return error as Error;
  }
};

export const getDiscoveryStatusApi = async (
  creditId: string,
): Promise<unknown> => {
  try {
    const response: unknown = await NetworkCall.makeApiCall(
      DiscoveryRequest.getDiscoveryStatus(creditId),
      false,
    );
    return response;
  } catch (error) {
    return error as Error;
  }
};

export const getPersonCreditIdApi = async (
  personId: string,
): Promise<unknown> => {
  try {
    const response: unknown = await NetworkCall.makeApiCall(
      DiscoveryRequest.getPersonCreditId(personId),
      false,
    );
    return response;
  } catch (error) {
    return error as Error;
  }
};

export const getQuestionAnswerStatusApi = async (
  personId: string,
): Promise<unknown> => {
  try {
    const response: unknown = await NetworkCall.makeApiCall(
      DiscoveryRequest.getQuestionAnswerStatus(personId),
      false,
    );
    return response;
  } catch (error) {
    return error as Error;
  }
};

export const insert11Q17QAnswersApi = async (body: any): Promise<unknown> => {
  try {
    const response: unknown = await NetworkCall.makeApiCall(
      DiscoveryRequest.insert11Q17QAnswers(body),
      false,
    );
    return response;
  } catch (error) {
    return error as Error;
  }
};

// Lightweight check: `data.uniqueStyle` is `null` (not an error) when
// discovery isn't completed yet — unlike getUniqueStyleAndDescriptionApi,
// this never 400s for that case, so it's safe to call unconditionally.
export const getUniqueStyleApi = async (
  personId: string,
): Promise<unknown> => {
  try {
    // showErrorToast: false — matches getUniqueStyleAndDescriptionApi, which
    // this call precedes on the dashboard; that call is silent on failure,
    // so this pre-check should be too (no new toast users didn't see before).
    const response: unknown = await NetworkCall.makeApiCall(
      DiscoveryRequest.getUniqueStyle(personId),
      false,
      false,
    );
    return response;
  } catch (error) {
    return error as Error;
  }
};
