import styled from "styled-components";
import Comparison from "../Spending Comparison/Comparison";
import Card from "../Card/Card";
import Image from "next/image";
import { BFMPalette } from "@/Theme";
import { H2 } from "@/Typography";
import ButtonSecondary from "../Button/Secondary/ButtonSecondary";

export default function Notifications() {
  const Container = styled("div")`
    display: flex;
    flex-direction: column;
    border-radius: 12px;
    background: linear-gradient(
      to right,
      ${BFMPalette.purple150} ${BFMPalette.white}
    );
  `;
  const CardContainer = styled("div")`
    display: flex;
    flex-direction: column;
    padding: 16px;
    gap: 16px;
    background: linear-gradient(
      to right,
      ${BFMPalette.white},
      ${BFMPalette.white100}
    );
    border-bottom-left-radius: 12px;
    border-bottom-right-radius: 12px;
  `;
  const TitleContainer = styled("div")`
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 16px;
    border-top-left-radius: 12px;
    border-top-right-radius: 12px;
    border-bottom: 1px solid ${BFMPalette.purple200};
    background: linear-gradient(
      to right,
      ${BFMPalette.purple175},
      ${BFMPalette.white}
    );
  `;
  const ButtonContainer = styled("div")`
    display: flex;
    justify-content: flex-end;
  `;
  return (
    <Container>
      <TitleContainer>
        <Image src="/images/icon.png" alt="icon" width={40} height={40} />
        <H2 color={BFMPalette.black800}>For You</H2>
      </TitleContainer>
      <CardContainer>
        <Comparison />
        <Card
          image="/images/Frame 3.png"
          title="Apply for a Business Loan"
          description="Apply for a business loan and enjoy up to HKD 3,000 rewards!">
          <ButtonContainer>
            <ButtonSecondary />
          </ButtonContainer>
        </Card>

        <Card
          image="/images/Frame 3.png"
          title="Fee Detected"
          description="You just got charged a fee from ABC bank.">
          <ButtonContainer>
            <ButtonSecondary />
          </ButtonContainer>
        </Card>
      </CardContainer>
    </Container>
  );
}
