"use client";
import { BFMPalette } from "@/Theme";
import styled from "styled-components";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { H1 } from "@/Typography";
import NavButton from "../Button/Primary/NavButton";
import i18n from "@/translations";
import { useState } from "react";
import Dashboard from "../Dashboard/Dashboard";
import Analytics from "../Analytics/Analytics";
import Calender from "../Calender/Calender";
import ESG from "../ESG/ESG";
import Invoices from "@/app/invoices/page";
const Container = styled("div")`
  display: flex;
  flex-direction: column;
  background-color: ${BFMPalette.purple1000};
  width: 100%;
  height: 150px;
  gap: 16px;
  padding: 32px;
`;
const SubContainer = styled("div")`
  display: flex;
  align-items: center;
  gap: 8px;
  border-radius: 10px;
  padding: 4px;
  background-color: ${BFMPalette.purple950};
`;

const NavContent = styled("p")<{ $isSelected: boolean }>`
  font-weight: 600;
  line-height: 20px;
  font-size: 14px;
  color: ${BFMPalette.white};
  border-radius: 6px;
  padding: 8px 12px;
  background-color: ${({ $isSelected }) =>
    $isSelected ? BFMPalette.purple500 : "transparent"};
  &:hover {
    background-color: ${({ $isSelected }) =>
      !$isSelected ? BFMPalette.purple1000 : ""};
  }
  cursor: pointer;
`;

const Header = styled("div")`
  display: flex;
  justify-content: space-between;
`;
const ButtonsContainer = styled("div")`
  display: flex;
  gap: 16px;
`;
const MainContainer = styled("div")`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Component = styled("div")`
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 1300px;
  height: 100%;
`;
interface NavbarProps {
  navItems: { label: string }[];
}
export default function Navbar({ navItems }: NavbarProps) {
  const pathname = usePathname();
  const [selectedTab, setSelectedTab] = useState("Dashboard");
  const renderComponent = () => {
    switch (selectedTab) {
      case "Dashboard":
        return <Dashboard />;
      case "Analytics":
        return <Analytics />;
      case "Invoices":
        return <Invoices />;

      case "Calender":
        return <Calender />;
      case "ESG":
        return <ESG />;

      default:
        return <Dashboard />;
    }
  };

  const navButtons =
    pathname === "/calender" || pathname === "/esg"
      ? ["schedule", "create"]
      : pathname === "/invoices"
      ? ["invoice"]
      : [];
  const formattedPath =
    pathname === "/" ? "dashboard" : pathname.replace("/", "");
  const pageTitle = i18n.t(`navbar.${formattedPath}`, {
    defaultValue: "Welcome Back, Mark",
  });
  return (
    <MainContainer>
      <Container>
        <Header>
          <H1 color={BFMPalette.white}>{pageTitle}</H1>
          <ButtonsContainer>
            {navButtons.includes("schedule") && (
              <NavButton
                $textColor={BFMPalette.purple600}
                $bgColor={BFMPalette.white}
                imagePosition="right"
                imageSrc="/images/clock.png">
                {i18n.t("nav_buttons.schedule")}
              </NavButton>
            )}
            {navButtons.includes("create") && (
              <NavButton
                $textColor={BFMPalette.white}
                $borderColor={BFMPalette.purple500}
                $bgColor={BFMPalette.purple500}
                imageSrc="/images/plus.png">
                {i18n.t("nav_buttons.createEvent")}
              </NavButton>
            )}
            {navButtons.includes("invoice") && (
              <NavButton
                $textColor={BFMPalette.white}
                $borderColor={BFMPalette.purple500}
                $bgColor={BFMPalette.purple500}
                imageSrc="/images/plus.png">
                {i18n.t("nav_buttons.createInvoice")}
              </NavButton>
            )}
          </ButtonsContainer>
        </Header>

        <SubContainer>
          {navItems.map(({ label }) => (
            <NavContent
              key={label}
              $isSelected={selectedTab === label}
              onClick={() => setSelectedTab(label)}>
              {label}
            </NavContent>
          ))}
        </SubContainer>
      </Container>
      <Component>{renderComponent()}</Component>
    </MainContainer>
  );
}
