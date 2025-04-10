import { BFMPalette } from "@/Theme";
import { H5 } from "@/Typography";
import { formatString } from "@/utils";
import styled from "styled-components";
import { CategoryProps } from "../../../../Interfaces";

const LabelContainer = styled("div")`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;
const Label = styled("div")`
  display: flex;
  align-items: center;
  gap: 10px;
  border-radius: 4px;
  background-color: ${BFMPalette.white60};
  padding: 4px;
`;
const Circle = styled("div")<{ $circleColor?: string }>`
  width: 15px;
  height: 15px;
  border-radius: 100px;
  background-color: ${(props) => props.$circleColor || BFMPalette.purple900};
`;

export default function Category({ category, circleColor }: CategoryProps) {
  return (
    <LabelContainer>
      <Label>
        <Circle $circleColor={circleColor} />
        <H5 color={BFMPalette.black400}>{formatString(category, true)}</H5>
      </Label>
    </LabelContainer>
  );
}
