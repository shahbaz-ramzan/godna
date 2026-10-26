"use client";

import { Routes } from "@/constants/routes";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * Routes (and their nested paths) where the chatbot widget should be hidden.
 * Add more prefixes here to hide the widget on other pages.
 */
const HIDDEN_ROUTE_PREFIXES: readonly string[] = [
  Routes.REPORT,
  Routes.DISCOVERY,
  Routes.LOGIN,
  Routes.SIGN_UP,
];

const BODY_ATTR = "data-chatbot-hidden";

export function ChatbotController() {
  const pathname = usePathname();

  useEffect(() => {
    const isHidden = HIDDEN_ROUTE_PREFIXES.some(
      (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`),
    );

    if (isHidden) {
      document.body.setAttribute(BODY_ATTR, "true");
    } else {
      document.body.removeAttribute(BODY_ATTR);
    }

    return () => {
      document.body.removeAttribute(BODY_ATTR);
    };
  }, [pathname]);

  return null;
}
