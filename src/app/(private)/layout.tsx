"use client";
import { Routes } from "@/constants/routes";
import { RootState } from "@/store";
import { Layout, theme } from "antd";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";
import { useSelector } from "react-redux";
import TrialBanner from "../../components/common/trialBanner";
import Sider from "../../components/sider";
const { Content } = Layout;

const PageLayout = ({ children }: { readonly children: ReactNode }) => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const pathname = usePathname();
  const { trialDaysRemaining, isTrial, maskedCardNumber } = useSelector(
    (state: RootState) => state.subscription,
  );

  const isAssessmentPage =
    pathname === Routes.WORK_TALENTS_REPORT ||
    pathname === Routes.PARTICIPANT_FINANCIAL_REPORT ||
    pathname === Routes.DISCOVERY ||
    pathname === Routes.DISCOVERY_COMPLETED ||
    pathname === Routes.DISCOVERY_INSTRUCTION;

  return (
    <Layout className="site-layout">
      <Sider />
      <Layout>
        <div className={`site-content-wrapper`}>
          {!isAssessmentPage && isTrial && (
            <TrialBanner daysRemaining={trialDaysRemaining} maskedCardNumber={maskedCardNumber} />
          )}
          <Content className={`${isAssessmentPage && "assessment-content"}`}>
            {children}
          </Content>
        </div>
      </Layout>
    </Layout>
  );
};

export default PageLayout;
