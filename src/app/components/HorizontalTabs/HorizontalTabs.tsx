"use client";
import { BFMPalette } from "@/Theme";
import { useState } from "react";
import styled from "styled-components";
const TabContainer = styled("div")`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 4px;
  background-color: white;
  border: 1px solid ${BFMPalette.gray100};
  border-radius: 1000px;
`;
const TabContent = styled("p")<{ $isSelected: boolean }>`
  padding: 8px 12px;
  border-radius: ${({ $isSelected }) => ($isSelected ? "1000px" : "")};
  background-color: ${({ $isSelected }) =>
    $isSelected ? BFMPalette.purple800 : ""};
  color: ${({ $isSelected }) => ($isSelected ? "white" : "")};
  cursor: pointer;
`;

interface HorizontalTabsProps {
  tabs: string[];
  defaultValue?: string;
}
export default function HorizontalTabs({
  tabs,
  defaultValue,
}: HorizontalTabsProps) {
  const [selectedTab, setSelectedTab] = useState(defaultValue ?? tabs[0]);
  return (
    <TabContainer>
      {tabs.map((tab, index) => (
        <TabContent
          key={index}
          $isSelected={selectedTab === tab}
          onClick={() => setSelectedTab(tab)}>
          {tab}
        </TabContent>
      ))}
    </TabContainer>
  );
}
