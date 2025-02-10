import styled from "styled-components";
import { BFMPalette } from "@/Theme";
const Container = styled("div")`
  display: flex;
  justify-content: space-between;
  max-width: 460px;
  background-color: ${BFMPalette.white25};
  border-radius: 12px;
  padding: 14px 18px;
`;

const SubContainer = styled("div")`
  display: flex;
  gap: 40px;
`;
const TextContainer = styled("div")`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 8px;
`;
const Title = styled("p")`
  color: ${BFMPalette.gray700};
  font-size: 16px;
  font-weight: 500;
`;
const Value = styled("p")`
  font-size: 16px;
  font-weight: 700;
`;

const Percentage = styled("div")`
  display: flex;
  justify-content: right;
`;

const Border = styled("p")`
  border: 1px solid;
  border-radius: 16px;
  padding: 2px 6px 2px 8px;
  background-color: ${BFMPalette.green100};
`;

interface TextComponentProps {
  title: string;
  value: string;
  percentage: number;
  timePeriod: string;
}
export default function TextComponent({
  title,
  value,
  percentage,
  timePeriod,
}: TextComponentProps) {
  return (
    <Container>
      <SubContainer>
        <TextContainer>
          <Title>{title}</Title>
          <Value>{value}</Value>
        </TextContainer>
        <TextContainer>
          <Percentage>
            <Border>{percentage}%</Border>
          </Percentage>
          <Title>{timePeriod}</Title>
        </TextContainer>
      </SubContainer>
    </Container>
  );
}
