import { createSlice } from "@reduxjs/toolkit";

export type SubscriptionState = {
  trialDaysRemaining: number;
  isTrial: boolean;
  maskedCardNumber: string | null;
};

const initialState: SubscriptionState = {
  trialDaysRemaining: 0,
  isTrial: false,
  maskedCardNumber: null,
};

export const subscriptionSlice = createSlice({
  name: "subscription",
  initialState,
  reducers: {
    setSubscriptionState: (state, action: { payload: SubscriptionState }) => {
      state.trialDaysRemaining = action.payload.trialDaysRemaining;
      state.isTrial = action.payload.isTrial;
      state.maskedCardNumber = action.payload.maskedCardNumber;
    },
    resetSubscriptionState: () => initialState,
  },
});

export const { setSubscriptionState, resetSubscriptionState } =
  subscriptionSlice.actions;

export default subscriptionSlice.reducer;
