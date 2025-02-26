import { BFMPalette } from "@/Theme";
import { useState } from "react";
import styled from "styled-components";
import AreaChartGraph from "../Charts/AreaChart/AreaChart";
import HorizontalTabs from "../HorizontalTabs/HorizontalTabs";
import { useData } from "@/DataContext";
import CashflowChart from "../Charts/CashflowChart/CashflowChart";

const Container = styled("div")`
  display: flex;
  flex-direction: column;
  background-color: ${BFMPalette.white};
  border-radius: 12px;
`;
const SubContainer = styled("div")`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  border-bottom: 1px solid ${BFMPalette.gray100};
`;

export default function Payment() {
  const { areaData } = useData();
  const tabs = ["Balance Over Time", "Cashflow"];
  const [selectedTab, setSelectedTab] = useState("Balance Over Time");
  return (
    <Container>
      <SubContainer>
        <HorizontalTabs
          tabs={tabs}
          selectedTab={selectedTab}
          onTabChange={setSelectedTab}
        />
      </SubContainer>
      {selectedTab === tabs[0] && <AreaChartGraph data={areaData} />}
      {selectedTab === tabs[1] && <CashflowChart />}
    </Container>
  );
}
