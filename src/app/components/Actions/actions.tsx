import styled from "styled-components";
import Comparison from "../Spending Comparison/Comparison";
import Card from "../Card/Card";
import Image from "next/image";
import { BFMPalette } from "@/Theme";
import { H2 } from "@/Typography";
import InputLabel from "../InputLabel/Input";

export default function Actions() {
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
    background: linear-gradient(
      to right,
      ${BFMPalette.purple175},
      ${BFMPalette.white}
    );
    border-top-left-radius: 12px;
    border-top-right-radius: 12px;
    border-bottom: 1px solid ${BFMPalette.purple200};
  `;
  return (
    <Container>
      <TitleContainer>
        <Image src="/images/icon.png" alt="icon" width={40} height={40} />
        <H2>For You</H2>
      </TitleContainer>
      <CardContainer>
        <Card
          image="/images/sun.png"
          title="Improve the energy efficiency of your premises">
          <InputLabel />
        </Card>
        <Card image="/images/car.png" title="Reduce use of fossil fuel">
          <InputLabel />
        </Card>
      </CardContainer>
    </Container>
  );
}
