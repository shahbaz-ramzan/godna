import { ConfigProvider } from "antd";
import { ReactNode } from "react";
const config = {
  colorPrimary: "#287850",
  fontFamily: "'Inter', 'Segoe UI',Roboto,'Helvetica Neue',Arial,'Noto Sans',sans-serif,'Apple Color Emoji','Segoe UI Emoji','Segoe UI Symbol','Noto Color Emoji' ",
};

export default function ThemeProvider({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <ConfigProvider
      theme={{
        token: config,
        components: {
          Layout: {
            fontFamily:
              "'Inter', 'Segoe UI',Roboto,'Helvetica Neue',Arial,'Noto Sans',sans-serif,'Apple Color Emoji','Segoe UI Emoji','Segoe UI Symbol','Noto Color Emoji' ",
          },
          Button: {
            borderRadius: 100,
            controlHeight: 48,
            controlHeightLG: 58,
            controlHeightSM: 40,
            colorTextSecondary: "#0d0c0c",
            fontSize: 16,
            fontWeight: 400,
            defaultHoverColor: "#fff",
            defaultColor: "#fff",
            defaultHoverBorderColor: "#fff3",
            primaryShadow: "none",
          },
          Input: {
            activeShadow: "none",
            boxShadow: "none",
          },

          Select: {
            boxShadow: "none",
            boxShadowSecondary: "none",
            boxShadowTertiary: "none",
          },
        },
      }}
    >
      {children}
    </ConfigProvider>
  );
}
