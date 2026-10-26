"use client";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

import authReducer from "./slices/auth";
import counterReducer from "./slices/counterSlice";
import discoveryReducer from "./slices/discoverySlice";
import reportReducer from "./slices/reportSlice";
import subscriptionReducer from "./slices/subscriptionSlice";

const rootReducer = combineReducers({
  counter: counterReducer,
  auth: authReducer,
  report: reportReducer,
  discovery: discoveryReducer,
  subscription: subscriptionReducer,

  //add all your reducers here
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth", "discovery"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

const persistor = persistStore(store);

export { persistor, store };
