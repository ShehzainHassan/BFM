import { BFMPalette } from "@/Theme";
import { H5 } from "@/Typography";
import styled from "styled-components";
import { NavbarProps } from "../../../Interfaces/Interfaces";
import { useData } from "@/DataContext";

const Container = styled("div")`
  display: none;
  @media (max-width: 940px) {
    position: fixed;
    bottom: 0;
    display: flex;
    background-color: ${BFMPalette.white};
    width: 100%;
    height: 100px;
    z-index: 10;

    overflow-x: auto;
  }
`;

const TabContainer = styled("div")<{ $isSelected?: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  min-width: 94px;
  width: 100%;
  gap: 4px;
  background-color: ${({ $isSelected }) =>
    $isSelected ? BFMPalette.purple250 : "transparent"};
  &:hover {
    background-color: ${({ $isSelected }) =>
      !$isSelected ? BFMPalette.purple500 : ""};
  }
  border-bottom: ${({ $isSelected }) =>
    $isSelected ? `2px solid ${BFMPalette.purple500}` : "none"};
`;

const Icon = styled("img")`
  width: 20px;
  height: 20px;
`;

const StyledH5 = styled(H5)<{ $isSelected?: boolean }>`
  color: ${({ $isSelected }) =>
    $isSelected ? BFMPalette.purple1000 : "inherit"};
`;

export default function MobileNav({ navItems }: NavbarProps) {
  const { selectedTab, setSelectedTab } = useData();
  return (
    <Container>
      <>
        {navItems.map(({ label }) => (
          <TabContainer
            key={label}
            $isSelected={selectedTab === label}
            onClick={() => setSelectedTab(label)}>
            <Icon src="/images/bar.png" alt="icon" />
            <StyledH5 $isSelected={selectedTab === label}>{label}</StyledH5>
          </TabContainer>
        ))}
      </>
    </Container>
  );
}
