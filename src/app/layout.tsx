"use client";
import { Inter } from "next/font/google";
import styled from "styled-components";
import Navbar from "./components/Navbar/Navbar";
import Sidebar from "./components/Sidebar/Sidebar";
import "./globals.css";
import { DataProvider } from "@/DataContext";
import MobileNav from "./components/MobileNav/MobileNav";

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
  @media (max-width: 768px) {
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
  @media (max-width: 768px) {
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
  return (
    <html lang="en" className={inter.variable}>
      <body>
        <Sidebar />
        <DataProvider>
          <ContentWrapper>
            <Navbar
              navItems={[
                { label: "Dashboard" },
                { label: "Analytics" },
                { label: "Invoices" },
                { label: "Calendar" },
                { label: "ESG" },
              ]}
            />
            <MobileNav
              navItems={[
                { label: "Dashboard" },
                { label: "Analytics" },
                { label: "Invoices" },
                { label: "Calendar" },
                { label: "ESG" },
              ]}
            />

            <MainContent>{children}</MainContent>
          </ContentWrapper>
        </DataProvider>
      </body>
    </html>
  );
}
