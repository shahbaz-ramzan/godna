import { getCommunicationInsightsApi } from "@/network/apis/user";
import {
  getUniqueStyleAndDescriptionApi,
  getPerformanceGuideArrayApi,
  getBDNA5ScoresApi,
  getStyleMatchApi,
} from "@/network/apis/report";
import { ApiResult } from "@/types/http";

export interface CommunicationInsightsData {
  preferredContactMethod?: string;
  [key: string]: unknown;
}

export const fetchStyleComparisonData = async (
  firstUserId: string,
  secondUserId: string,
) => {
  const results = await Promise.allSettled([
    getUniqueStyleAndDescriptionApi(firstUserId),
    getUniqueStyleAndDescriptionApi(secondUserId),
  ]);

  return {
    firstUser:
      results[0].status === "fulfilled"
        ? (results[0]?.value as ApiResult).data
        : null,

    secondUser:
      results[1].status === "fulfilled"
        ? (results[1]?.value as ApiResult).data
        : null,

    errors: {
      firstUser: results[0].status === "rejected" ? results[0].reason : null,
      secondUser: results[1].status === "rejected" ? results[1].reason : null,
    },
  };
};

export const fetchPerformanceGuideData = async (
  firstUserId: string,
  secondUserId: string,
) => {
  const results = await Promise.allSettled([
    getPerformanceGuideArrayApi(firstUserId),
    getPerformanceGuideArrayApi(secondUserId),
  ]);

  return {
    firstUser:
      results[0].status === "fulfilled"
        ? (results[0]?.value as ApiResult).data
        : null,

    secondUser:
      results[1].status === "fulfilled"
        ? (results[1]?.value as ApiResult).data
        : null,

    errors: {
      firstUser: results[0].status === "rejected" ? results[0].reason : null,
      secondUser: results[1].status === "rejected" ? results[1].reason : null,
    },
  };
};

export const fetchBDNA5ScoresData = async (
  firstUserId: string,
  secondUserId: string,
) => {
  const results = await Promise.allSettled([
    getBDNA5ScoresApi(firstUserId),
    getBDNA5ScoresApi(secondUserId),
  ]);

  return {
    firstUser:
      results[0].status === "fulfilled"
        ? (results[0]?.value as ApiResult).data
        : null,

    secondUser:
      results[1].status === "fulfilled"
        ? (results[1]?.value as ApiResult).data
        : null,

    errors: {
      firstUser: results[0].status === "rejected" ? results[0].reason : null,
      secondUser: results[1].status === "rejected" ? results[1].reason : null,
    },
  };
};

export const fetchStyleMatchData = async (
  firstPersonId: string,
  secondPersonId: string,
): Promise<number | null> => {
  try {
    const response = (await getStyleMatchApi(
      firstPersonId,
      secondPersonId,
    )) as ApiResult;
    if (typeof response?.data === "number") {
      return response.data;
    }
    return null;
  } catch {
    return null;
  }
};

export const fetchCommunicationInsightsData = async (
  firstPersonId: string,
  secondPersonId: string,
): Promise<{
  firstUser: CommunicationInsightsData | null;
  secondUser: CommunicationInsightsData | null;
}> => {
  const results = await Promise.allSettled([
    getCommunicationInsightsApi(firstPersonId),
    getCommunicationInsightsApi(secondPersonId),
  ]);

  return {
    firstUser:
      results[0].status === "fulfilled" &&
      (results[0].value as ApiResult)?.data
        ? ((results[0].value as ApiResult).data as CommunicationInsightsData)
        : null,
    secondUser:
      results[1].status === "fulfilled" &&
      (results[1].value as ApiResult)?.data
        ? ((results[1].value as ApiResult).data as CommunicationInsightsData)
        : null,
  };
};
