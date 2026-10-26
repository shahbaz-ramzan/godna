"use client";

import AppConstants from "@/constants/app-constants";
import { STORAGE_KEYS } from "@/constants/localStorageKeys";
import { Routes } from "@/constants/routes";
import { useAccountId } from "@/hooks/useAccountId";
import { useDiscoveryStatus } from "@/hooks/useDiscoveryStatus";
import { useLoggedPersonId } from "@/hooks/useLoggedPersonId";
import { getAccountSubscriptionDetailsApi } from "@/network/apis/subscription";
import { getParticipantDetailsApi } from "@/network/apis/user";
import { AppDispatch } from "@/store";
import { resetDiscoveryStatus } from "@/store/slices/discoverySlice";
import {
  resetSubscriptionState,
  setSubscriptionState,
} from "@/store/slices/subscriptionSlice";
import { clearLocalStorage, setLocalStorageItem } from "@/utils/localStorage";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { useMsal } from "@azure/msal-react";
import { Layout } from "antd";
import { setCookie } from "cookies-next";
import dayjs from "dayjs";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import siteLogo from "../../assets/images/logo.png";
import FullScreenLoader from "../common/loader";
import ReactivationModal from "../modals/reactivationModal";
import WrongPlaceInfoModal from "../modals/wrongPlaceInfoModal";
import SidebarFooter from "./sidebarFooter";
import SidebarMenu from "./sidebarMenu";
import { sidebarMenuItems } from "./sidebarMenuItems";

const { Sider } = Layout;

const ThmSider = () => {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(() =>
    typeof globalThis.window !== "undefined"
      ? globalThis.window.innerWidth < 1024
      : false,
  );
  const { instance } = useMsal();
  const [loading, setLoading] = useState(false);
  const { completed } = useDiscoveryStatus();
  const dispatch = useDispatch<AppDispatch>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const accountId = useAccountId();
  const personId = useLoggedPersonId();
  const [subscriptionDetails, setSubscriptionDetails] = useState<any>(null);
  const [subscriptionInfoModalOpen, setSubscriptionInfoModalOpen] =
    useState(false);
  const [isMobile, setIsMobile] = useState(() =>
    typeof globalThis.window !== "undefined"
      ? global.window.innerWidth < 1024
      : false,
  );

  useEffect(() => {
    if (accountId && personId) {
      const payload = {
        accountId,
        participants: [{ personId: personId }],
      };
      fetchParticipantDetails(payload, accountId);
    }
  }, [accountId, personId]);

  const menuItems = useMemo(() => {
    if (completed) {
      return sidebarMenuItems.filter(
        (item) => item.key !== Routes.DNA_DISCOVERY,
      );
    } else {
      return sidebarMenuItems.filter(
        (item) => item.key !== Routes.REPORT && item.key !== Routes.STYLE_MATCH,
      );
    }
  }, [completed]);

  // Selected menu key
  const selectedKey = () => {
    const matched = sidebarMenuItems.find(
      (item) => pathname === item.key || pathname.startsWith(item.key + "/"),
    );
    return matched ? [matched.key] : [Routes.DASHBOARD];
  };

  const fetchParticipantDetails = async (payload: any, accountId: string) => {
    try {
      const response = await getParticipantDetailsApi(payload);
      if (response?.data) {
        if (response?.data?.[0]?.accountType === AppConstants.ACCOUNT_TYPE) {
          setLocalStorageItem(STORAGE_KEYS.PARTICIPANT_DETAILS, response.data);
          getAccountSubscriptionDetails(accountId);
        } else {
          setIsModalOpen(true);
        }
      }
    } catch (error) {
      console.error("Failed to fetch participant details:", error);
    }
  };
  const getAccountSubscriptionDetails = async (accountId: string) => {
    try {
      const response: any = await getAccountSubscriptionDetailsApi(accountId);
      if (response?.data) {
        setSubscriptionDetails(response.data);
        const isActive = response.data?.subscriptionState;

        const isTrial = !!response.data?.trialEndedAt;
        const trialDaysRemaining =
          isTrial && response.data?.trialEndedAt
            ? Math.max(
                dayjs(response.data.trialEndedAt).diff(dayjs(), "day"),
                0,
              )
            : 0;

        const maskedCardNumber = response.data?.maskedCardNumber ?? null;
        dispatch(
          setSubscriptionState({
            trialDaysRemaining,
            isTrial,
            maskedCardNumber,
          }),
        );

        if (!isActive) {
          setSubscriptionInfoModalOpen(true);
        }
      }
    } catch (error) {
      console.error("Failed to get subscription details:", error);
      handleLogout();
    }
  };

  const handleLogout = async () => {
    setLoading(true);
    try {
      dispatch(resetDiscoveryStatus());
      dispatch(resetSubscriptionState());
      setCookie("token", "");
      clearLocalStorage();
      sessionStorage.clear();
      instance.clearCache();
      await instance.logoutRedirect({
        postLogoutRedirectUri: globalThis.location.origin + Routes.LOGIN,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleMenuClick = () => {
    if (isMobile) {
      setCollapsed(true);
    }
  };

  return (
    <>
      {loading && <FullScreenLoader />}

      {!collapsed && (
        <div
          className="overlay-shadow show"
          onClick={() => setCollapsed(true)}
        ></div>
      )}

      <Sider
        collapsed={collapsed}
        collapsible
        breakpoint="lg"
        width={collapsed ? 0 : 255}
        onCollapse={setCollapsed}
        onBreakpoint={setIsMobile}
        trigger={collapsed ? <RightOutlined /> : <LeftOutlined />}
        className="thm-sider"
      >
        <div className="sider-logo">
          <Link href={Routes.DASHBOARD}>
            <Image src={siteLogo} alt="Site logo" width={105} height={40} />
          </Link>
        </div>

        <div className="sider-content">
          <SidebarMenu
            menuItems={menuItems}
            selectedKey={selectedKey()}
            onMenuClick={handleMenuClick}
          />
        </div>

        <div className="sider-footer">
          <SidebarFooter onLogout={handleLogout} />
        </div>
        <WrongPlaceInfoModal
          handleLogout={handleLogout}
          setIsModalOpen={setIsModalOpen}
          isModalOpen={isModalOpen}
        />
        <ReactivationModal
          open={subscriptionInfoModalOpen}
          accountId={accountId}
          maskedCardNumber={subscriptionDetails?.maskedCardNumber ?? null}
          subscriptionName={subscriptionDetails?.subscriptionName ?? null}
          productPrice={subscriptionDetails?.productPrice ?? null}
          subscriptionUrl={subscriptionDetails?.url ?? null}
          onClose={handleLogout}
          onSuccess={() => setSubscriptionInfoModalOpen(false)}
        />
      </Sider>
    </>
  );
};

export default ThmSider;
