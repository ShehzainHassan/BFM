"use client";
import styled from "styled-components";
import { BFMPalette } from "@/Theme";
import ESGCard from "../components/Label/Label";
import PieGraph from "../components/Charts/PieChart/PieChart";
import SelectDropDown from "../components/SelectDropDown/SelectDropDown";
import HorizontalTabs from "../components/HorizontalTabs/HorizontalTabs";
import BarGraph from "../components/Charts/BarChart/BarChart";
import { H2, H5 } from "@/Typography";
import { useState } from "react";
import { barData } from "../components/Charts/BarChart/BarChartData";
import {
  PIE_COLORS,
  pieData,
} from "../components/Charts/PieChart/PieChartData";
import { useData } from "@/DataContext";
import ESGNotifications from "../components/ESGNotifications/ESGNotifications";
import Image from "next/image";

const Container = styled("div")`
  display: grid;
  grid-template-columns: 8.55fr 3.45fr;
  gap: 20px;
  max-width: 1300px;
  width: 100%;
`;

const GraphsContainer = styled("div")`
  display: flex;
  flex-direction: column;
  gap: 22px;
  flex: 1;
`;

const ChartContainer = styled("div")`
  display: flex;
  gap: 24px;
  align-items: center;
  padding: 24px;
`;

const SubContainer = styled("div")`
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 24px;
`;

const Labels = styled("div")`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  flex: 1;
  gap: 14px;
  & > div:nth-last-child(odd):last-child {
    grid-column: span 2;
  }
`;

const HeadingContainer = styled("div")`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid ${BFMPalette.gray100};
  padding: 12px 16px;
`;

const Heading = styled("h1")`
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  color: ${BFMPalette.black800};
`;
const BarLabel = styled("div")`
  border-radius: 16px;
  border: 1px solid ${BFMPalette.blue200};
  padding: 2px 8px;
  background-color: ${BFMPalette.blue300};
  max-width: 200px;
`;
const BarChartContainer = styled("div")`
  display: flex;
  flex-direction: column;
  border-radius: 12px;
  background-color: ${BFMPalette.white};
`;
const PieChartContainer = styled("div")`
  border-radius: 12px;
  background-color: ${BFMPalette.white};
`;
const ESGNotificationsContainer = styled("div")`
  display: flex;
  flex-direction: column;
  background: linear-gradient(
    to bottom,
    ${BFMPalette.white},
    ${BFMPalette.white100}
  );
  border-radius: 12px;
  height: auto;
  max-height: fit-content;
`;
const CardsContainer = styled("div")`
  display: flex;
  flex-direction: column;
  gap: 22px;
  padding: 16px;
`;

const TitleContainer = styled("div")`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 16px;
  background: linear-gradient(
    to right,
    ${BFMPalette.purple175},
    ${BFMPalette.white}
  );
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
  border-bottom: 1px solid ${BFMPalette.purple200};
`;
export default function ESG() {
  const [selectedTab, setSelectedTab] = useState("2024");
  const { notifications } = useData();

  return (
    <Container>
      <GraphsContainer>
        <PieChartContainer>
          <HeadingContainer>
            <Heading>CO2 Emission by Category</Heading>
            <SelectDropDown />
          </HeadingContainer>
          <ChartContainer>
            <PieGraph data={pieData} COLORS={PIE_COLORS} />
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
        </PieChartContainer>

        <BarChartContainer>
          <HeadingContainer>
            <Heading>Carbon Footprint Trendy</Heading>
            <HorizontalTabs
              tabs={["2023", "2024", "2025"]}
              selectedTab={selectedTab}
              onTabChange={setSelectedTab}
            />
          </HeadingContainer>

          <SubContainer>
            <BarLabel>
              <H5 color={BFMPalette.blue550}>
                All data are in units of kg CO2e
              </H5>
            </BarLabel>
            <BarGraph data={barData} color={BFMPalette.purple800} />
          </SubContainer>
        </BarChartContainer>
      </GraphsContainer>
      <ESGNotificationsContainer>
        <TitleContainer>
          <Image src="/images/icon.png" alt="icon" width={40} height={40} />
          <H2 color={BFMPalette.black800}>Actions For You</H2>
        </TitleContainer>

        <CardsContainer>
          {notifications.esgNotifications.map((item) => (
            <ESGNotifications
              key={item.id}
              imgSrc={item.category}
              title={item.title}
              data={item.payload}
            />
          ))}
        </CardsContainer>
      </ESGNotificationsContainer>
    </Container>
  );
}
