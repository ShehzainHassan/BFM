import { BFMPalette } from "@/Theme";
import { H5 } from "@/Typography";
import styled from "styled-components";

const InputContainer = styled("div")`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 4px 4px 4px 10px;
  border-radius: 16px;
  border: 1px solid ${BFMPalette.green400};
`;
const ValueContainer = styled("div")`
  border-radius: 16px;
  padding: 2px 8px;
  background-color: ${BFMPalette.green600};
`;
type CarbonContainerProps = {
  text?: string;
  carbonVal?: string;
};

export default function CarbonContainer({
  text = "Text",
  carbonVal = "1 t Carbon",
}: CarbonContainerProps) {
  return (
    <InputContainer>
      <H5 color={BFMPalette.black400}>{text}</H5>
      <ValueContainer>
        <H5 color={BFMPalette.white25}>{carbonVal}</H5>
      </ValueContainer>
    </InputContainer>
  );
}
