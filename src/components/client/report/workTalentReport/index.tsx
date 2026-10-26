"use client";

import { WorkTalentTabKey } from "@/constants/report";
import { Tabs } from "antd";
import { WORK_TALENT_TABS } from "./workTalentTabs";

interface WorkTalentReportProps {
  loading: boolean;
}

export const WorkTalentReport = ({ loading }: WorkTalentReportProps) => {
  return (
    <Tabs
      size="small"
      centered
      className="thm-tabs"
      defaultActiveKey={WorkTalentTabKey.SUMMARY}
      items={WORK_TALENT_TABS.map(({ key, label, component: Component }) => ({
        key,
        label,
        children: <Component loading={loading} />,
      }))}
    />
  );
};
