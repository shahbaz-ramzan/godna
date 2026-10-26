"use client";

import { FinancialBehaviorTabKey } from "@/constants/report";
import { Tabs } from "antd";
import { FINANCIAL_BEHAVIOR_TABS } from "./financialBehaviorTabs";

export const FinancialBehaviorReport = () => {
  return (
    <Tabs
      size="small"
      centered
      className="thm-tabs"
      defaultActiveKey={FinancialBehaviorTabKey.SUMMARY}
      items={FINANCIAL_BEHAVIOR_TABS.map(
        ({ key, label, component: Component }) => ({
          key,
          label,
          children: <Component />,
        }),
      )}
    />
  );
};
