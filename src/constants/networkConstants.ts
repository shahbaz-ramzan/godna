const BASE_URL = {
  BASE_DNA_API_URL: process.env.NEXT_PUBLIC_BASE_DNA_API_URL,
  BASE_DNA_PUBLIC_API_URL: process.env.NEXT_PUBLIC_BASE_DNA_PUBLIC_API_URL,
  NO_AUTH_API_URL: process.env.NEXT_PUBLIC_NO_AUTH_API_URL,
  BASE_SSO_API_URL: process.env.NEXT_PUBLIC_BASE_SSO_API_URL,
  AZURE_TABLE_URL: process.env.NEXT_PUBLIC_AZURE_TABLE_URL,
  AZURE_SHARED_ACCESS_KEY: process.env.NEXT_PUBLIC_AZURE_SHARED_ACCESS_KEY,
  DIGITAL_SCAN_API_URL: process.env.NEXT_PUBLIC_DIGITAL_SCAN_API_URL,
  DNA_TIMEOUT: process.env.NEXT_PUBLIC_DNA_TIMEOUT,
};

const NetworkConstants = {
  URL: {
    Client: {
      BaseHost: process.env.NEXT_PUBLIC_CLIENT_BASE_HOST,
      BasePort: process.env.NEXT_PUBLIC_CLIENT_BASE_PORT,
    },

    /////////////////////// Azure Table API ///////////////////////

    AZURE_TABLE_API: BASE_URL.AZURE_TABLE_URL,
    AZURE_SHARED_ACCESS_KEY: BASE_URL.AZURE_SHARED_ACCESS_KEY,
    Factor_Relationship_Table: `${BASE_URL.AZURE_TABLE_URL}FactorRelationshipTable?${BASE_URL.AZURE_SHARED_ACCESS_KEY}`,
    FINANCIAL_BEHAVIOR_REPORT_SUMMARY_TABLE: `${BASE_URL.AZURE_TABLE_URL}/FinancialBehaviorReportSummary?${BASE_URL.AZURE_SHARED_ACCESS_KEY}`,
    COACHING_REPORT_TRAITS_TABLE: `${BASE_URL.AZURE_TABLE_URL}/CoachingReportTraitsTableV1?${BASE_URL.AZURE_SHARED_ACCESS_KEY}`,
    FACTOR_RELATIONSHIP_TABLE: `${BASE_URL.AZURE_TABLE_URL}/FactorRelationshipTable?${BASE_URL.AZURE_SHARED_ACCESS_KEY}`,
    BDNA_UNIQUE_STYLE_VIDEO_LINKS_TABLE: `${BASE_URL.AZURE_TABLE_URL}/BDNAUniqueStyleVideoLinks?${BASE_URL.AZURE_SHARED_ACCESS_KEY}`,
    FDNA_UNIQUE_STYLE_VIDEO_LINKS_TABLE: `${BASE_URL.AZURE_TABLE_URL}/FDNAUniqueStyleVideoLinks?${BASE_URL.AZURE_SHARED_ACCESS_KEY}`,

    /////////////////////// DNA API ///////////////////////

    GET_PARTICIPANTS_DETAIL: `${BASE_URL.BASE_DNA_API_URL}ParticipantProfile/GetParticipantsDetails`,
    GET_ALL_ACCOUNTS_BY_PERSON_ID: `${BASE_URL.BASE_DNA_API_URL}Accounts/GetListOfAccountByPersonId`,
    GET_ALL_ACCOUNTS: `${BASE_URL.BASE_DNA_API_URL}Accounts/GetAllAccounts`,
    GET_UNIQUE_STYLE_AND_DESCRIPTION: `${BASE_URL.BASE_DNA_API_URL}NaturalBehavior/GetUniqueStyleAndDescription`,
    GET_FDNA5_SCORES: `${BASE_URL.BASE_DNA_API_URL}NaturalBehavior/GetFDNA5Scores`,
    GET_PERFORMANCE_GUIDE_ARRAY: `${BASE_URL.BASE_DNA_API_URL}NaturalBehavior/GetPerformanceGuideArray`,
    GET_BDNA5_SCORES: `${BASE_URL.BASE_DNA_API_URL}NaturalBehavior/GetBDNA5Scores`,
    GET_CAREERS_INSIGHTS: `${BASE_URL.BASE_DNA_API_URL}NaturalBehavior/GetHiringDataArray`,
    GET_TSCORE: `${BASE_URL.BASE_DNA_API_URL}NaturalBehavior/GetAssessmentResultsArray`,
    GET_BEHAVIRAL_BIASES: `${BASE_URL.BASE_DNA_API_URL}NaturalBehavior/GetBehavioralBiasesArray`,
    CHECK_PARTICIPANT: `${BASE_URL.BASE_DNA_API_URL}ParticipantProfile/CheckParticipant`,
    SAVE_USER_TO_ACCOUNT: `${BASE_URL.BASE_DNA_API_URL}Participant/SaveParticipantToAccount`,
    GET_MANAGE_TAGS: `${BASE_URL.BASE_DNA_API_URL}Tag/GetTags`,
    UPDATE_PROFILE: `${BASE_URL.BASE_DNA_API_URL}User/UpdateClientDetails`,
    GET_WORK_STYLE_MATCH: `${BASE_URL.BASE_DNA_API_URL}ParticipantProfile/GetStyleMatch`,
    GET_FINANCIAL_STYLE_MATCH: `${BASE_URL.BASE_DNA_API_URL}ParticipantProfile/GetStyleMatch`,
    CHANGE_PASSWORD: `${BASE_URL.BASE_DNA_API_URL}Accounts/ChangePassword`,
    GET_MARKET_MOOD_ARRAY: `${BASE_URL.BASE_DNA_API_URL}NaturalBehavior/GetMarketMoodArray`,
    GET_RISK_BEHAVIOR: `${BASE_URL.BASE_DNA_API_URL}NaturalBehavior/GetRiskAllocation`,
    GET_FDNA_FINANCIAL_PLANNING_INSIGHTS: `${BASE_URL.BASE_DNA_API_URL}NaturalBehavior/GetFDNAFinancialPlanningInsights`,
    TOGGLE_DISCOVERY_REMINDER_EMAILS: `${BASE_URL.BASE_DNA_API_URL}Participant/ToggleDiscoveryReminderEmails`,
    GET_MARKET_MOOD: `${BASE_URL.BASE_DNA_API_URL}Accounts/GetMarketMoodPercent`,
    GET_MARKET_DATA: `${BASE_URL.BASE_DNA_API_URL}NaturalBehavior/GetMarketData`,

    ////////////////////////// Discovery API //////////////////////

    GET_DISCOVERY_STATUS: `${BASE_URL.BASE_DNA_API_URL}Discovery/GetDiscoveryStatus`,
    GET_PERSON_CREDIT_ID: `${BASE_URL.BASE_DNA_API_URL}Discovery/GetPersonCreditID`,
    GET_QUESTION_ANSWER_STATUS: `${BASE_URL.BASE_DNA_API_URL}Discovery/GetQuestionAnswer`,
    INSERT_11Q_17Q_ANSWERS: `${BASE_URL.BASE_DNA_API_URL}Discovery/Insert11Q17QAnswers`,
    GET_UNIQUE_STYLE: `${BASE_URL.BASE_DNA_API_URL}Discovery/GetUniqueStyle`,

    /////////////////////// Subscription API ///////////////////////
    GO_DNA_SIGN_UP: `${BASE_URL.NO_AUTH_API_URL}/Subscription/GoDnaSignUp`,
    GET_CHARGIFY_PRODUCTS_DETAILS: `${BASE_URL.NO_AUTH_API_URL}/Subscription/GetChargifyProductsDetails`,
    GET_ACCOUNT_SUBSCRIPTION_DETAILS: `${BASE_URL.BASE_DNA_API_URL}Chargify/GetAccountSubscriptionDetails`,

    /////////////////////// Digital Scan API ///////////////////////
    DIGITAL_SCAN_SUBMIT: BASE_URL.DIGITAL_SCAN_API_URL,

    /////////////////////////////////////// Chargify API ///////////////////////////////////////
    UPDATE_PAYMENT_METHOD: `${BASE_URL.BASE_DNA_API_URL}Chargify/UpdatePaymentMethod`,
    REACTIVATE_SUBSCRIPTION: `${BASE_URL.BASE_DNA_API_URL}Chargify/ReactivateSubscription`,

    // Unused APIs

    // GRANT_TOP_LEVEL_ACCESS: "UserRoles/GrantTopLevelAccessForAccount",
    // SAVE_SUBSCRIPTION_COMPONENT: "Chargify/SaveSubscriptionComponent",
    GET_COMMUNICATION_INSIGHTS: `${BASE_URL.BASE_DNA_API_URL}Accounts/GETCommunicationInsights`,
    SEARCH_MULTIPLE_ACCOUNT: "Participant/SearchParticipantByMultipleAccount",
    GET_USER_ROLE: "UserRoles/GetUserRoleByPersonIdAndAccountId",
    UPDATE_COMPLETION_EMAIL_SETTINGS: "Accounts/UpsertDiscoveryMailOptOut",
    GET_COMPLETION_EMAIL_SETTINGS:
      "Accounts/GetDiscoveryMailOptOutsByAccountId",

    UPDATE_CUSTOMIZE_EMAIL_TEXT:
      "Accounts/UpsertCustomizedDiscoveryCompleteEmail",
    GET_CUSTOMIZE_EMAIL_TEXT:
      "Accounts/GetCustomizedDiscoveryCompleteEmailsByAccountId",

    GET_SUBSCRIPTION_NAME: "Accounts/GetSubscriptionFeaturesByAccountId",
    UPDATE_USER_ROLE: "UserRoles/SaveParticipantAccountUserRole",
    DELETE_USER_ROLE: "UserRoles/DeleteUserRoleFromAccount",
    GET_USER_ROLE_TYPES: "UserRoles/ListUserRoleTypes",
    GET_USER_ROLE_BY_ACCOUNT: "UserRoles/ListUserRoleByAccountId",
    GET_LEGAL_TEXT: "Accounts/GetLegalText",
    GET_LANGUAGE: "Accounts/GetLanguage",
    GET_PARTICIPANT_LABELS: "Accounts/GetParticipantLabels",
    GET_USER_LABELS: "Accounts/GetUserLabels",
    GET_UNIQUE_STYLE_GRAPH: "Accounts/GetUniqueStyleCount",
    GET_SELF_REGISTRATION_LINK: "Accounts/ListSelfRegistrationLink",
    GET_SINGLE_SELF_REGISTRATION_LINK: "Accounts/GetSelfRegistrationLink",
    // DELETE_SELF_REGISTRATION_LINK: "Accounts/DeleteSelfRegistrationLink",
    SAVE_SELF_REGISTRATION_LINK: "Accounts/SaveSelfRegistrationLink",
    // EDIT_SELF_REGISTRATION_LINK: "Accounts/UpdateSelfRegistrationLink",
    GET_FACILITATORS: "Accounts/GetFacilitatorByAccount",
    CHECK_IDP_USER: "Participant/CheckIdpUsers",
    UPSERT_IDP_USER: "/Participant/UpsertIdpUsers",
    GET_IDP_USER: "Participants/GetIdpUsersByOpaqueId",
    UPSERT_TAG: "Tag/UpsertTag",
    // DELETE_TAG: "Tag/DeleteTag",
    UPSERT_ASSOCIATED_TAG_BY_ACCOUNT: "Tag/UpsertAssociateTagByAccount",
    UPSERT_PARTICIPANT_TO_FACILITATOR_BY_ACCOUNT:
      "Accounts/UpsertParticipanttoFacilitatorByAccount",
    GET_ACCOUNT_COLOR: "Accounts/GetAccountColor",
    GET_LAST_COMPLETIONS: "Accounts/Get30DaysDiscoveryCompletionByAccount",
    GET_RECENT_ACTIVITIES: "Accounts/GetDiscoveryCompletionCountByAccount",
    UPSERT_LEGAL_TEXT: "Accounts/UpsertLegalText",
    GET_UPDATE_COLOR: "Accounts/UpsertColor",
    UPLOAD_PROFILE_PICTURE: "ParticipantProfile/UploadProfilePicture",
    UPLOAD_ACCOUNT_LOGO: "CoBranding/UploadAccountLogo",
    GET_SUBSCRIPTION_ACCOUNT: "Chargify/GetSubscriptionAccount",
    GET_SUBSCRIPTION_DETAILS: "Chargify/GetSubscriptionUrlDetails",
    EDIT_ACCOUNT_DETAILS: "Accounts/UpdateAccountDetails",
    // UPDATE_DEFAULT_TOGGLE: "Participant/UpdateParticipantDefaultTab",
    GET_DEFAULT_TOGGLE: "Participants/GetParticipantDefaultTab",

    GET_FDNA_SCORE: "NaturalBehavior/GetFDNA5Scores",
    GET_VIDEO_URL: "Discovery/GetVideoUrl",
    GET_WORKPLACE_INSIGHT: "NaturalBehavior/GetBDNAWorkplaceInsightsArray",
    GET_WORK_TALENTS: "NaturalBehavior/GetBDNA5Scores",
    GET_HIRING_DATA: "NaturalBehavior/GetHiringData",
    GET_SALES_INSIGHT: "NaturalBehavior/GetSalesInsights",
    GET_ENVIRONMENT_KEYS: "NaturalBehavior/GetPerformanceGuideArray",
    GET_STRONGEST_FACTOR: "NaturalBehavior/GetAssessmentResultsArray",
    GET_USERS_LIST: `${BASE_URL.BASE_DNA_API_URL}Participant/SearchParticipantByAccount`,
    EXPORT_USERS_LIST: "/Participant/ExportParticipantByAccount",

    TOP_LEVEL_ADMIN_SEARCH_PARTICIPANT:
      "Participant/TopLevelAdminSearchParticipant",
    GET_PROFILE_PICTURE: "ParticipantProfile/GetProfilePicture",
    GET_CUSTOM_REPORT_NAMES: "CustomReports/GetCustomReportNameListByAccountId",
    UPDATE_CUSTOM_REPORT_NAME: "CustomReports/UpsertCustomReport",
    // RESET_PASSWORD: "Participants/ResetPassword",

    // GET_MARKET_DATA: "NaturalBehavior/GetMarketData",
    UPDATE_ACCOUNT_DETAILS: "Accounts/UpdateAccountDetails",
    // UPDATE_PROFILE: "User/UpdateClientDetails",
    INVITE_NEW_USERS: "...",
    // GET_ACCOUNT_SUBSCRIPTION_DETAILS: "Chargify/GetAccountSubscriptionDetails",
    GET_OLD_REPORTS: "Discovery/GetReport",
    GET_SORTING_ORDER: "Accounts/GetSortingOrder",
    UPDATE_SORTING_ORDER: "Accounts/UpsertSortingOrder",
    GET_SELF_REGISTRATION_ID:
      "Participants/GetParticipantSelfRegistrationDetail",
    GET_CUSTOM_REPORT:
      "CustomReports/GetCustomReportNameListByAccountIdByReportId",
    // GET_CREDIT_ID: "Discovery/GetPersonCreditID",
    GET_PARTICIPANT_ACCOUNTS: "Participants/ListParticipantAccountByPersonId",
    ZAPIER_SYNC_ALL: "Accounts/ZapierSyncAll",
    CHECK_ZAPIER_BULK_STATUS: "Accounts/CheckZapierBulkStatus",
    GET_DYNAMIC_WELCOME: "Accounts/GetAccountCustomWelcomeDetails",
    UPDATE_DYNAMIC_WELCOME: "Accounts/UpsertCustomWelcomePage",

    SALES_REPORT_ACCESS_TABLE: "CustomReportsAccessTable",
    COACHING_REPORT_ACCESS_TABLE: "CoachingReportAccessTable",
    DIGITAL_SCAN_ACCESS_TABLE: "DigitalScanAccess",
    TRAITS_DESCRIPTION_TABLE: "TraitsDescriptionTable",
    UNIQUE_STYLE_DESCRIPTION_TABLE: "UniqueStyleDescriptionTable",

    //////       admin tours api //////////////////////////

    GET_ACTIVE_USER_TOURS: "Tour/GetActiveUserTours",
    UPSERT_USER_TOUR_STATE: "Tour/UpsertUserTourState",
    GET_ACTIVE_USER_BANNERS: "Banner/GetActiveUserBanners",
    UPSERT_USER_BANNER_STATE: "Banner/UpsertUserBannerState",
    GET_ALL_BANNERS: "Banner/GetBanners",
    GET_ALL_TOURS: "Tour/GetTours",
    UPSERT_TOUR: "Tour/UpsertTour",
    UPSERT_BANNER: "Banner/UpsertBanner",
  },
  Method: {
    GET: "GET",
    POST: "POST",
    PUT: "PUT",
    DELETE: "DELETE",
  },
  Header: {
    ContentType: "Content-Type",
    ApplicationJson: "application/json",
    Default: (token = "") => ({
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + token,
    }),
    Authorization: () => ({
      // Authorization: "Bearer " + token,
      // "Content-Type": "multipart/form-data",
      // Accept: "application/json",
      "Content-Type": "application/json",
    }),
    Type: {
      Json: "json",
      File: "file",
      formData: "multipart/form-data",
    },
  },
  Default: {
    Error: "Opps, an error occurred!",
  },
  StatusCode: {
    Successful: 200,
    Created: 201,
    NoContent: 204,
    BadRequest: 400,
    Unauthorized: 401,
    Forbidden: 403,
    NotFound: 404,
    ServerError: 500,
  },
  ErrorMessages: {
    Successful: "Operation Successful!",
    BadRequest: "Bad Request",
    Unauthorized: "Unauthorized",
    Forbidden: "Forbidden Resource",
    NotFound: "Not Found",
    ServerError: "Internal Server Error",
  },
};
export default NetworkConstants;
