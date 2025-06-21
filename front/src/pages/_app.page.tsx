// import "@/shared/styles/globals.scss";
import "./globals.css";
import theme from "@/shared/theme";
import { ConfigProvider } from "antd";
import type { AppProps } from "next/app";
import { ThemeProvider } from "styled-components";

import pt_Br from "antd/lib/locale/pt_BR";

import { MenuProvider } from "@/shared/hooks/menu";
import { AuthProvider } from "@/context/AuthContext";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <ConfigProvider
        locale={pt_Br}
        theme={{
          token: {
            colorIcon: `${theme.colors.colorPrimary}`,
            colorPrimary: `${theme.colors.colorPrimary}`,
            // colorBgContainer: "transparent",
          },
          components: {
            DatePicker: {
              borderRadius: 15,
              fontFamily: theme.fonts.family.principal,
              fontSize: theme.fonts.sizes.small,
            },
            Select: {
              borderRadius: 15,
              fontFamily: theme.fonts.family.principal,
              fontSize: theme.fonts.sizes.small,
              boxShadow:
                "10 6px 16px 10 rgba(0, 0, 0, 0.08), 10 3px 6px -4px rgba(0, 0, 0, 0.12), 10 9px 28px 8px rgba(0, 0, 0, 0.05)",
            },
            Input: {
              borderRadius: 15,
              fontFamily: theme.fonts.family.principal,
              fontSize: theme.fonts.sizes.small,
            },
            InputNumber: {
              borderRadius: 15,
              fontFamily: theme.fonts.family.principal,
              fontSize: theme.fonts.sizes.small,
            },
            Button: {
              borderRadius: 15,
              fontFamily: "Lexend, sans-serif",
              fontSize: theme.fonts.sizes.small,
            },
            Table: {
              borderRadius: 15,
            },
            Layout: {
              colorBgBody: theme.colors.backGeral,
              colorBgHeader: "transparent important",
              colorBgBase: "transparent important",
              colorBgLayout: "transparent important",
              // colorBgTrigger: "transparent important",
              colorTextLightSolid: theme.colors.colorPrimary,
            },
            Menu: {
              // colorBgBase: "#ff4d4f",
              colorBgContainer: "transparent important",
              colorItemBg: "transparent important",
              colorItemText: theme.colors.menu.textColor,
              colorItemTextHover: theme.colors.menu.textColorSelected,
              colorItemTextSelected: theme.colors.menu.textColorSelected,
              itemSelectedBg: "#5c4ec916",
              fontFamily: theme.fonts.family.principal,
              colorBgElevated: theme.colors.backMenuFlutuante,
              itemSelectedColor: "#fff",
            },

            Statistic: {
              contentFontSize: 40,
              titleFontSize: 16,
            },
            Tag: {
              borderRadiusSM: 40,
              fontFamily: theme.fonts.family.principal,
              fontSizeSM: 11.5,
            },
          },
        }}
      >
        <AuthProvider>
          <MenuProvider>
            <Component {...pageProps} />
          </MenuProvider>
        </AuthProvider>
      </ConfigProvider>
    </ThemeProvider>
  );
}
