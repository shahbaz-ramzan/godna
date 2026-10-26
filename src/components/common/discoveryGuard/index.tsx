"use client";
import { Routes } from "@/constants/routes";
import { useDiscoveryStatus } from "@/hooks/useDiscoveryStatus";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import FullScreenLoader from "../loader";

const DiscoveryGuard = ({ children }: { children: React.ReactNode }) => {
  const { completed } = useDiscoveryStatus();
  const router = useRouter();

  useEffect(() => {
    if (!completed) {
      router.replace(Routes.DASHBOARD);
    }
  }, [completed, router]);

  if (!completed) return <FullScreenLoader />;

  return <>{children}</>;
};

export default DiscoveryGuard;
