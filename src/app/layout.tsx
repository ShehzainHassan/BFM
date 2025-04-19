"use client";
import { Inter } from "next/font/google";
import styled from "styled-components";
import Navbar from "./components/Navbar/Navbar";
import Sidebar from "./components/Sidebar/Sidebar";
import "./globals.css";
import { DataProvider, useData } from "@/DataContext";
import MobileNav from "./components/MobileNav/MobileNav";
import useTranslation from "@/translations";
import ContentWrapper from "./components/ContentWrapper/ContentWrapper";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const MainContent = styled("main")`
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 1300px;
  padding: 32px;
  width: 100%;
  overflow: auto;
  @media (max-width: 768px) {
    padding: 16px;
  }
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
