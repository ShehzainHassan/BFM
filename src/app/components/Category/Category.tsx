import { BFMPalette } from "@/Theme";
import { H2, H4, H5 } from "@/Typography";
import { formatCurrency, formatString } from "@/utils";
import styled from "styled-components";
import { CategoryProps } from "../../../../Interfaces";
import { HKD_EQUIVALANT } from "@/constants";

const LabelContainer = styled("div")`
  display: flex;
  flex-direction: column;
  gap: 4px;
  @media (max-width: 768px) {
    display: flex;
  }
`;
const Label = styled("div")`
  display: flex;
  align-items: center;
  gap: 10px;
  border-radius: 4px;
  background-color: ${BFMPalette.white60};
  padding: 4px;
  @media (max-width: 768px) {
    display: none;
  }
`;
const Circle = styled("div")<{
  $circleColor?: string;
  $width?: number;
  $height?: number;
}>`
  width: ${(props) => (props.$width ? `${props.$width}px` : "15px")};
  height: ${(props) => (props.$height ? `${props.$height}px` : "15px")};
  border-radius: 100px;
  background-color: ${(props) => props.$circleColor || BFMPalette.purple900};
`;

const MobileLayout = styled("div")`
  display: none;
  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    gap: 5px;
  }
`;
const Line = styled("div")`
  border-bottom: 1px solid ${BFMPalette.gray100};
`;
const DataContainer = styled("div")`
  display: flex;
  gap: 5px;
  align-items: center;
`;
export default function Category({ data, circleColor }: CategoryProps) {
  return (
    <LabelContainer>
      <Label>
        <Circle $circleColor={circleColor} />
        <H5 color={BFMPalette.black400}>{formatString(data.name, true)}</H5>
      </Label>
      <MobileLayout>
        <DataContainer>
          <Circle $width={10} $height={10} $circleColor={circleColor} />
          <H4 color={BFMPalette.black400}>{formatString(data.name, true)}</H4>
        </DataContainer>

        <H2 color={BFMPalette.black800}>
          {formatCurrency(`${HKD_EQUIVALANT}${data.value}`)}
        </H2>
        <Line />
      </MobileLayout>
    </LabelContainer>
  );
}
