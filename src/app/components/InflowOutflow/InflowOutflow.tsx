import { useState } from "react";
import HorizontalTabs from "../HorizontalTabs/HorizontalTabs";
import { generateMonths } from "@/utils";
import { Select } from "antd";
import styled from "styled-components";
import { BFMPalette } from "@/Theme";
import { H2, H4 } from "@/Typography";
import PieGraph from "../Charts/PieChart/PieChart";
import { CURRENCY } from "@/constants";
import { useData } from "@/DataContext";
const data = [
  { name: "Group A", value: 600 },
  { name: "Group B", value: 200 },
  { name: "Group C", value: 200 },
  { name: "Group D", value: 400 },
];

const COLORS = [
  BFMPalette.purple900,
  BFMPalette.purple100,
  BFMPalette.purple200,
  BFMPalette.purple400,
];

const Container = styled("div")`
  display: flex;
  flex-direction: column;
  max-width: 500px;
  border-radius: 12px;
  background-color: white;
`;

const SubContainer = styled("div")`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  border-bottom: 1px solid ${BFMPalette.gray100};
`;

const ChartContainer = styled("div")`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 24px;
`;
const Labels = styled("div")`
  display: flex;
  flex-direction: column;
  gap: 14px;
`;
const LabelContainer = styled("div")`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const Circle = styled("p")`
  width: 10px;
  height: 10px;
  color: ${BFMPalette.purple900};
  border-radius: 50%;
`;
export default function InflowOutflow() {
  const [selectedMonth, setSelectedMonth] = useState<string>("Oct 2024");
  const [selectedTab, setSelectedTab] = useState("Deposit");
  const { reports } = useData();
  return (
    <Container>
      <SubContainer>
        <HorizontalTabs
          tabs={["Deposit", "Withdrawal"]}
          selectedTab={selectedTab}
          onTabChange={setSelectedTab}
        />
        <Select
          style={{ height: "45px" }}
          onChange={(value) => setSelectedMonth(value)}
          value={selectedMonth}>
          {generateMonths(reports.esgSummary).map((month) => (
            <Select.Option key={month} value={month}>
              {month}
            </Select.Option>
          ))}
        </Select>
      </SubContainer>

      <ChartContainer>
        <PieGraph data={data} COLORS={COLORS} />
        <Labels>
          <LabelContainer>
            <Circle />
            <H4 color={BFMPalette.black400}>Other Outflow</H4>
            <H2 color={BFMPalette.black800}>{CURRENCY} 10,000.00</H2>
          </LabelContainer>
          <LabelContainer>
            <H4 color={BFMPalette.black400}>Utilities</H4>
            <H2 color={BFMPalette.black800}>{CURRENCY} 10,000.00</H2>
          </LabelContainer>
          <LabelContainer>
            <H4 color={BFMPalette.black400}>Advertising</H4>
            <H2 color={BFMPalette.black800}>{CURRENCY} 10,000.00</H2>
          </LabelContainer>
          <LabelContainer>
            <H4 color={BFMPalette.black400}>Cheque Outflow</H4>
            <H2 color={BFMPalette.black800}>{CURRENCY} 10,000.00</H2>
          </LabelContainer>
        </Labels>
      </ChartContainer>
    </Container>
  );
}
