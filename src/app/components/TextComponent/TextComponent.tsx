import styled from "styled-components";
import { BFMPalette } from "@/Theme";
import { BodyText, Title, H1 } from "@/Typography";
const Container = styled("div")`
  display: flex;
  justify-content: space-between;
  background-color: ${BFMPalette.white25};
  border-radius: 12px;
  padding: 22px 18px;
`;

const SubContainer = styled("div")`
  display: flex;
  justify-content: space-between;
  flex: 1;
`;
const TextContainer = styled("div")`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 8px;
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
          <Title color={BFMPalette.gray700}>{title}</Title>
          <H1 color={BFMPalette.black800}>{value}</H1>
        </TextContainer>
        <TextContainer>
          <Percentage>
            <Border>{percentage}%</Border>
          </Percentage>
          <BodyText color={BFMPalette.gray700}>{timePeriod}</BodyText>
        </TextContainer>
      </SubContainer>
    </Container>
  );
}
