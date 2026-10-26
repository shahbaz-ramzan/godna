import { FinancialBehaviorTabKey } from "@/constants/report";
import SummaryTab from "./tabs/summaryTab";
import TraitsTab from "./tabs/traitsTab";
import InvestmentTab from "./tabs/investmentTab";
import CommunicationTab from "./tabs/communicationTab";

export const FINANCIAL_BEHAVIOR_TABS = [
  {
    key: FinancialBehaviorTabKey.SUMMARY,
    label: "Summary",
    component: SummaryTab,
  },
  {
    key: FinancialBehaviorTabKey.TRAITS,
    label: "Key Traits",
    component: TraitsTab,
  },
  {
    key: FinancialBehaviorTabKey.INVESTMENT,
    label: "Behavioral Biases",
    component: InvestmentTab,
  },
  {
    key: FinancialBehaviorTabKey.COMMUNICATION,
    label: "Communication Keys",
    component: CommunicationTab,
  },
];
