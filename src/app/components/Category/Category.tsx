import { HKD_EQUIVALANT } from "@/constants";
import { BFMPalette } from "@/Theme";
import { H2, H4 } from "@/Typography";
import { formatCurrency, formatString } from "@/utils";
import styled from "styled-components";

const LabelContainer = styled("div")`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;
const Label = styled("div")`
  display: flex;
  align-items: center;
  gap: 10px;
`;
const Circle = styled("div")<{ $circleColor?: string }>`
  width: 10px;
  height: 10px;
  border-radius: 100px;
  background-color: ${(props) => props.$circleColor || BFMPalette.purple900};
`;

interface CategoryProps {
  category: string;
  circleColor?: string;
  amount: number;
}
export default function Category({
  category,
  circleColor,
  amount,
}: CategoryProps) {
  return (
    <LabelContainer>
      <Label>
        <Circle $circleColor={circleColor} />
        <H4 color={BFMPalette.black400}>{formatString(category, true)}</H4>
      </Label>
      <H2 color={BFMPalette.black800}>
        {formatCurrency(`${HKD_EQUIVALANT}${amount}`)}
      </H2>
    </LabelContainer>
  );
}
