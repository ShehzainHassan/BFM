"use client";
import HorizontalTabs from "./components/HorizontalTabs/HorizontalTabs";
import InflowOutflow from "./components/InflowOutflow/InflowOutflow";
import Navbar from "./components/Navbar/Navbar";
import Payment from "./components/Payments/Payment";
import TextComponent from "./components/TextComponent/TextComponent";
import styled from "styled-components";

const MainContainer = styled("div")`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 32px;
`;
const TextContainer = styled("div")`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
const SubContainer = styled("div")`
  display: flex;
  gap: 40px;
`;
export default function Home() {
  return (
    <div>
      <Navbar
        navItems={["Dashboard", "Analytics", "Invoices", "Calendar", "ESG"]}
      />
      <MainContainer>
        <SubContainer>
          <TextContainer>
            <TextComponent
              title="Current Balance"
              timePeriod="since last month"
              percentage={8}
              value="HKD 1,300,000.00"
            />
            <TextComponent
              title="Total income"
              timePeriod="since last month"
              percentage={2}
              value="HKD 240,000.00"
            />
            <TextComponent
              title="Total Expenses"
              timePeriod="since last month"
              percentage={8}
              value="HKD 90,000.00"
            />
          </TextContainer>
          <InflowOutflow />
        </SubContainer>

        <Payment />
      </MainContainer>
    </div>
  );
}
