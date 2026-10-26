"use client";

import { PublicClientApplication } from "@azure/msal-browser";
import { MsalProvider } from "@azure/msal-react";
import NextTopLoader from "nextjs-toploader";
import React from "react";
import { Toaster } from "react-hot-toast";
import { msalConfig } from "../helper/msalConfig";
import { Providers } from "../store/storeProvider";

export function AppProviders({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const pca = new PublicClientApplication(msalConfig);
  return (
    <Providers>
      <MsalProvider instance={pca}>
        <NextTopLoader showSpinner={false} />
        <Toaster position="top-right" />
        {children}
      </MsalProvider>
    </Providers>
  );
}
