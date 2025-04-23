import { HKD_EQUIVALANT } from "@/constants";
import { BFMPalette } from "@/Theme";
import { BodyText, H1, H3, Title } from "@/Typography";
import { formatCurrency } from "@/utils";
import Image from "next/image";
import styled from "styled-components";
import { TextComponentProps } from "../../../../Interfaces";
const Container = styled("div")`
  display: flex;
  background-color: ${BFMPalette.white25};
  border-radius: 12px;
  padding: 22px 18px;
  @media (min-width: 941px) and (max-width: 1152px) {
    padding: 16px 12px;
  }
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
          <Title
            $mobileFontSize="14px"
            $mobileFontWeight={500}
            $mobileLineHeight="20px"
            color={BFMPalette.gray700}>
            {title}
          </Title>
          <H1
            $mobileFontSize="18px"
            $mobileFontWeight={700}
            $mobileLineHeight="28px"
            color={valueColor}>
            {formatCurrency(`${HKD_EQUIVALANT}${value}`, 2)}
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
