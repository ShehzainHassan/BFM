"use client";
import { BFMPalette } from "@/Theme";
import styled from "styled-components";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { H1 } from "@/Typography";
import NavButton from "../Button/Primary/NavButton";

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
interface NavbarProps {
  navItems: { label: string; path: string }[];
}
export default function Navbar({ navItems }: NavbarProps) {
  const pathname = usePathname();

  const titleMapping: Record<string, string> = {
    "/": "Welcome Back, Mark",
    "/analytics": "Welcome Back, Mark",
    "/invoices": "Invoices",
    "/calender": "Business Calender",
    "/esg": "ESG",
  };

  const navButtons =
    pathname === "/calender" || pathname === "/esg"
      ? ["schedule", "create"]
      : pathname === "/invoices"
      ? ["invoice"]
      : [];
  const pageTitle = titleMapping[pathname] || "Welcome Back, Mark";
  return (
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
              Schedule Event
            </NavButton>
          )}
          {navButtons.includes("create") && (
            <NavButton
              $textColor={BFMPalette.white}
              $borderColor={BFMPalette.purple500}
              $bgColor={BFMPalette.purple500}
              imageSrc="/images/plus.png">
              Create New Event
            </NavButton>
          )}
          {navButtons.includes("invoice") && (
            <NavButton
              $textColor={BFMPalette.white}
              $borderColor={BFMPalette.purple500}
              $bgColor={BFMPalette.purple500}
              imageSrc="/images/plus.png">
              Create New Invoice
            </NavButton>
          )}{" "}
        </ButtonsContainer>
      </Header>

      <SubContainer>
        {navItems.map(({ label, path }) => (
          <Link key={path} href={path} passHref>
            <NavContent $isSelected={pathname === path}>{label}</NavContent>
          </Link>
        ))}
      </SubContainer>
    </Container>
  );
}
