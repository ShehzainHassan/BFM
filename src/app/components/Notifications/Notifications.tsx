import styled from "styled-components";
import Comparison from "../Spending Comparison/Comparison";
import Card from "../Card/Card";
import Image from "next/image";

export default function Notifications() {
  const Container = styled("div")`
    display: flex;
    flex-direction: column;
    border-radius: 12px;
    background: linear-gradient(to right, #ebebfa, #ffffff);
  `;
  const CardContainer = styled("div")`
    display: flex;
    flex-direction: column;
    padding: 16px;
    gap: 16px;
    background: linear-gradient(to right, #ffffff, #fffafe);
    border-bottom-left-radius: 12px;
    border-bottom-right-radius: 12px;
  `;
  const TitleContainer = styled("div")`
    display: flex;.
    justify-content: center;
    align-items: center;
    gap: 8px;
    padding: 16px;
  `;
  const Heading = styled("h1")`
    font-weight: 600;
    font-size: 16px;
    line-height: 24px;
    margin: 0;
  `;
  return (
    <Container>
      <TitleContainer>
        <Image src="/images/icon.png" alt="icon" width={40} height={40} />
        <Heading>For You</Heading>
      </TitleContainer>
      <CardContainer>
        <Comparison />
        <Card
          image="/images/Frame 3.png"
          title="Apply for a Business Loan"
          description="Apply for a business loan and enjoy up to HKD 3,000 rewards!"
        />
        <Card
          image="/images/Frame 3.png"
          title="Fee Detected"
          description="You just got charged a fee from ABC bank."
        />
      </CardContainer>
    </Container>
  );
}
