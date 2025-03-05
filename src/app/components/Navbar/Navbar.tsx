"use client";
import Invoices from "@/app/invoices/page";
import { BFMPalette } from "@/Theme";
import useTranslation from "@/translations";
import { H1 } from "@/Typography";
import { usePathname } from "next/navigation";
import { useState } from "react";
import styled from "styled-components";
import Analytics from "../Analytics/Analytics";
import NavButton from "../Button/Primary/NavButton";
import Calender from "../Calender/Calender";
import Dashboard from "../Dashboard/Dashboard";
import ESG from "../ESG/ESG";
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
  const { t } = useTranslation();
  const [selectedTab, setSelectedTab] = useState(t("navbar.tabs.dashboard"));
  const renderComponent = () => {
    switch (selectedTab) {
      case t("navbar.tabs.dashboard"):
        return <Dashboard />;
      case t("navbar.tabs.analytics"):
        return <Analytics />;
      case t("navbar.tabs.invoices"):
        return <Invoices />;

      case t("navbar.tabs.calendar"):
        return <Calender />;
      case t("navbar.tabs.esg"):
        return <ESG />;
      default:
        return <Dashboard />;
    }
  };
  const getPageTitle = () => {
    if (
      selectedTab === t("navbar.tabs.dashboard") ||
      selectedTab === t("navbar.tabs.analytics")
    )
      return t("navbar.titles.dashboard");
    if (selectedTab === t("navbar.tabs.invoices"))
      return t("navbar.titles.invoices");
    if (selectedTab === t("navbar.tabs.calendar"))
      return t("navbar.titles.calendar");
    if (selectedTab === t("navbar.tabs.esg")) return t("navbar.titles.esg");
    return "Page Title";
  };
  const pageTitle = getPageTitle();
  return (
    <MainContainer>
      <Container>
        <Header>
          <H1 color={BFMPalette.white}>{pageTitle}</H1>
          <ButtonsContainer>
            {(selectedTab === t("navbar.tabs.calendar") ||
              selectedTab === t("navbar.tabs.esg")) && (
              <NavButton
                $textColor={BFMPalette.purple600}
                $bgColor={BFMPalette.white}
                imagePosition="right"
                imageSrc="/images/clock.png">
                {t("nav_buttons.schedule")}
              </NavButton>
            )}
            {(selectedTab === t("navbar.tabs.calendar") ||
              selectedTab === t("navbar.tabs.esg")) && (
              <NavButton
                $textColor={BFMPalette.white}
                $borderColor={BFMPalette.purple500}
                $bgColor={BFMPalette.purple500}
                imageSrc="/images/plus.png">
                {t("nav_buttons.createEvent")}
              </NavButton>
            )}
            {selectedTab === t("navbar.tabs.invoices") && (
              <NavButton
                $textColor={BFMPalette.white}
                $borderColor={BFMPalette.purple500}
                $bgColor={BFMPalette.purple500}
                imageSrc="/images/plus.png">
                {t("nav_buttons.createInvoice")}
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
