"use client";
import { Routes } from "@/constants/routes";
import { useDiscoveryStatus } from "@/hooks/useDiscoveryStatus";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import FullScreenLoader from "../loader";

const CompletedDiscoveryGuard = ({ children }: { children: React.ReactNode }) => {
  const { completed } = useDiscoveryStatus();
  const router = useRouter();

  useEffect(() => {
    if (completed) {
      router.replace(Routes.DISCOVERY_COMPLETED);
    }
  }, [completed, router]);

  if (completed) return <FullScreenLoader />;

  return <>{children}</>;
};

export default CompletedDiscoveryGuard;
