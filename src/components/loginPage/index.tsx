"use client";
import AppConstants from "@/constants/app-constants";
import { STORAGE_KEYS } from "@/constants/localStorageKeys";
import { Routes } from "@/constants/routes";
import { getAccountSubscriptionDetailsApi } from "@/network/apis/subscription";
import {
  getAllAccountsByPersonIdApi,
  getParticipantDetailsApi,
} from "@/network/apis/user";
import {
  clearLocalStorage,
  getLocalStorageItem,
  setLocalStorageItem,
} from "@/utils/localStorage";
import { useMsal } from "@azure/msal-react";
import { setCookie } from "cookies-next";
import { message } from "antd";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import FullScreenLoader from "../common/loader";
import ReactivationModal from "../modals/reactivationModal";
import WrongPlaceInfoModal from "../modals/wrongPlaceInfoModal";
import LoginSection from "./loginSection";

const LoginPage = () => {
  const router = useRouter();
  const { instance, accounts } = useMsal();
  // If MSAL already has a cached account on mount (e.g. reload while still
  // signed in), start with the loader up instead of flashing LoginSection
  // for a frame before the [accounts] effect below turns it on.
  const [loading, setLoading] = useState(() => accounts.length > 0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [subscriptionDetails, setSubscriptionDetails] = useState<any>(null);
  const [accountID, setAccountID] = useState<string | null>(null);
  const [subscriptionInfoModalOpen, setSubscriptionInfoModalOpen] =
    useState(false);
  const [hasSignedUp, setHasSignedUp] = useState(false);
  const [loginPending, setLoginPending] = useState(false);

  useEffect(() => {
    const value = getLocalStorageItem(STORAGE_KEYS.HAS_SIGNED_UP);
    setHasSignedUp(value === "true");

    router.prefetch(Routes.SIGN_UP);
  }, []);

  useEffect(() => {
    if (accounts.length) {
      const account = accounts[0];
      const personId = account?.idTokenClaims?.oid ?? "";
      setLocalStorageItem(STORAGE_KEYS.PERSON_ID, personId);
      setLocalStorageItem(STORAGE_KEYS.LOGGED_PERSON_NAME, account?.name ?? "");
      setCookie("token", account?.idToken ?? "");
      if (personId) {
        fetchAccounts(personId);
      }
    }
  }, [accounts]);

  const handleLogin = async () => {
    setLoginPending(true);
    try {
      await instance.loginPopup({
        scopes: ["openid", "profile", "email"],
      });
      // On success, the [accounts] effect below picks up and drives the
      // full-screen loader from here — leave loginPending on until then.
    } catch (error) {
      console.error("Login failed:", error);
      message.error("Login failed. Please try again.");
      setLoginPending(false);
    }
  };

  const fetchAccounts = async (personId: string) => {
    setLoading(true);
    try {
      const response = await getAllAccountsByPersonIdApi(personId);
      const accountId = response?.data?.namedUserAccountDtos?.[0]?.accountId;

      if (!response?.data || !accountId) {
        console.error("No account found for person:", personId);
        handleLogout(
          "We couldn't find an account for this login. Please try again.",
        );
        return;
      }

      setAccountID(accountId);
      setLocalStorageItem(STORAGE_KEYS.ACCOUNT_ID, accountId);
      const payload = {
        accountId,
        participants: [{ personId: response?.data?.personID }],
      };

      await fetchParticipantDetails(payload, accountId);
    } catch (error) {
      console.error("Failed to fetch accounts:", error);
      handleLogout("Something went wrong while signing you in. Please try again.");
    }
  };

  const fetchParticipantDetails = async (payload: any, accountId: string) => {
    try {
      const response = await getParticipantDetailsApi(payload);

      if (!response?.data) {
        console.error("No participant details returned for account:", accountId);
        handleLogout("Something went wrong while signing you in. Please try again.");
        return;
      }

      if (response.data?.[0]?.accountType === AppConstants.ACCOUNT_TYPE) {
        setLocalStorageItem(STORAGE_KEYS.PARTICIPANT_DETAILS, response.data);
        await getAccountSubscriptionDetails(accountId);
      } else {
        setLoading(false);
        setIsModalOpen(true);
      }
    } catch (error) {
      console.error("Failed to fetch participant details:", error);
      handleLogout("Something went wrong while signing you in. Please try again.");
    }
  };

  const getAccountSubscriptionDetails = async (accountId: string) => {
    try {
      const response: any = await getAccountSubscriptionDetailsApi(accountId);

      if (!response?.data) {
        console.error("No subscription details returned for account:", accountId);
        handleLogout("Something went wrong while signing you in. Please try again.");
        return;
      }

      setSubscriptionDetails(response.data);
      const isActive = response.data?.subscriptionState;

      if (isActive) {
        // Keep the loader up while router.push navigates — it only starts
        // the (async) route transition, so clearing loading here would
        // unmount the overlay and flash the still-mounted LoginSection
        // underneath before the dashboard route finishes loading.
        router.push(Routes.DASHBOARD);
        return;
      }

      setSubscriptionInfoModalOpen(true);
      setLoading(false);
    } catch (error) {
      console.error("Failed to get subscription details:", error);
      handleLogout("Something went wrong while signing you in. Please try again.");
    }
  };

  const handleSignUp = () => {
    router.push(Routes.SIGN_UP);
  };

  const handleLogout = async (errorMessage?: string) => {
    if (errorMessage) message.error(errorMessage);
    setLoading(false);
    setCookie("token", "");
    clearLocalStorage();
    sessionStorage.clear();
    await instance.logoutRedirect({
      postLogoutRedirectUri: window.location.origin + Routes.LOGIN,
    });
  };

  return (
    <section className="login-hero-section">
      {loading && <FullScreenLoader />}

      <LoginSection
        handleSignUp={handleSignUp}
        handleLogin={handleLogin}
        hasSignedUp={hasSignedUp}
        loginPending={loginPending}
      />
      <ReactivationModal
        open={subscriptionInfoModalOpen}
        accountId={accountID}
        maskedCardNumber={subscriptionDetails?.maskedCardNumber ?? null}
        subscriptionName={subscriptionDetails?.subscriptionName ?? null}
        productPrice={subscriptionDetails?.productPrice ?? null}
        subscriptionUrl={subscriptionDetails?.url ?? null}
        onClose={() => handleLogout()}
        onSuccess={() => setSubscriptionInfoModalOpen(false)}
      />
      <WrongPlaceInfoModal
        handleLogout={() => handleLogout()}
        setIsModalOpen={setIsModalOpen}
        isModalOpen={isModalOpen}
      />
    </section>
  );
};

export default LoginPage;
