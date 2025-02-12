"use client";
import { Content, Inter } from "next/font/google";
import "./globals.css";
import Sidebar from "./components/Sidebar/Sidebar";
import Navbar from "./components/Navbar/Navbar";
import styled from "styled-components";

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
        <ContentWrapper>
          <Navbar
            navItems={[
              { label: "Dashboard", path: "/" },
              { label: "Analytics", path: "/analytics" },
              { label: "Invoices", path: "/invoices" },
              { label: "Calender", path: "/calender" },
              { label: "ESG", path: "/esg" },
            ]}
          />
          <MainContent>{children}</MainContent>
        </ContentWrapper>
      </body>
    </html>
  );
}
