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
  return (
    <Container>
      <SubContainer>
        <HorizontalTabs tabs={["Balance Over Time", "Cashflow"]} />.
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
            <Tooltip />
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
