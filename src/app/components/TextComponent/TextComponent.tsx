import styled from "styled-components";
import { BFMPalette } from "@/Theme";
import { BodyText, Title, H1, H3 } from "@/Typography";
import Image from "next/image";
import { formatCurrency } from "@/utils";
import { CURRENCY } from "@/constants";
const Container = styled("div")`
  display: flex;
  background-color: ${BFMPalette.white25};
  border-radius: 12px;
  padding: 22px 18px;
`;

const SubContainer = styled("div")`
  display: flex;
  align-items: center;
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

const Border = styled("div")<{ $isIncreased: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2px;
  border: 1px solid
    ${({ $isIncreased }) =>
      $isIncreased ? BFMPalette.green600 : BFMPalette.skin300};
  border-radius: 16px;
  padding: 2px 6px 2px 8px;
  background-color: ${({ $isIncreased }) =>
    $isIncreased ? BFMPalette.green0 : BFMPalette.skin200};
`;

interface TextComponentProps {
  title: string;
  value: number;
  percentage: number;
  timePeriod: string;
  isIncreased?: boolean;
  valueColor?: string;
}
export default function TextComponent({
  title,
  value,
  percentage,
  timePeriod,
  isIncreased = true,
  valueColor = BFMPalette.black800,
}: TextComponentProps) {
  return (
    <Container>
      <SubContainer>
        <TextContainer>
          <Title color={BFMPalette.gray700}>{title}</Title>
          <H1 color={valueColor}>
            {CURRENCY}: {formatCurrency(value)}
          </H1>
        </TextContainer>
        <TextContainer>
          <Percentage>
            <Border $isIncreased={isIncreased}>
              {isIncreased ? (
                <H3 color={BFMPalette.green800}>{percentage}%</H3>
              ) : (
                <H3 color={BFMPalette.red700}>{percentage * -1}%</H3>
              )}
              {isIncreased ? (
                <Image
                  src="/images/success.png"
                  alt="arrow-up"
                  width={12}
                  height={12}
                  style={{ transform: "rotate(180deg)" }}
                />
              ) : (
                <Image
                  src="/images/loss.png"
                  alt="arrow-down"
                  width={12}
                  height={12}
                  style={{ transform: "rotate(180deg)" }}
                />
              )}
            </Border>
          </Percentage>
          <BodyText color={BFMPalette.gray700}>{timePeriod}</BodyText>
        </TextContainer>
      </SubContainer>
    </Container>
  );
}
