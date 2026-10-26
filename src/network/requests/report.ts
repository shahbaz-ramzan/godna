import K from "../../constants";
import Request from ".";
import AzureTableRequest from "./azureTableRequest";

export default class ReportRequest extends Request {
  static getUniqueStyleAndDescription(personId: string): Request {
    return new Request(
      `${K.Network.URL.GET_UNIQUE_STYLE_AND_DESCRIPTION}/${personId}/${K.AppConstants.LANGUAGE_ID}`,
      K.Network.Method.GET,
      null,
      K.Network.Header.Type.Json,
      {},
    );
  }

  static getPerformanceGuideArray(personId: string): Request {
    return new Request(
      `${K.Network.URL.GET_PERFORMANCE_GUIDE_ARRAY}/${personId}/${K.AppConstants.LANGUAGE_ID}`,
      K.Network.Method.GET,
      null,
      K.Network.Header.Type.Json,
      {},
    );
  }

  static getBDNA5Scores(personId: string): Request {
    return new Request(
      `${K.Network.URL.GET_BDNA5_SCORES}/${personId}/${K.AppConstants.LANGUAGE_ID}`,
      K.Network.Method.GET,
      null,
      K.Network.Header.Type.Json,
      {},
    );
  }

  static getFDNA5Scores(personId: string): Request {
    return new Request(
      `${K.Network.URL.GET_FDNA5_SCORES}/${personId}/${K.AppConstants.LANGUAGE_ID}`,
      K.Network.Method.GET,
      null,
      K.Network.Header.Type.Json,
      {},
    );
  }

  static getCareersInsights(personId: string): Request {
    return new Request(
      `${K.Network.URL.GET_CAREERS_INSIGHTS}/${personId}`,
      K.Network.Method.GET,
      null,
      K.Network.Header.Type.Json,
      {},
    );
  }

  static getAssessmentResultsArray(personId: string): Request {
    return new Request(
      `${K.Network.URL.GET_TSCORE}/${personId}`,
      K.Network.Method.GET,
      null,
      K.Network.Header.Type.Json,
      {},
    );
  }

  static getFinancialSummary(): AzureTableRequest {
    return new AzureTableRequest(
      K.Network.URL.FINANCIAL_BEHAVIOR_REPORT_SUMMARY_TABLE,
      K.Network.Method.GET,
      null,
    );
  }

  static getCoachingReportTraitsData(): AzureTableRequest {
    return new AzureTableRequest(
      K.Network.URL.COACHING_REPORT_TRAITS_TABLE,
      K.Network.Method.GET,
      null,
    );
  }
  static getFactorRelationshipTable(): AzureTableRequest {
    return new AzureTableRequest(
      K.Network.URL.FACTOR_RELATIONSHIP_TABLE,
      K.Network.Method.GET,
      null,
    );
  }

  static getUniqueStyleVideoLinks(): AzureTableRequest {
    return new AzureTableRequest(
      K.Network.URL.BDNA_UNIQUE_STYLE_VIDEO_LINKS_TABLE,
      K.Network.Method.GET,
      null,
    );
  }

  static getFDNAUniqueStyleVideoLinks(): AzureTableRequest {
    return new AzureTableRequest(
      K.Network.URL.FDNA_UNIQUE_STYLE_VIDEO_LINKS_TABLE,
      K.Network.Method.GET,
      null,
    );
  }

  static getBehavioralBiasesArray(personId: string): Request {
    return new Request(
      `${K.Network.URL.GET_BEHAVIRAL_BIASES}/${personId}/${K.AppConstants.LANGUAGE_ID}`,
      K.Network.Method.GET,
      null,
      K.Network.Header.Type.Json,
      {},
    );
  }

  static getRiskBehavior(personId: string): Request {
    return new Request(
      `${K.Network.URL.GET_RISK_BEHAVIOR}/${personId}`,
      K.Network.Method.GET,
      null,
      K.Network.Header.Type.Json,
      {},
    );
  }

  static getMarketMoodArray(
    personId: string,
    creditId: number,
    date: string,
  ): Request {
    return new Request(
      `${K.Network.URL.GET_MARKET_MOOD_ARRAY}/${personId}/${creditId}/${date}`,
      K.Network.Method.GET,
      null,
      K.Network.Header.Type.Json,
      {},
    );
  }

  static getMarketData(creditId: number): Request {
    return new Request(
      `${K.Network.URL.GET_MARKET_DATA}/${creditId}`,
      K.Network.Method.GET,
      null,
      K.Network.Header.Type.Json,
      {},
    );
  }

  static getMarketMoodPercent(accountId: string): Request {
    return new Request(
      `${K.Network.URL.GET_MARKET_MOOD}/${accountId}`,
      K.Network.Method.GET,
      null,
      K.Network.Header.Type.Json,
      {},
    );
  }

  static getFDNAFinancialPlanningInsights(personId: string): Request {
    return new Request(
      `${K.Network.URL.GET_FDNA_FINANCIAL_PLANNING_INSIGHTS}/${personId}/${K.AppConstants.LANGUAGE_ID}`,
      K.Network.Method.GET,
      null,
      K.Network.Header.Type.Json,
      {},
    );
  }

  static getStyleMatch(firstPersonId: string, secondPersonId: string): Request {
    return new Request(
      `${K.Network.URL.GET_WORK_STYLE_MATCH}/${firstPersonId}/${secondPersonId}`,
      K.Network.Method.GET,
      null,
      K.Network.Header.Type.Json,
      {},
    );
  }
}
