"use client";
import { Routes } from "@/constants/routes";
import { Layout } from "antd";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

const { Content } = Layout;

const PageLayout = ({ children }: { readonly children: ReactNode }) => {
  const pathname = usePathname();
  const isAuth = pathname === Routes.SIGN_UP;
  const loginPage = pathname === "/login";
  return (
    <Content
      className={`main-content-wrapper ${isAuth && "auth-page"} ${loginPage ? "login-page-wrapper" : ""}`}
    >
      {children}
    </Content>
  );
};

export default PageLayout;
