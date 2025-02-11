"use client";
import styled from "styled-components";
import { BFMPalette } from "@/Theme";
import ESGCard from "../components/Label/Label";
import Actions from "../components/Actions/actions";
import PieGraph from "../components/Charts/PieChart/PieChart";
import SelectDropDown from "../components/SelectDropDown/SelectDropDown";
import Example from "../components/Charts/BarChart/BarChart";
import HorizontalTabs from "../components/HorizontalTabs/HorizontalTabs";
import BarGraph from "../components/Charts/BarChart/BarChart";

const months = [
  { name: "Jan 2024", value: 2250 },
  { name: "Feb 2024", value: 1100 },
  { name: "Mar 2024", value: 2800 },
  { name: "Apr 2024", value: 800 },
  { name: "May 2024", value: 1250 },
  { name: "Jun 2024", value: 2250 },
  { name: "Jul 2024", value: 2950 },
  { name: "Aug 2024", value: 1200 },
  { name: "Sep 2024", value: 1350 },
  { name: "Oct 2024", value: 1600 },
  { name: "Nov 2024", value: 2750 },
  { name: "Dec 2024", value: 750 },
];

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
  justify-content: space-between;
  border-radius: 12px;
  gap: 20px;
`;

const GraphsContainer = styled("div")`
  display: flex;
  flex-direction: column;
  gap: 22px;
  flex: 1;
`;

const ChartContainer = styled("div")`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px;
  background-color: ${BFMPalette.white};
`;

const Labels = styled("div")`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 14px;
  & > div:nth-last-child(odd):last-child {
    grid-column: span 2;
  }
`;

const HeadingContainer = styled("div")`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: ${BFMPalette.white};
  border: 1px solid ${BFMPalette.gray100};
  padding: 12px 16px;
`;

const Heading = styled("h1")`
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  color: ${BFMPalette.black800};
`;

export default function ESG() {
  return (
    <Container>
      <GraphsContainer>
        <div>
          <HeadingContainer>
            <Heading>CO2 Emission by Category</Heading>
            <SelectDropDown />
          </HeadingContainer>
          <ChartContainer>
            <PieGraph data={data} COLORS={COLORS} />
            <Labels>
              <ESGCard
                title="Electricity"
                value="HKD 100,000.00"
                kg={586.75}
                circleColor={BFMPalette.yellow500}
              />
              <ESGCard
                title="Transport"
                value="HKD 100,000.00"
                kg={586.75}
                circleColor={BFMPalette.red100}
              />
              <ESGCard
                title="Gas"
                value="HKD 100,000.00"
                kg={586.75}
                circleColor={BFMPalette.red600}
              />
              <ESGCard
                title="Logistics"
                value="HKD 100,000.00"
                kg={586.75}
                circleColor={BFMPalette.red100}
              />
              <ESGCard
                title="Water"
                value="HKD 100,000.00"
                kg={586.75}
                circleColor={BFMPalette.blue500}
              />
            </Labels>
          </ChartContainer>
        </div>

        <div>
          <HeadingContainer>
            <Heading>Carbon Footprint Trendy</Heading>
            <HorizontalTabs tabs={["2023", "2024", "2025"]} />
          </HeadingContainer>
          <ChartContainer>
            <BarGraph data={months} color={BFMPalette.purple800} />
          </ChartContainer>
        </div>
      </GraphsContainer>

      <Actions />
    </Container>
  );
}
