import { createSlice } from "@reduxjs/toolkit";

export type DiscoveryStatusState = {
  completed: boolean;
  inProgress: boolean;
  scheduled: boolean;
};

const initialState: DiscoveryStatusState = {
  completed: false,
  inProgress: false,
  scheduled: false,
};

export const discoverySlice = createSlice({
  name: "discovery",
  initialState,
  reducers: {
    setDiscoveryStatus: (state, action: { payload: DiscoveryStatusState }) => {
      state.completed = action.payload.completed ?? state.completed;
      state.inProgress = action.payload.inProgress ?? state.inProgress;
      state.scheduled = action.payload.scheduled ?? state.scheduled;
    },

    resetDiscoveryStatus: () => initialState,
  },
});

export const { setDiscoveryStatus, resetDiscoveryStatus } =
  discoverySlice.actions;

export default discoverySlice.reducer;
