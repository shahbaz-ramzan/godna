import NetworkCall from "../networkCall";
import UserRequest from "../requests/user";

export const getParticipantDetailsApi = async (payload: any): Promise<any> => {
  try {
    const participantDetails = await NetworkCall.makeApiCall(
      UserRequest.getParticipantDetails(payload),
      false,
    );
    return participantDetails;
  } catch (error) {
    throw new Error(error as string);
  }
};

export const getAllAccountsByPersonIdApi = async (
  personId: string,
): Promise<any> => {
  try {
    const accounts = await NetworkCall.makeApiCall(
      UserRequest.getAllAccountsByPersonId(personId),
      false,
    );
    return accounts;
  } catch (error) {
    console.log("Failed to fetch accounts:", error);
    throw new Error(error as string);
  }
};

export const searchParticipantByAccountApi = async (
  payload: any,
): Promise<any> => {
  try {
    const response = await NetworkCall.makeApiCall(
      UserRequest.searchParticipantByAccount(payload),
      false,
    );
    return response;
  } catch (error) {
    throw new Error(error as string);
  }
};

export const saveParticipantToAccountApi = async (
  payload: any,
): Promise<any> => {
  try {
    const response = await NetworkCall.makeApiCall(
      UserRequest.saveParticipantToAccount(payload),
      false,
    );
    return response;
  } catch (error) {
    return error as Error;
  }
};

export const getTagsApi = async (accountId: string): Promise<any> => {
  try {
    const response = await NetworkCall.makeApiCall(
      UserRequest.getTags(accountId),
      false,
    );
    return response;
  } catch (error) {
    return error as Error;
  }
};

export const getCommunicationInsightsApi = async (
  personId: string,
): Promise<any> => {
  try {
    const response = await NetworkCall.makeApiCall(
      UserRequest.getCommunicationInsights(personId),
      false,
    );
    return response;
  } catch (error) {
    return error as Error;
  }
};
