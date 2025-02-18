import { BFMPalette } from "@/Theme";
import { useState } from "react";
import styled from "styled-components";
import AreaChartGraph from "../Charts/AreaChart/AreaChart";
import HorizontalTabs from "../HorizontalTabs/HorizontalTabs";
import { areaData } from "../Charts/AreaChart/AreaChartData";

const Container = styled("div")`
  display: flex;
  flex-direction: column;
  background-color: white;
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
  const [selectedTab, setSelectedTab] = useState("Balance Over Time");
  return (
    <Container>
      <SubContainer>
        <HorizontalTabs
          tabs={["Balance Over Time", "Cashflow"]}
          selectedTab={selectedTab}
          onTabChange={setSelectedTab}
        />
        .
      </SubContainer>
      <AreaChartGraph data={areaData} />
    </Container>
  );
}
