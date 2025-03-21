import { useState } from "react";
import HorizontalTabs from "../../components/HorizontalTabs/HorizontalTabs";
import styled from "styled-components";
import { BFMPalette } from "@/Theme";
import { TableTitle } from "@/Typography";
import InvoiceChart from "../../components/Charts/InvoiceOverview/InvoiceChart";
import { invoiceData } from "../../components/Charts/InvoiceOverview/InvoiceData";
const MainContainer = styled("div")`
  border-radius: 12px;
  background-color: ${BFMPalette.white};
`;
const OverviewContainer = styled("div")`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid ${BFMPalette.gray100};
  background-color: ${BFMPalette.white25};
  padding: 14px 16px;
`;
export default function InvoiceOverview() {
  const tabs = ["3 Months", "6 Months", "1 Year"];
  const [selectedTab, setSelectedTab] = useState(tabs[0]);
  const getFilteredData = () => {
    switch (selectedTab) {
      case tabs[0]:
        return invoiceData.filter((_, index) => index % 3 === 0);
      case tabs[1]:
        return invoiceData.filter((_, index) => index % 6 === 0);
      case tabs[2]:
      default:
        return invoiceData;
    }
  };
  return (
    <MainContainer>
      <OverviewContainer>
        <TableTitle color={BFMPalette.black800}>Invoice Overview</TableTitle>
        <HorizontalTabs
          tabs={tabs}
          selectedTab={selectedTab}
          onTabChange={(tab) => setSelectedTab(tab)}
        />
      </OverviewContainer>
      <InvoiceChart invoiceData={getFilteredData()} />
    </MainContainer>
  );
}
