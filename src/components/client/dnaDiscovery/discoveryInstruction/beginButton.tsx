"use client";

import { Routes } from "@/constants/routes";
import { Button } from "antd";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const BeginButton = () => {
  const router = useRouter();

  useEffect(() => {
    router.prefetch(Routes.DISCOVERY);
  }, [router]);

  return (
    <Button
      type="primary"
      className="thm-btn"
      onClick={() => router.push(Routes.DISCOVERY)}
    >
      Begin Discovery
    </Button>
  );
};

export default BeginButton;
