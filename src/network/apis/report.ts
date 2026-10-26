import NetworkCall from "../networkCall";
import ReportRequest from "../requests/report";

export const getUniqueStyleAndDescriptionApi = async (
  personId: string,
): Promise<unknown> => {
  try {
    const response: unknown = await NetworkCall.makeApiCall(
      ReportRequest.getUniqueStyleAndDescription(personId),
      false,
      false,
    );
    return response;
  } catch (error) {
    return error as Error;
  }
};

export const getPerformanceGuideArrayApi = async (
  personId: string,
): Promise<unknown> => {
  try {
    const response: unknown = await NetworkCall.makeApiCall(
      ReportRequest.getPerformanceGuideArray(personId),
      false,
    );
    return response;
  } catch (error) {
    return error as Error;
  }
};

export const getBDNA5ScoresApi = async (personId: string): Promise<unknown> => {
  try {
    const response: unknown = await NetworkCall.makeApiCall(
      ReportRequest.getBDNA5Scores(personId),
      false,
    );
    return response;
  } catch (error) {
    return error as Error;
  }
};

export const getStyleMatchApi = async (
  firstPersonId: string,
  secondPersonId: string,
): Promise<unknown> => {
  try {
    const response: unknown = await NetworkCall.makeApiCall(
      ReportRequest.getStyleMatch(firstPersonId, secondPersonId),
      false,
    );
    return response;
  } catch (error) {
    return error as Error;
  }
};

export const getFDNA5ScoresApi = async (personId: string): Promise<unknown> => {
  try {
    const response: unknown = await NetworkCall.makeApiCall(
      ReportRequest.getFDNA5Scores(personId),
      false,
    );
    return response;
  } catch (error) {
    return error as Error;
  }
};

export const getCareersInsightsApi = async (
  personId: string,
): Promise<unknown> => {
  try {
    const response: unknown = await NetworkCall.makeApiCall(
      ReportRequest.getCareersInsights(personId),
      false,
    );
    return response;
  } catch (error) {
    return error as Error;
  }
};

export const getAssessmentResultsArrayApi = async (
  personId: string,
): Promise<unknown> => {
  try {
    const response: unknown = await NetworkCall.makeApiCall(
      ReportRequest.getAssessmentResultsArray(personId),
      false,
    );
    return response;
  } catch (error) {
    return error as Error;
  }
};

export const getFinancialSummary = async (): Promise<unknown> => {
  try {
    const response: unknown = await NetworkCall.makeApiCall(
      ReportRequest.getFinancialSummary(),
      false,
    );
    return response;
  } catch (error) {
    return error as Error;
  }
};

export const getUniqueStyleVideoLinksApi = async (): Promise<unknown> => {
  try {
    const response: unknown = await NetworkCall.makeApiCall(
      ReportRequest.getUniqueStyleVideoLinks(),
      false,
    );
    return response;
  } catch (error) {
    return error as Error;
  }
};

export const getFDNAUniqueStyleVideoLinksApi = async (): Promise<unknown> => {
  try {
    const response: unknown = await NetworkCall.makeApiCall(
      ReportRequest.getFDNAUniqueStyleVideoLinks(),
      false,
    );
    return response;
  } catch (error) {
    return error as Error;
  }
};

export const getCoachingReportTraitsApi = async (): Promise<unknown> => {
  try {
    const response: unknown = await NetworkCall.makeApiCall(
      ReportRequest.getCoachingReportTraitsData(),
      false,
    );
    return response;
  } catch (error) {
    return error as Error;
  }
};
export const getFactorRelationshipTableApi = async (): Promise<unknown> => {
  try {
    const response: unknown = await NetworkCall.makeApiCall(
      ReportRequest.getFactorRelationshipTable(),
      false,
    );
    return response;
  } catch (error) {
    return error as Error;
  }
};
export const getBehavioralBiasesArrayApi = async (
  personId: string,
): Promise<unknown> => {
  try {
    const response: unknown = await NetworkCall.makeApiCall(
      ReportRequest.getBehavioralBiasesArray(personId),
      false,
    );
    return response;
  } catch (error) {
    return error as Error;
  }
};

export const getRiskBehaviorApi = async (
  personId: string,
): Promise<unknown> => {
  try {
    const response: unknown = await NetworkCall.makeApiCall(
      ReportRequest.getRiskBehavior(personId),
      false,
    );
    return response;
  } catch (error) {
    return error as Error;
  }
};

export const getMarketMoodArrayApi = async (
  personId: string,
  creditId: number,
  date: string,
): Promise<unknown> => {
  try {
    const response: unknown = await NetworkCall.makeApiCall(
      ReportRequest.getMarketMoodArray(personId, creditId, date),
      false,
      false,
    );
    return response;
  } catch (error) {
    return error as Error;
  }
};

export const getMarketDataApi = async (
  creditId: number,
): Promise<unknown> => {
  try {
    const response: unknown = await NetworkCall.makeApiCall(
      ReportRequest.getMarketData(creditId),
      false,
    );
    return response;
  } catch (error) {
    return error as Error;
  }
};

export const getMarketMoodPercentApi = async (
  accountId: string,
): Promise<unknown> => {
  try {
    const response: unknown = await NetworkCall.makeApiCall(
      ReportRequest.getMarketMoodPercent(accountId),
      false,
    );
    return response;
  } catch (error) {
    return error as Error;
  }
};

export const getFDNAFinancialPlanningInsightsApi = async (
  personId: string,
): Promise<unknown> => {
  try {
    const response: unknown = await NetworkCall.makeApiCall(
      ReportRequest.getFDNAFinancialPlanningInsights(personId),
      false,
    );
    return response;
  } catch (error) {
    return error as Error;
  }
};
