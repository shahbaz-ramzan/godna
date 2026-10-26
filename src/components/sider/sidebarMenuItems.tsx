import { Routes } from "@/constants/routes";
import {
  Activity,
  CreditCard,
  FileText,
  LayoutDashboard,
  Settings,
  Sparkles,
  Users,
  UsersRound,
} from "lucide-react";
import Link from "next/link";

export const sidebarMenuItems = [
  {
    key: Routes.DASHBOARD,
    icon: (
      <span>
        <LayoutDashboard />
      </span>
    ),
    label: <Link href={Routes.DASHBOARD}>Dashboard</Link>,
  },
  {
    key: Routes.DNA_DISCOVERY,
    icon: (
      <span>
        <Sparkles />
      </span>
    ),
    label: <Link href={Routes.DNA_DISCOVERY}>DNA Discovery</Link>,
  },
  {
    key: Routes.REPORT,
    icon: (
      <span>
        <FileText />
      </span>
    ),
    label: <Link href={Routes.REPORT}>My Report</Link>,
  },
  {
    key: Routes.CONTACTS,
    icon: (
      <span>
        <UsersRound />
      </span>
    ),
    label: <Link href={Routes.CONTACTS}>Contacts</Link>,
  },
  {
    key: Routes.MARKET_MOOD,
    icon: (
      <span>
        <Activity />
      </span>
    ),
    label: <Link href={Routes.MARKET_MOOD}>Market Mood</Link>,
  },
  {
    key: Routes.STYLE_MATCH,
    icon: (
      <span>
        <Users />
      </span>
    ),
    label: <Link href={Routes.STYLE_MATCH}>Style Match</Link>,
  },
  {
    key: Routes.SUBSCRIPTION,
    icon: (
      <span>
        <CreditCard />
      </span>
    ),
    label: <Link href={Routes.SUBSCRIPTION}>Subscription</Link>,
  },
  {
    key: Routes.SETTINGS,
    icon: (
      <span>
        <Settings />
      </span>
    ),
    label: <Link href={Routes.SETTINGS}>Settings</Link>,
  },
];
