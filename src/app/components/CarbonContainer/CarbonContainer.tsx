import { BFMPalette } from "@/Theme";
import { H5 } from "@/Typography";
import styled from "styled-components";

interface CarbonContainerProps {
  carbonVal?: string;
}
export default function CarbonContainer({ carbonVal }: CarbonContainerProps) {
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
  return (
    <InputContainer>
      <H5 color={BFMPalette.black400}>Reduce up to:</H5>
      <ValueContainer>
        <H5 color={BFMPalette.white25}>{carbonVal ?? "2 t Carbon"}</H5>
      </ValueContainer>
    </InputContainer>
  );
}
