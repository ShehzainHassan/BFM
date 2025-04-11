"use client";
import { Inter } from "next/font/google";
import styled from "styled-components";
import Navbar from "./components/Navbar/Navbar";
import Sidebar from "./components/Sidebar/Sidebar";
import "./globals.css";
import { DataProvider } from "@/DataContext";
import MobileNav from "./components/MobileNav/MobileNav";
import useTranslation from "@/translations";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const ContentWrapper = styled("div")`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-left: 76px;
  @media (max-width: 1023px) {
    margin-left: unset;
  }
`;
const MainContent = styled("main")`
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 1300px;
  padding: 32px;
  width: 100%;
  overflow: auto;
  @media (max-width: 1023px) {
    display: unset;
    max-width: unset;
    justify-content: unset;
  }
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { t } = useTranslation();
  return (
    <html lang="en" className={inter.variable}>
      <body>
        <Sidebar />
        <DataProvider>
          <ContentWrapper>
            <Navbar
              navItems={[
                { label: t("navbar.tabs.dashboard") },
                { label: t("navbar.tabs.analytics") },
                { label: t("navbar.tabs.invoices") },
                { label: t("navbar.tabs.calendar") },
                { label: t("navbar.tabs.esg") },
              ]}
            />
            <MobileNav
              navItems={[
                { label: t("navbar.tabs.dashboard") },
                { label: t("navbar.tabs.transactions") },
                { label: t("navbar.tabs.analytics") },
                { label: t("navbar.tabs.invoices") },
                { label: t("navbar.tabs.calendar") },
                { label: t("navbar.tabs.esg") },
              ]}
            />

            <MainContent>{children}</MainContent>
          </ContentWrapper>
        </DataProvider>
      </body>
    </html>
  );
}
