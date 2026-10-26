import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  uniqueStyleAndDescription: null,
  performanceGuideArray: null,
  bdna5Scores: null,
  fdna5Scores: null,
  careersInsights: null,
  strongestFactor: null,
  FinancialBehaviorReportSummary: null,
  behavioralBiases: null,
  tscoreData: null,
};

export const reportSlice = createSlice({
  name: "report",
  initialState,
  reducers: {
    setUniqueStyleAndDescription: (state, action) => {
      state.uniqueStyleAndDescription = action.payload;
    },
    setPerformanceGuideArray: (state, action) => {
      state.performanceGuideArray = action.payload;
    },
    setBDNA5Scores: (state, action) => {
      state.bdna5Scores = action.payload;
    },
    setFDNA5Scores: (state, action) => {
      state.fdna5Scores = action.payload;
    },
    setCareersInsights: (state, action) => {
      state.careersInsights = action.payload;
    },
    setStrongestFactor: (state, action) => {
      state.strongestFactor = action.payload;
    },
    setTscoreData: (state, action) => {
      state.tscoreData = action.payload;
    },
    setFinancialBehaviorReportSummary: (state, action) => {
      state.FinancialBehaviorReportSummary = action.payload;
    },
    setBehavioralBiases: (state, action) => {
      state.behavioralBiases = action.payload;
    },
    clearReportData: (state) => {
      state.uniqueStyleAndDescription = null;
      state.performanceGuideArray = null;
      state.bdna5Scores = null;
      state.fdna5Scores = null;
      state.careersInsights = null;
      state.strongestFactor = null;
      state.FinancialBehaviorReportSummary = null;
      state.behavioralBiases = null;
      state.tscoreData = null;
    },
  },
});

export const {
  setUniqueStyleAndDescription,
  setPerformanceGuideArray,
  setBDNA5Scores,
  setFDNA5Scores,
  setCareersInsights,
  setStrongestFactor,
  setFinancialBehaviorReportSummary,
  setBehavioralBiases,
  setTscoreData,
  clearReportData,
} = reportSlice.actions;

export default reportSlice.reducer;
