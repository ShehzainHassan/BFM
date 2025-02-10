import { BFMPalette } from "@/Theme";
import { H3Secondary, H3SecondaryDark, H4, H5 } from "@/Typography";
import styled from "styled-components";

export default function ESGCard() {
  const Container = styled("div")`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12px;
    border-radius: 8px;
    border: 1px solid ${BFMPalette.gray200};
  `;

  const CircleContainer = styled("div")`
    display: flex;
    align-items: center;
    gap: 10px;
  `;
  const Circle = styled("p")`
    width: 10px;
    height: 10px;
    background-color: ${BFMPalette.purple900};
    border-radius: 50%;
  `;
  const CategoryContainer = styled("div")`
    display: flex;
    flex-direction: column;
    gap: 2px;
  `;
  const ValueContainer = styled("div")`
    display: flex;
    gap: 4px;
  `;

  return (
    <Container>
      <CategoryContainer>
        <CircleContainer>
          <Circle />
          <H3Secondary>Electricity</H3Secondary>
        </CircleContainer>
        <H5>HKD 100,000.00</H5>
      </CategoryContainer>
      <ValueContainer>
        <H3SecondaryDark>586.75</H3SecondaryDark>
        <H4>kg CO2</H4>
      </ValueContainer>
    </Container>
  );
}
