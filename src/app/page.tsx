"use client";
import Card from "./components/Card/Card";
import HorizontalTabs from "./components/HorizontalTabs/HorizontalTabs";
import InflowOutflow from "./components/InflowOutflow/InflowOutflow";
import Navbar from "./components/Navbar/Navbar";
import Notifications from "./components/Notifications/Notifications";
import Payment from "./components/Payments/Payment";
import Comparison from "./components/Spending Comparison/Comparison";
import TextComponent from "./components/TextComponent/TextComponent";
import styled from "styled-components";
import TextContainer from "./components/TextComponent/TextContainer/TextContainer";

const MainContainer = styled("div")`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 32px;
`;

const SubContainer = styled("div")`
  display: flex;
  justify-content: space-between;
`;
export default function Home() {
  return (
    <div>
      <Navbar
        navItems={["Dashboard", "Analytics", "Invoices", "Calendar", "ESG"]}
      />
      <MainContainer>
        <SubContainer>
          <TextContainer />
          <InflowOutflow />
          <Notifications />
        </SubContainer>

        <Payment />
      </MainContainer>
    </div>
  );
}
