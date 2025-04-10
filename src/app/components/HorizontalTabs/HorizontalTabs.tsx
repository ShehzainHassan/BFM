import { BFMPalette } from "@/Theme";
import styled from "styled-components";
import { HorizontalTabProps } from "../../../../Interfaces";

const TabContainer = styled.div<{ $tabType: "button" | "tab" }>`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: ${({ $tabType }) => ($tabType === "button" ? "4px" : "0px")};
  background-color: ${BFMPalette.white25};
  border-radius: ${({ $tabType }) => ($tabType === "button" ? "1000px" : "0")};
  border: ${({ $tabType }) =>
    $tabType === "button" ? `1px solid ${BFMPalette.gray100}` : "none"};
  border-bottom: ${({ $tabType }) =>
    $tabType === "tab" ? `1px solid ${BFMPalette.gray100}` : ""};
`;

const Tab = styled.button<{ $isActive: boolean; $tabType: "button" | "tab" }>`
  padding: 8px 12px;
  cursor: pointer;
  font-weight: 600;
  border: none;
  outline: none;
  transition: background-color 0.3s ease-in-out, border-bottom 0.3s ease-in-out,
    color 0.3s ease-in-out;
  border-radius: ${({ $tabType }) => ($tabType === "button" ? "1000px" : "0")};

  ${({ $isActive, $tabType }) =>
    $tabType === "button"
      ? `
        background-color: ${$isActive ? BFMPalette.purple800 : "transparent"};
        color: ${$isActive ? BFMPalette.white : BFMPalette.black100};

        &:hover {
          background-color: ${
            $isActive ? BFMPalette.purple800 : BFMPalette.purple200
          };
        }
      `
      : `
        background-color: ${$isActive ? BFMPalette.white25 : "transparent"};
        color: ${$isActive ? BFMPalette.purple500 : BFMPalette.gray700};
        border-bottom: ${
          $isActive ? `2px solid ${BFMPalette.purple500}` : "none"
        };

        &:hover {
          background-color: ${
            $isActive ? BFMPalette.white25 : BFMPalette.purple200
          };
          border-radius: ${!$isActive ? "12px" : ""}
          }
      `}
`;

export default function HorizontalTabs({
  tabs,
  selectedTab,
  tabType = "button",
  onTabChange,
}: HorizontalTabProps) {
  return (
    <TabContainer $tabType={tabType}>
      {tabs.map((tab) => (
        <Tab
          key={tab}
          $isActive={selectedTab === tab}
          $tabType={tabType}
          onClick={() => onTabChange(tab)}>
          {tab}
        </Tab>
      ))}
    </TabContainer>
  );
}
