import { WorkTalentTabKey } from "@/constants/report";
import { SummaryTab } from "./tabs/summaryTab";
import { TraitsTab } from "./tabs/traitsTab";
import { PerfomanceKeyTab } from "./tabs/perfomanceKeyTab";
import { CommunicationKeyTab } from "./tabs/communicationKeyTab";

export const WORK_TALENT_TABS = [
  {
    key: WorkTalentTabKey.SUMMARY,
    label: "Summary",
    component: SummaryTab,
  },
  {
    key: WorkTalentTabKey.TRAITS,
    label: "Key Work Traits",
    component: TraitsTab,
  },
  {
    key: WorkTalentTabKey.PERFORMANCE,
    label: "Performance Keys",
    component: PerfomanceKeyTab,
  },
  {
    key: WorkTalentTabKey.COMMUNICATION,
    label: "Communication Keys",
    component: CommunicationKeyTab,
  },
];
