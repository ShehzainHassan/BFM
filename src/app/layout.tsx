"use client";
import { Inter } from "next/font/google";
import styled from "styled-components";
import Navbar from "./components/Navbar/Navbar";
import Sidebar from "./components/Sidebar/Sidebar";
import "./globals.css";
import { DataProvider } from "@/DataContext";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const ContentWrapper = styled("div")`
  display: flex;
  flex-direction: column;
  flex: 1;
  margin-left: 76px;
`;
const MainContent = styled("main")`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 32px;
  overflow: auto;
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

            <MainContent>{children}</MainContent>
          </ContentWrapper>
        </DataProvider>
      </body>
    </html>
  );
}
