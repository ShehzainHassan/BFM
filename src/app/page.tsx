"use client";
import InflowOutflow from "./components/InflowOutflow/InflowOutflow";
import Notifications from "./components/Notifications/Notifications";
import Payment from "./components/Payments/Payment";
import styled from "styled-components";
import TextContainer from "./components/TextContainer/TextContainer";

const MainContainer = styled("div")`
  display: flex;
  gap: 20px;
  /* max-width: 1300px; */
`;
const Container = styled("div")`
  display: flex;
  flex-direction: column;
  gap: 22px;
`;
const SubContainer = styled("div")`
  display: flex;
  gap: 20px;
`;
export default function Home() {
  return (
    <MainContainer>
      <Container>
        <SubContainer>
          <TextContainer />
          <InflowOutflow />
        </SubContainer>
        <Payment />
      </Container>
      <Notifications />
    </MainContainer>
  );
}
