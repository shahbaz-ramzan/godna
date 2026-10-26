import { LogLevel, Configuration } from "@azure/msal-browser";

/**
 * MSAL configuration object
 */
export const msalConfig: Configuration = {
  auth: {
    clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
    authority: process.env.NEXT_PUBLIC_B2C_1_SIGNIN,
    knownAuthorities: [process.env.NEXT_PUBLIC_MSAL_KNOWN_AUTHORITY],
    redirectUri: typeof window !== "undefined" ? window.location.origin : "",
  },

  cache: {
    cacheLocation: "sessionStorage",
    storeAuthStateInCookie: false,
  },

  system: {
    loggerOptions: {
      loggerCallback: (
        level: LogLevel,
        message: string,
        containsPii: boolean,
      ): void => {
        if (containsPii) return;

        switch (level) {
          case LogLevel.Error:
            console.error(message);
            break;
          case LogLevel.Info:
            console.info(message);
            break;
          case LogLevel.Verbose:
            console.debug(message);
            break;
          case LogLevel.Warning:
            console.warn(message);
            break;
          default:
            break;
        }
      },
    },
  },
};

/**
 * Login request configuration
 */
export const loginRequest: {
  scopes: string[];
} = {
  scopes: ["openid", "profile", "email"],
};
