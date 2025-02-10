import { useState } from "react";
import HorizontalTabs from "../HorizontalTabs/HorizontalTabs";
import { generateMonths } from "@/utils";
import { Select } from "antd";
import styled from "styled-components";
import { Cell, Pie, PieChart } from "recharts";
import { BFMPalette } from "@/Theme";

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
  border-bottom: 1px solid #e9eaeb;
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
const Label = styled("p")`
  gap: 4px;
  color: #414651;
  font-weight: 500;
  font-size: 14px;
`;
const Value = styled("p")`
  color: #181d27;
  font-size: 16px;
  line-height: 24px;
  font-weight: 600;
`;
const Circle = styled("p")`
  width: 10px;
  height: 10px;
  color: #42307d;
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
        <PieChart width={300} height={300}>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value">
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
        </PieChart>
        <Labels>
          <LabelContainer>
            <Circle />
            <Label>Other Outflow</Label>
            <Value>HKD 10,000.00</Value>
          </LabelContainer>
          <LabelContainer>
            <Label>Utilities</Label>
            <Value>HKD 10,000.00</Value>
          </LabelContainer>
          <LabelContainer>
            <Label>Advertising</Label>
            <Value>HKD 10,000.00</Value>
          </LabelContainer>
          <LabelContainer>
            <Label>Cheque Outflow</Label>
            <Value>HKD 10,000.00</Value>
          </LabelContainer>
        </Labels>
      </ChartContainer>
    </Container>
  );
}
