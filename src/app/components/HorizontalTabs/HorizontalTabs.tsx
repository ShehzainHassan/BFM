"use client";
import { BFMPalette } from "@/Theme";
import { useEffect, useState } from "react";
import styled from "styled-components";

const TabContainer = styled("div")<{ $tabType: "button" | "tab" }>`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: ${({ $tabType }) => ($tabType === "button" ? "4px" : "0px")};
  background-color: ${BFMPalette.white25};
  border-radius: ${({ $tabType }) => ($tabType === "button" ? "1000px" : "0")};
  border: ${({ $tabType }) =>
    $tabType === "button" ? `1px solid ${BFMPalette.gray100}` : `none`};
  border-bottom: ${({ $tabType }) =>
    $tabType === "tab" ? `1px solid ${BFMPalette.gray100}` : ""};
`;

const TabContent = styled("p")<{
  $isSelected: boolean;
  $tabType: "button" | "tab";
}>`
  padding: 8px 12px;
  cursor: pointer;
  font-weight: 600;
  ${({ $tabType, $isSelected }) =>
    $tabType === "button"
      ? `
        border-radius: 1000px;
        background-color: ${$isSelected ? BFMPalette.purple800 : "transparent"};
        color: ${$isSelected ? BFMPalette.white : BFMPalette.black100};
         &:hover {
          background-color: ${!$isSelected ? BFMPalette.purple200 : ""};
        }
      `
      : `
        background-color: ${$isSelected ? BFMPalette.white25 : "transparent"};
        color: ${$isSelected ? BFMPalette.purple500 : BFMPalette.gray700};
  border-bottom: ${$isSelected ? `1px solid ${BFMPalette.purple500}` : ""};
         &:hover {
          background-color: ${!$isSelected ? BFMPalette.purple200 : ""};
        }

`}
`;

interface HorizontalTabsProps {
  tabs: string[];
  onTabSelect: (tab: string) => void;
  tabType?: "button" | "tab";
}

export default function HorizontalTabs({
  tabs,
  onTabSelect,
  tabType = "button",
}: HorizontalTabsProps) {
  const [selectedTab, setSelectedTab] = useState(tabs[0]);

  const handleTabSelection = (tab: string) => {
    setSelectedTab(tab);
    onTabSelect(tab);
  };

  return (
    <TabContainer $tabType={tabType}>
      {tabs.map((tab) => {
        return (
          <TabContent
            key={tab}
            $isSelected={selectedTab === tab}
            $tabType={tabType}
            onClick={() => handleTabSelection(tab)}>
            {tab}
          </TabContent>
        );
      })}
    </TabContainer>
  );
}
