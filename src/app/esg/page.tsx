"use client";
import styled from "styled-components";
import Navbar from "../components/Navbar/Navbar";
import { Select } from "antd";
import { generateMonths } from "@/utils";
import { useState } from "react";
import { BFMPalette } from "@/Theme";
import { Cell, Pie, PieChart } from "recharts";
import { Label as RechartsLabel } from "recharts";
import ESGCard from "../components/Label/Label";
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
export default function ESG() {
  const Container = styled("div")`
    display: flex;
    flex-direction: column;
    border-radius: 12px;
    padding: 16px;
    background-color: ${BFMPalette.white25};
  `;

  const ChartContainer = styled("div")`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 24px;
    height: 300px;
  `;
  const Labels = styled("div")`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 14px;
    width: 70%;
    & > div:nth-last-child(odd):last-child {
      grid-column: span 2;
    }
  `;
  const PieContainer = styled("div")`
    width: 30%;
    display: flex;
    justify-content: center;
    align-items: center;
  `;

  const SubContainer = styled("div")`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12px 16px;
    border-bottom: 1px solid ${BFMPalette.gray100};
  `;

  const Heading = styled("h1")`
    font-weight: 600;
    font-size: 16px;
    line-height: 24px;
    color: ${BFMPalette.black800};
  `;

  const [selectedMonth, setSelectedMonth] = useState<string>("Oct 2024");

  return (
    <div>
      <Navbar
        navItems={[
          { label: "Dashboard", path: "/" },
          { label: "Analytics", path: "/analytics" },
          { label: "Invoices", path: "/invoices" },
          { label: "Calender", path: "/calender" },
          { label: "ESG", path: "/esg" },
        ]}
      />
      <Container>
        <SubContainer>
          <Heading>CO2 Emission by Category</Heading>
          <Select
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
          <PieContainer>
            <PieChart width={300} height={300}>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                fill={BFMPalette.purple350}
                dataKey="value">
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
                <RechartsLabel
                  content={() => (
                    <foreignObject x="35%" y="40%" width="100" height="100">
                      <div
                        style={{
                          textAlign: "center",
                          fontSize: "16px",
                          fontWeight: 600,
                          color: BFMPalette.black800,
                        }}>
                        586.75 kg CO2 <br />
                        Total
                      </div>
                    </foreignObject>
                  )}
                  position="center"
                />
              </Pie>
            </PieChart>
          </PieContainer>
          <Labels>
            <ESGCard />
            <ESGCard />
            <ESGCard />
            <ESGCard />
            <ESGCard />
          </Labels>
        </ChartContainer>
      </Container>
    </div>
  );
}
