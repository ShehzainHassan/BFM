import { BFMPalette } from "@/Theme";
import { H3Secondary, H4, H5 } from "@/Typography";
import styled from "styled-components";

interface ESGCardProps {
  title: string;
  value: string;
  kg: number;
  circleColor?: string;
}
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
const Circle = styled("p")<{ color: string }>`
  width: 10px;
  height: 10px;
  background-color: ${(props) => props.color};
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

export default function ESGCard({
  title,
  value,
  kg,
  circleColor,
}: ESGCardProps) {
  return (
    <Container>
      <CategoryContainer>
        <CircleContainer>
          <Circle color={circleColor ?? BFMPalette.purple600} />
          <H3Secondary color={BFMPalette.black400}>{title}</H3Secondary>
        </CircleContainer>
        <H5 color={BFMPalette.gray700}>{value}</H5>
      </CategoryContainer>
      <ValueContainer>
        <H3Secondary color={BFMPalette.black800}>{kg}</H3Secondary>
        <H4 color={BFMPalette.gray700}>kg CO2</H4>
      </ValueContainer>
    </Container>
  );
}
