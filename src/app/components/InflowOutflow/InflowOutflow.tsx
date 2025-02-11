import { useState } from "react";
import HorizontalTabs from "../HorizontalTabs/HorizontalTabs";
import { generateMonths } from "@/utils";
import { Select } from "antd";
import styled from "styled-components";
import { Cell, Pie, PieChart } from "recharts";
import { BFMPalette } from "@/Theme";
import { Label as RechartsLabel } from "recharts";
import { H2, Label } from "@/Typography";
import PieGraph from "../Charts/PieChart/PieChart";
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
  padding: 24px;
  height: 300px;
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

  return (
    <Container>
      <SubContainer>
        <HorizontalTabs tabs={["Deposit", "Withdrawal"]} />
        <Select
          style={{ height: "45px" }}
          onChange={(value) => setSelectedMonth(value)}
          value={selectedMonth}>
          {generateMonths().map((month) => (
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
            <Label>Other Outflow</Label>
            <H2>HKD 10,000.00</H2>
          </LabelContainer>
          <LabelContainer>
            <Label>Utilities</Label>
            <H2>HKD 10,000.00</H2>
          </LabelContainer>
          <LabelContainer>
            <Label>Advertising</Label>
            <H2>HKD 10,000.00</H2>
          </LabelContainer>
          <LabelContainer>
            <Label>Cheque Outflow</Label>
            <H2>HKD 10,000.00</H2>
          </LabelContainer>
        </Labels>
      </ChartContainer>
    </Container>
  );
}
