const AppConstants = {
  PROFILE_ID: 1,
  LANGUAGE_ID: "22",
  QUESTIONS_PATTERN_17: "17",
  QUESTIONS_PATTERN_11: "11",
  QUESTIONS_PATTERN_46: "47",

  ACCESS_TOKEN: "accessToken",
  IS_LOGGED_IN: "isLoggedIn",
  ACCOUNT_TYPE: "GoDNA",

  SUBSCRIPTION_NAME: "subscriptionName",
  DEFAULT_IS_FDNA: "defaultIsFDNA",

  DATE_FORMAT: "yyyy-dd-mm",

  // Field lengths
  MAX_NAME: 50,
  DIGITS: "^[0-9]*$",

  INVITE_STATUS_ACCEPTED: 1,
  INVITE_STATUS_AWAITING: 0,

  RANGE_VALUES: [20, 80],

  USER_OBJECT: "userObject",
  ACCOUNT_OBJECT: "accountObject",
  PERMISSION_OBJECT: "permissionObject",

  LOGGED_IN_PERSON_ID: "loggedInPersonId",
  OPAQUE_ID: "opaqueId",

  ACCOUNT_ID_KEY: "accountId",

  DEFAULT_PRIMARY_COLOR: "#eead32",
  DEFAULT_SECONDARY_COLOR: "#2e9b64",
  DEFAULT_SECONDARY_COLOR2: "#1a3462",
  TUTORIAL_LINK: "https://www.youtube.com/watch?v=LSXYz-2RH80",
  USER_NAME: "userName",
  ENCRYPTION_KEY: "1666613865682", //time in millis

  USER_ROLE_TYPES: {
    TOP_LEVEL_ADMIN: 1,
    NAMED_USER: 5,
  },
  TOP_LEVEL_SEARCH_FILTERS: [
    {
      name: "Participant Name",
      value: "name",
    },
    {
      name: "Participant ID",
      value: "personId",
    },
    {
      name: "Account Name",
      value: "accountName",
    },
    {
      name: "Account ID",
      value: "accountId",
    },
    {
      name: "Email Address",
      value: "email",
    },
  ],

  BEHAVIORAL_BIASES_VIDEOS: <any>{
    "Mental Accounting": "https://www.youtube.com/embed/dXTN-6_3ZzM",
    "Over Confidence": "https://www.youtube.com/embed/YEo-ZAJUQeE",
    "Status Quo Bias": "https://www.youtube.com/embed/R3GZEnnr110",
    Instinctive: "https://www.youtube.com/embed/ilMJb_Vqcyc",
    "Pattern Bias": "https://www.youtube.com/embed/i-7gjDnOe7U",
    "Over Trading": "https://www.youtube.com/embed/cG07wyIxJTM",
    "Benchmark Focus": "https://www.youtube.com/embed/o6p_TFuMtfU",
    "Optimism Bias": "https://www.youtube.com/embed/fp5kmpMcbQo",
    "Disposition Effect": "https://www.youtube.com/embed/wzAQMhzbjSc",
    Controlling: "https://www.youtube.com/embed/iCHtow_eTjo",
    "Consolidated View": "https://www.youtube.com/embed/v-Bm3EdpkFM",
    "Newness Bias": "https://www.youtube.com/embed/SybRXV6q9pU",
    "Risk Aversion": "https://www.youtube.com/embed/IOzqI_uxgo8",
    "Herd Follower": "https://www.youtube.com/embed/ojEoDAb1QCo",
    "Fear of Regret": "https://www.youtube.com/embed/FjwDh31igVk",
    "Loss Aversion": "https://www.youtube.com/embed/680TEpQSU5w",
  },

  MARKET_MOOD_VIDEO: "https://www.youtube.com/embed/pcIbrCrxgZA",

  BDNA_UNIQUE_STYLE: <any>{
    "Stylish Thinker":
      "https://www.youtube.com/watch?v=ShTpOixpu-8&list=PLN5UoEBCJUG4002mzEmGJAEWBOaPJ3Hyx&index=7",
    Engager:
      "https://www.youtube.com/watch?v=6Rj8o_cADNw&list=PLN5UoEBCJUG4002mzEmGJAEWBOaPJ3Hyx&index=5",
    "Community Builder":
      "https://www.youtube.com/watch?v=IiJJpFMVKdg&list=PLN5UoEBCJUG4002mzEmGJAEWBOaPJ3Hyx&index=6",
    Initiator:
      "https://www.youtube.com/watch?v=yCqokNMwhGE&list=PLN5UoEBCJUG4002mzEmGJAEWBOaPJ3Hyx&index=4",
    Strategist:
      "https://www.youtube.com/watch?v=SSUM9YHAu84&list=PLN5UoEBCJUG4002mzEmGJAEWBOaPJ3Hyx&index=8",
    "Reflective Thinker":
      "https://www.youtube.com/watch?v=JH9oMFHFakA&list=PLN5UoEBCJUG4002mzEmGJAEWBOaPJ3Hyx&index=10",
    Influencer:
      "https://www.youtube.com/watch?v=ib_syxtCbQw&list=PLN5UoEBCJUG4002mzEmGJAEWBOaPJ3Hyx&index=1",
    "Relationship Builder":
      "https://www.youtube.com/watch?v=sbBMjaRC5Bc&list=PLN5UoEBCJUG4002mzEmGJAEWBOaPJ3Hyx&index=3",
    Facilitator:
      "https://www.youtube.com/watch?v=2jwwAuT2fvE&list=PLN5UoEBCJUG4002mzEmGJAEWBOaPJ3Hyx&index=2",
    Adapter:
      "https://www.youtube.com/watch?v=VzQJGEH4QN8&list=PLN5UoEBCJUG4002mzEmGJAEWBOaPJ3Hyx&index=9",
  },

  FDNA_UNIQUE_STYLE: <any>{
    "Stylish Thinker":
      "https://www.youtube.com/watch?v=gzmAWkyyMlc&list=PLN5UoEBCJUG4J-EqSQEiLkB7hrrQ-dkYJ&index=1",
    Engager:
      "https://www.youtube.com/watch?v=j1MIGu_Bp6g&list=PLN5UoEBCJUG4J-EqSQEiLkB7hrrQ-dkYJ&index=2",
    "Community Builder":
      "https://www.youtube.com/watch?v=wZUVAj2O0iY&list=PLN5UoEBCJUG4J-EqSQEiLkB7hrrQ-dkYJ&index=3",
    Initiator:
      "https://www.youtube.com/watch?v=IV_ZUBgLUyo&list=PLN5UoEBCJUG4J-EqSQEiLkB7hrrQ-dkYJ&index=4",
    Strategist:
      "https://www.youtube.com/watch?v=EAJVjso8jkQ&list=PLN5UoEBCJUG4J-EqSQEiLkB7hrrQ-dkYJ&index=5",
    "Reflective Thinker":
      "https://www.youtube.com/watch?v=JJvCHJ6uwNM&list=PLN5UoEBCJUG4J-EqSQEiLkB7hrrQ-dkYJ&index=6",
    Influencer:
      "https://www.youtube.com/watch?v=6ELbEooh2zQ&list=PLN5UoEBCJUG4J-EqSQEiLkB7hrrQ-dkYJ&index=7",
    "Relationship Builder":
      "https://www.youtube.com/watch?v=5QRwpdSCLl8&list=PLN5UoEBCJUG4J-EqSQEiLkB7hrrQ-dkYJ&index=8",
    Facilitator:
      "https://www.youtube.com/watch?v=XRe_3T0xH3M&list=PLN5UoEBCJUG4J-EqSQEiLkB7hrrQ-dkYJ&index=9",
    Adapter:
      "https://www.youtube.com/watch?v=TzO25dTvQNo&list=PLN5UoEBCJUG4J-EqSQEiLkB7hrrQ-dkYJ&index=10",
  },

  REPORTS: {
    COMPARISON_REPORT_ID: 1,
    TEAM_REPORT_ID: 2,
    WORK_TALENT_REPORT_ID: 3,
    FINANCIAL_BEHAVIOR_REPORT_ID: 4,
  },

  UNIQUE_STYLES: [
    {
      name: "All",
      value: false,
    },
    {
      name: "Adapter",
      value: false,
      id: 5,
    },
    {
      name: "Initiator",
      value: false,
      id: 6,
    },
    {
      name: "Influencer",
      value: false,
      id: 7,
    },
    {
      name: "Strategist",
      value: false,
      id: 8,
    },
    {
      name: "Engager",
      value: false,
      id: 9,
    },
    {
      name: "Stylish Thinker",
      value: false,
      id: 10,
    },
    {
      name: "Community Builder",
      value: false,
      id: 11,
    },
    {
      name: "Relationship Builder",
      value: false,
      id: 12,
    },
    {
      name: "Facilitator",
      value: false,
      id: 13,
    },
    {
      name: "Reflective Thinker",
      value: false,
      id: 14,
    },
  ],
  STATUSES: [
    {
      name: "All",
      value: false,
    },
    {
      name: "Scheduled",
      value: false,
    },
    {
      name: "In Progress",
      value: false,
    },
    {
      name: "Completed",
      value: false,
    },
  ],
  COMPLETION_DATES: [
    {
      name: "Anytime",
      value: false,
      inputId: "anytime",
    },
    {
      name: "Past Day",
      value: false,
      inputId: "pastDay",
    },
    {
      name: "Past Week",
      value: false,
      inputId: "pastWeek",
    },
    {
      name: "Past Month",
      value: false,
      inputId: "pastMonth",
    },
    {
      name: "Past Year",
      value: false,
      inputId: "pastYear",
    },
    {
      name: "Custom Range",
      value: false,
      inputId: "customRange",
    },
  ],

  LANGUAGES: [
    { id: 22, name: "English" },
    { id: 1, name: "Urdu" },
    { id: 2, name: "Chinese" },
  ],

  REPORT_TYPES: [
    { name: "Financial" },
    { name: "Talent" },
    { name: "Investment" },
  ],
};

export default AppConstants;
