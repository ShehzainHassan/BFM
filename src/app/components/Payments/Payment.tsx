import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import HorizontalTabs from "../HorizontalTabs/HorizontalTabs";
import styled from "styled-components";
import { BFMPalette } from "@/Theme";
import { useState } from "react";

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
const GraphContainer = styled("div")`
  width: 100%;
  padding: 14px 16px;
  height: 300px;
`;
const CustomTooltipContainer = styled("div")`
  background-color: ${BFMPalette.purple925};
  padding: 8px 10px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const CustomTooltipLabel = styled("p")`
  font-weight: 500;
  font-size: 12px;
  line-height: 18px;
  color: ${BFMPalette.gray200};
`;

const CustomTooltipValue = styled("p")`
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
  color: ${BFMPalette.white};
`;

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <CustomTooltipContainer>
        <CustomTooltipLabel>{label}</CustomTooltipLabel>
        <CustomTooltipValue>{payload[0].value}</CustomTooltipValue>
      </CustomTooltipContainer>
    );
  }

  return null;
};
const data = [
  {
    name: "31 Dec 2023",
    HKD: 11900.0,
  },
  {
    name: "14 Jan 2024",
    HKD: 12300.0,
  },
  {
    name: "28 Jan 2024",
    HKD: 12800.0,
  },
  {
    name: "11 Feb 2024",
    HKD: 13000.0,
  },
  {
    name: "25 Feb 2024",
    HKD: 14500.0,
  },
  {
    name: "11 Mar 2024",
    HKD: 14000.0,
  },
  {
    name: "25 Mar 2024",
    HKD: 14700.0,
  },
  {
    name: "11 Apr 2024",
    HKD: 15000.0,
  },
];
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
      <GraphContainer>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 0,
            }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="HKD"
              stroke={BFMPalette.purple350}
              fill={BFMPalette.purple350}
            />
          </AreaChart>
        </ResponsiveContainer>
      </GraphContainer>
    </Container>
  );
}
