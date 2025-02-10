"use client";
import InflowOutflow from "./components/InflowOutflow/InflowOutflow";
import Navbar from "./components/Navbar/Navbar";
import Notifications from "./components/Notifications/Notifications";
import Payment from "./components/Payments/Payment";
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
        navItems={[
          { label: "Dashboard", path: "/" },
          { label: "Analytics", path: "/analytics" },
          { label: "Invoices", path: "/invoices" },
          { label: "Calender", path: "/calender" },
          { label: "ESG", path: "/esg" },
        ]}
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
